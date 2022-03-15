import getPaginatedResponse from "@reactioncommerce/api-utils/graphql/getPaginatedResponse.js";
import wasFieldRequested from "@reactioncommerce/api-utils/graphql/wasFieldRequested.js";
import xformArrayToConnection from "@reactioncommerce/api-utils/graphql/xformArrayToConnection.js";

/**
 * Arguments passed by the client for a sliders query
 * @memberof Slider/GraphQL
 * @typedef {ConnectionArgs} SubSliderConnectionArgs - An object of all arguments that were sent by the client
 * @property {ConnectionArgs} args - An object of all arguments that were sent by the client. {@link ConnectionArgs|See default connection arguments}
 * @property {Boolean} args.shouldIncludeDeleted - If set to true, include deleted. Default false.
 * @property {Number} args.sortBy - Sort results by a SliderSortByField enum value of `_id`, `name`, `position`, `createdAt`, `updatedAt`
 */

/**
 * @name Slider/subSliders
 * @method
 * @memberof Slider/GraphQL
 * @summary Returns the child sliders for a slider
 * @param {Object} slider - Slider response from parent resolver
 * @param {SubSliderConnectionArgs} connectionArgs - arguments sent by the client {@link ConnectionArgs|See default connection arguments}
 * @param {Object} context - an object containing the per-request state
 * @param {Object} info Info about the GraphQL request
 * @returns {Promise<Object[]>} Promise that resolves with array of Slider objects
 */
export default async function subSliders({ relatedSliderIds }, connectionArgs, context, info) {
  if (!relatedSliderIds || relatedSliderIds.length === 0) return xformArrayToConnection(connectionArgs, []);

  const query = await context.queries.slidersByIds(context, relatedSliderIds, connectionArgs);

  return getPaginatedResponse(query, connectionArgs, {
    includeHasNextPage: wasFieldRequested("pageInfo.hasNextPage", info),
    includeHasPreviousPage: wasFieldRequested("pageInfo.hasPreviousPage", info),
    includeTotalCount: wasFieldRequested("totalCount", info)
  });
}
