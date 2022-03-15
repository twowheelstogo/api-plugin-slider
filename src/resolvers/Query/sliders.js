import getPaginatedResponse from "@reactioncommerce/api-utils/graphql/getPaginatedResponse.js";
import wasFieldRequested from "@reactioncommerce/api-utils/graphql/wasFieldRequested.js";
import { decodeShopOpaqueId, decodeSliderOpaqueId } from "../../xforms/id.js";


/**
 * Arguments passed by the client for a sliders query
 * @typedef {ConnectionArgs} SliderConnectionArgs - An object of all arguments that were sent by the client
 * @memberof Slider/GraphQL
 * @property {ConnectionArgs} args - An object of all arguments that were sent by the client. {@link ConnectionArgs|See default connection arguments}
 * @property {Boolean} args.shouldIncludeDeleted - If set to true, include deleted. Default false.
 * @property {Boolean} ags.shouldIncludeInvisible - If set to true, include invisible. Default false.
 * @property {Boolean} args.isTopLevel - If set to a boolean, filter by this.
 * @property {String} args.shopId - The ID of shop to filter sliders by
 * @property {Number} args.sortBy - Sort results by a SliderSortByField enum value of `_id`, `name`, `position`, `createdAt`, `updatedAt`
 */

/**
 * @name Query/sliders
 * @method
 * @memberof Slider/GraphQL
 * @summary Returns the sliders for a shop
 * @param {Object} _ - unused
 * @param {SliderConnectionArgs} connectionArgs - arguments sent by the client {@link ConnectionArgs|See default connection arguments}
 * @param {Object} context - an object containing the per-request state
 * @param {Object} info Info about the GraphQL request
 * @returns {Promise<Object[]>} Promise that resolves with array of Slider objects
 */
export default async function sliders(_, connectionArgs, context, info) {
  const { shopId, excludedSliderIds } = connectionArgs;

  const dbShopId = decodeShopOpaqueId(shopId);
  let dbExcludedSliderIds;

  if (Array.isArray(excludedSliderIds)) {
    dbExcludedSliderIds = excludedSliderIds.map(decodeSliderOpaqueId);
  }

  const query = await context.queries.sliders(context, dbShopId, {
    ...connectionArgs,
    excludedSliderIds: dbExcludedSliderIds
  });

  return getPaginatedResponse(query, connectionArgs, {
    includeHasNextPage: wasFieldRequested("pageInfo.hasNextPage", info),
    includeHasPreviousPage: wasFieldRequested("pageInfo.hasPreviousPage", info),
    includeTotalCount: wasFieldRequested("totalCount", info)
  });
}
