import { decodeShopOpaqueId, decodeSliderOpaqueId } from "../../xforms/id.js";

/**
 * @name Query.productsBySliderId
 * @method
 * @memberof Sliders/GraphQL
 * @summary get a list of products by slider id
 * @param {Object} _ - unused
 * @param {Object} [params] - an object of all arguments that were sent by the client
 * @param {String} [params.shopId] - Shop id
 * @param {String} [params.sliderId] - Slider id
 * @param {String} [params.query] - Query string
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Array<Object>>} SliderProducts Connection
 */
export default async function productsBySliderId(_, params, context) {
  const {
    after,
    before,
    first,
    last,
    shopId: opaqueShopId,
    sortOrder,
    sliderId: opaqueSliderId,
    query
  } = params;

  const shopId = decodeShopOpaqueId(opaqueShopId);
  const sliderId = decodeSliderOpaqueId(opaqueSliderId);

  return context.queries.productsBySliderId(context, {
    connectionArgs: {
      after,
      before,
      first,
      last,
      sortOrder
    },
    shopId,
    sliderId,
    query
  });
}
