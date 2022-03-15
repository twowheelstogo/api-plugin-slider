import { encodeSliderOpaqueId } from "../../xforms/id.js";

/**
 * @name CatalogProduct/sliderIds
 * @method
 * @memberof Catalog/GraphQL
 * @summary Returns the product sliderIds prop to opaque IDs
 * @param {Object} product - CatalogProduct response from parent resolver
 * @returns {String[]} Array of slider IDs
 */
export default function slidersIds(product) {
  const { sliderIds } = product;
  if (!sliderIds || sliderIds.length === 0) return [];

  return sliderIds.map(encodeSliderOpaqueId);
}
