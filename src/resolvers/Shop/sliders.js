import getPaginatedResponse from "@reactioncommerce/api-utils/graphql/getPaginatedResponse.js";
import wasFieldRequested from "@reactioncommerce/api-utils/graphql/wasFieldRequested.js";

/**
 * @name Shop/sliders
 * @method
 * @memberof Shop/GraphQL
 * @summary Returns the sliders for the parent resolver shop
 * @param {Object} shop Shop returned by the parent resolver
 * @param {SliderConnectionArgs} connectionArgs - arguments sent by the client {@link ConnectionArgs|See default connection arguments}
 * @param {Object} context - an object containing the per-request state
 * @param {Object} info Info about the GraphQL request
 * @returns {Promise<Object[]>} Promise that resolves with array of Slider objects
 */
export default async function sliders(shop, connectionArgs, context, info) {
  const query = await context.queries.sliders(context, shop._id, connectionArgs);
  return getPaginatedResponse(query, connectionArgs, {
    includeHasNextPage: wasFieldRequested("pageInfo.hasNextPage", info),
    includeHasPreviousPage: wasFieldRequested("pageInfo.hasPreviousPage", info),
    includeTotalCount: wasFieldRequested("totalCount", info)
  });
}
