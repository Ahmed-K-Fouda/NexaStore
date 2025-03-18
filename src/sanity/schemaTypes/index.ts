import { type SchemaTypeDefinition } from "sanity";
import { productCategory } from "./schemas/product-category";
import { product } from "./schemas/product";
import { promotionCampaign } from "./schemas/promotion-campaign";
import { promotionCode } from "./schemas/promotion-code";
import { order, orderItem, shippingAddress } from "./schemas/orders";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    promotionCode,
    promotionCampaign,

    productCategory,
    product,

    shippingAddress,
    orderItem,
    order,
  ],
};
