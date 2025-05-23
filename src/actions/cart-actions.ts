"use server";

import { getCurrentSession } from "@/actions/auth";
import prisma from "@/lib/prisma";
import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { revalidatePath } from "next/cache";
export const createCart = async () => {
  const { user } = await getCurrentSession();

  const cart = await prisma.cart.create({
    data: {
      id: crypto.randomUUID(),
      user: user ? { connect: { id: user.id } } : undefined,
      items: {
        create: [],
      },
    },
    include: {
      items: true,
    },
  });

  return cart;
};

export const getOrCreateCart = async (cartId?: string | null) => {
  const { user } = await getCurrentSession();
  if (user) {
    const userCart = await prisma.cart.findUnique({
      where: { userId: user.id },
      include: { items: true },
    });
    if (userCart) return userCart;
    return createCart(); 
  } else {
    if (cartId) {
      const cart = await prisma.cart.findUnique({
        where: { id: cartId },
        include: { items: true },
      });
      if (cart) return cart;
    }
    return createCart(); 
  }
};
export const updateCartItems = async (
  cartId: string,
  sanityProductId: string,
  data: {
    title?: string;
    price?: number;
    image?: string;
    quantity?: number;
  }
) => {
  const cart = await getOrCreateCart(cartId);

  const existingItem = cart.items.find(
    (item) => sanityProductId === item.sanityProductId
  );

  if (existingItem) {
    if (data.quantity === 0) {
      await prisma.cartLineItem.delete({
        where: {
          id: existingItem.id,
        },
      });
    } else if (data.quantity && data.quantity > 0) {
      await prisma.cartLineItem.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: data.quantity,
        },
      });
    }
  } else if (data.quantity && data.quantity > 0) {
    await prisma.cartLineItem.create({
      data: {
        id: crypto.randomUUID(),
        cartId: cart.id,
        sanityProductId,
        quantity: data.quantity || 1,
        title: data.title || "",
        price: data.price || 0,
        image: data.image || "",
      },
    });
  }

  revalidatePath("/");
  return getOrCreateCart(cartId);
};

export const syncCartWithUser = async (cartId: string | null) => {
  const { user } = await getCurrentSession();

  if (!user) {
    return null;
  }

  const existingUserCart = await prisma.cart.findUnique({
    where: {
      userId: user.id,
    },
    include: {
      items: true,
    },
  });

  const existingAnonymousCart = cartId
    ? await prisma.cart.findUnique({
        where: {
          id: cartId,
        },
        include: {
          items: true,
        },
      })
    : null;

  if (!cartId && existingUserCart) {
    return existingUserCart;
  }

  if (!cartId) {
    return createCart();
  }

  if (!existingAnonymousCart && !existingUserCart) {
    return createCart();
  }

  if (existingUserCart && existingUserCart.id === cartId) {
    return existingUserCart;
  }

  if (!existingUserCart) {
    const newCart = await prisma.cart.update({
      where: {
        id: cartId,
      },
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
      },
      include: {
        items: true,
      },
    });
    return newCart;
  }

  if (!existingAnonymousCart) {
    return existingUserCart;
  }

  for (const item of existingAnonymousCart.items) {
    const existingItem = existingUserCart.items.find(
      (item) => item.sanityProductId === item.sanityProductId
    );

    if (existingItem) {
      await prisma.cartLineItem.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: existingItem.quantity + item.quantity,
        },
      });
    } else {
      await prisma.cartLineItem.create({
        data: {
          id: crypto.randomUUID(),
          cartId: existingUserCart.id,
          sanityProductId: item.sanityProductId,
          quantity: item.quantity,
          title: item.title,
          price: item.price,
          image: item.image,
        },
      });
    }
  }

  await prisma.cart.delete({
    where: {
      id: cartId,
    },
  });

  revalidatePath("/");
  return getOrCreateCart(existingUserCart.id);
};
export const addWinningItemToCart = async (
  cartId: string,
  product: Product
) => {
  const cart = await getOrCreateCart(cartId);

  const existingItem = cart.items.find(
    (item) => item.sanityProductId === product._id
  );

  if (existingItem) {
    await prisma.cartLineItem.update({
      where: {
        id: existingItem.id,
      },
      data: {
        quantity: existingItem.quantity + 1, 
        price: 0, 
        title: `🎁 ${product.title} (Won)`, 
        image: product.image ? urlFor(product.image).url() : "",
      },
    });
  } else {
    await prisma.cartLineItem.create({
      data: {
        id: crypto.randomUUID(),
        cartId: cart.id,
        sanityProductId: product._id,
        quantity: 1,
        title: `🎁 ${product.title} (Won)`,
        price: 0,
        image: product.image ? urlFor(product.image).url() : "",
      },
    });
  }

  revalidatePath("/"); 
  return getOrCreateCart(cartId);
};

export const clearCartInBackend = async (cartId: string) => {
  const cart = await prisma.cart.findUnique({
    where: { id: cartId },
    include: { items: true },
  });

  if (!cart) return;

  await prisma.cartLineItem.deleteMany({
    where: { cartId: cart.id },
  });

  await prisma.cart.delete({
    where: { id: cart.id },
  });

  revalidatePath("/"); 
  return null;
};

export const revalidateHome = async () => {
  revalidatePath("/");
};

export const clearUserCart = async () => {
  const { user } = await getCurrentSession();
  if (!user) return;

  const cart = await prisma.cart.findUnique({
    where: { userId: user.id },
    include: { items: true },
  });

  if (cart) {
    await prisma.cartLineItem.deleteMany({
      where: { cartId: cart.id },
    });
    await prisma.cart.delete({
      where: { id: cart.id },
    });
  }
};

