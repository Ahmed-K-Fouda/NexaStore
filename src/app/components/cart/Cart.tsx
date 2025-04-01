"use client";
import { createCheckoutSession } from "@/actions/stripe-actions";
import { formatPrice } from "@/lib/utils";
import { useCartStore,type CartItem as CartItemType } from "@/store/cart-store";
import { Loader2, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import { useShallow } from "zustand/shallow";
import "react-confirm-alert/src/react-confirm-alert.css";
import { getCurrentSession } from "@/actions/auth";
import {redirect} from 'next/navigation'

const freeShippingAmout = 15; //$15 for free shipping
const CartItem = ({item}: {item: CartItemType}) => {
    const { removeItem, updateQuantity } = useCartStore(
        useShallow((state) => ({
            removeItem: state.removeItem,
            updateQuantity: state.updateQuantity,
        }))
    );

    
    const isFreeItem = item.price === 0;
const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({})
function handleRemoveItem(itemId: string) {
  confirmAlert({
    title: "Confirm Deletion",
    message: "Are you sure you want to remove this item from your cart?",
    buttons: [
      {
        label: "Yes, Remove",
        onClick: async () => {
          setLoadingStates((prev) => ({ ...prev, [itemId]: true })); 
          await removeItem(itemId);
          setLoadingStates((prev) => ({ ...prev, [itemId]: false })); 
          toast.success("Item removed from cart!");
        },
      },
      {
        label: "Cancel",
        onClick: () => {},
      },
    ],
    overlayClassName: "custom-overlay",
  });
}

     return (
        <div
                    className=" flex gap-4 p-4 hover:bg-gray-50"
                    key={`cart-item-${item.id}`}
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border ">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {item.title}
                      </h3>
                      <div className="text-sm text-gray-500 mt-1">
                       {isFreeItem ? (
                        <span className='text-emerald-600 font-medium'>FREE</span>
                    ) : (
                        formatPrice(item.price)
                    )}
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        {isFreeItem ? (
                        <div className='text-sm text-emerald-600 font-medium'>
                            Prize Item
                        </div> ):
                        (
                        <>
                        
                        <select
                          className="border rounded-md px-2 py-1 text-sm bg-white"
                          name=""
                          value={item.quantity}
                          onChange={(e) => {
                            updateQuantity(item.id, Number(e.target.value));
                          }}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <option
                              value={num}
                              key={`cart-qty-slct-${item.id}-${num}`}
                            >
                              {num}
                            </option>
                          ))}
                        </select>
                        <button
                          className="cursor-pointer bg-red-500 hover:bg-red-700 text-white rounded-lg py-2 px-3 text-sm transition-colors flex items-center gap-2"
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={loadingStates[item.id]} 
                        >
                          {loadingStates[item.id] ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            "Remove"
                          )}
                        </button>
                        </>
                        )} 
                        
                      </div>
                    </div>
                  </div>
    )


  }
