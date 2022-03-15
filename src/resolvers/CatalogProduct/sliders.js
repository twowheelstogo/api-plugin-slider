import getPaginatedResponse from "@reactioncommerce/api-utils/graphql/getPaginatedResponse.js";
import wasFieldRequested from "@reactioncommerce/api-utils/graphql/wasFieldRequested.js";
import xformArrayToConnection from "@reactioncommerce/api-utils/graphql/xformArrayToConnection.js";

/**
 * @name CatalogProduct/sliders
 * @method
 * @memberof Catalog/GraphQL
 * @summary Returns the sliders for a product
 * @param {Object} product - CatalogProduct response from parent resolver
 * @param {SliderConnectionArgs} connectionArgs - arguments sent by the client {@link ConnectionArgs|See default connection arguments}
 * @param {Object} context - an object containing the per-request state
 * @param {Object} info Info about the GraphQL request
 * @returns {Promise<Object[]>} Promise that resolves with array of Slider objects
 */
export default async function sliders(product, connectionArgs, context, info) {
  const { sliderIds } = product;
  if (!sliderIds || sliderIds.length === 0) return xformArrayToConnection(connectionArgs, []);

  const query = await context.queries.slidersByIds(context, sliderIds, connectionArgs);

  return getPaginatedResponse(query, connectionArgs, {
    includeHasNextPage: wasFieldRequested("pageInfo.hasNextPage", info),
    includeHasPreviousPage: wasFieldRequested("pageInfo.hasPreviousPage", info),
    includeTotalCount: wasFieldRequested("totalCount", info)
  });
}
