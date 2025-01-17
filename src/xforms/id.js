import decodeOpaqueIdForNamespace from "@reactioncommerce/api-utils/decodeOpaqueIdForNamespace.js";
import encodeOpaqueId from "@reactioncommerce/api-utils/encodeOpaqueId.js";

const namespaces = {
  Shop: "reaction/shop",
  Slider: "reaction/slider"
};

export const encodeShopOpaqueId = encodeOpaqueId(namespaces.Shop);
export const encodeSliderOpaqueId = encodeOpaqueId(namespaces.Slider);

export const decodeShopOpaqueId = decodeOpaqueIdForNamespace(namespaces.Shop);
export const decodeSliderOpaqueId = decodeOpaqueIdForNamespace(namespaces.Slider);