export default function Cart() {
  const [loadingProceed, setLoadingProceed] = useState<boolean>(false);
  

  async function getUser() {
    const {user} = await getCurrentSession();
    return user;
  }

  const {
    syncWithUser,
    setIsLoading,
    isOpen,
    items,
    close,
    getTotalItems,
    getTotalPrice,
    clearCartForce,
    cartId,
  } = useCartStore(
    useShallow((state) => ({
      syncWithUser: state.syncWithUser,
      items: state.items,
      setIsLoading: state.setIsLoading,
      isOpen: state.isOpen,
      close: state.close,
      cartId: state.cartId,
      getTotalPrice: state.getTotalPrice,
      getTotalItems: state.getTotalItems,
      clearCartForce:state.clearCartForce,

    }))
  );
useEffect(() => {
  const initCart = async () => {
    await useCartStore.persist.rehydrate();
    await syncWithUser();

    useCartStore.getState().clearCart();
    
    setIsLoading(true);
  };
  initCart();
}, [setIsLoading, syncWithUser]);
useEffect(() => {
  const initCart = async () => {
    await useCartStore.persist.rehydrate();
    await syncWithUser();
    setIsLoading(true);
  };
  initCart();
}, [setIsLoading, syncWithUser]);
// async function handleProceedToCheckout() {
//   const user = await getUser();

//   if (!user) {
//     toast.warning("Please Sign up to continue. Redirecting...");
//     redirect("/auth/sign-up");
//   } else {
//     clearCart();  
//   }

//   if (!cartId || loadingProceed) return;

//   setLoadingProceed(true);
  
//   const checkoutUrl = await createCheckoutSession(cartId);
//   window.location.href = checkoutUrl;  
  
//   setLoadingProceed(false);
// }
async function handleProceedToCheckout() {
  const user = await getUser();

  if (!user) {
    toast.warning("Please Sign up to continue. Redirecting...");
    redirect("/auth/sign-up");
  }

  if (!cartId || loadingProceed) return;

  setLoadingProceed(true);
  
  const checkoutUrl = await createCheckoutSession(cartId);
  window.location.href = checkoutUrl;  
  
  setLoadingProceed(false);
}
  const totalPrice = getTotalPrice();

  const ramianingForFreeShipping = useMemo(() => {
    return Math.max(0, freeShippingAmout - totalPrice);
  }, [totalPrice]);



  return (
    <React.Fragment>
      {isOpen && <div className="backdrop" onClick={close}></div>}

      <div
        className={`
         fixed  right-0 top-0 w-full h-full sm:w-[400px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out
         z-[100] ${isOpen ? `translate-x-0` : `translate-x-full`}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b bg-gray-50">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 " />
              <h2 className="text-lg font-semibold">Shopping Cart</h2>
              <span className="bg-gray-200 px-2 py-1 rounded-full text-sm font-medium">
                {getTotalItems()}
              </span>
            </div>
            <button
              className="p-2 cursor-pointer hover:bg-gray-200 rounded-full transition-colors"
              onClick={close}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <ShoppingCart className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Your Cart Is Empty{" "}
                </h3>
                <p className="text-gray-500 mb-6">
                  looks like you have not added any items to your cart yet!
                </p>
                <Link
                  href="/"
                  onClick={close}
                  className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-900 transition-colors"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="divide-y">
                {items.map((item) => (
                 <CartItem item={item} key={'cart-item-'+item.id}/>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t">
              <div className='flex items-center justify-center w-full'>
                                             <button
  onClick={() => {
    clearCartForce();
    window.location.reload();
    toast.success("Item deleted succefully!");
  }}
  className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-lg"
>
  Delete All
</button>
                  </div>
              {ramianingForFreeShipping > 0 ? (
                <div className="p-4 bg-blue-50 border-b">
                   
                  <div className="flex items-center gap-2 text-blue-800 mb-2">
                    <span>🚚</span>
                    <span className="font-medium">
                      Add {formatPrice(ramianingForFreeShipping)} more for FREE
                      shipping
                    </span>
                
                  </div>
                 
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(100, (totalPrice / freeShippingAmout) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-green-50 border-b">
                  <div className="flex items-center gap-2 text-green-800">
                    <span>✨</span>
                    <span className="font-medium">
                      You have unlocked FREE shipping!
                    </span>
                  </div>
                </div>
              )}


              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-medium">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className="font-medium">
                      {ramianingForFreeShipping > 0
                        ? "Calculated at checkout"
                        : "FREE"}
                    </span>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium text-lg">Total</span>
                    <span className="font-bold text-lg">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>

                  <button
                    disabled={loadingProceed}
                    onClick={handleProceedToCheckout}
                    className="w-full cursor-pointer bg-black text-white py-4 rounded-full font-bold flex items-center justify-center  hover:bg-gray-900 transition-colors"
                  >
                    {loadingProceed ? (
                      <div className="flex items-center gap-1">
                        Proceeding To Checkout...
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </div>
                    ) : (
                      "Proceed to checkout"
                    )}
                  </button>

                  <div className="mt-4 space-y-2 ">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>🔐</span>
                      <span>Secure Checkout</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>🔁</span>
                      <span>30-days returns</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>💳</span>
                      <span>All major payment accepted</span>
                    </div>

                    <div>
        
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
      </div>
    </React.Fragment>
  );
}
