import arrayJoinPlusRemainingQuery from "@reactioncommerce/api-utils/arrayJoinPlusRemainingQuery.js";

/**
 * @name queries.productsBySliderId
 * @method
 * @memberof Sliders/Queries
 * @summary get a list of products by slider id
 * @param {Object} context - an object containing the per-request state
 * @param {Object} [params] - an object of all arguments that were sent by the client
 * @param {String} [params.shopId] - Shop ID
 * @param {String} [params.sliderId] - Slider ID
 * @param {String} [params.query] - Query string
 * @returns {Promise<Array<Object>>} array of SliderProducts
 */
export default async function productsBySliderId(context, params) {
  const { connectionArgs, shopId, sliderId, query } = params;
  const { collections } = context;
  const { Products, Sliders } = collections;

  await context.validatePermissions(`reaction:legacy:sliders:${sliderId}`, "read", { shopId });

  let joinSelector = { hashsliders: sliderId, shopId };

  // filter by query
  if (query) {
    const cond = {
      $regex: query,
      $options: "i"
    };
    joinSelector = {
      ...joinSelector,
      $or: [
        {
          _id: cond
        },
        {
          title: cond
        }, {
          pageTitle: cond
        }, {
          description: cond
        }]
    };
  }

  return arrayJoinPlusRemainingQuery({
    arrayFieldPath: "featuredProductIds",
    collection: Sliders,
    connectionArgs,
    joinCollection: Products,
    joinFieldPath: "_id",
    joinSelector,
    joinSortOrder: "asc",
    positionFieldName: "position",
    selector: { _id: sliderId },
    sortByForRemainingDocs: "createdAt",
    sortOrderForRemainingDocs: "asc"
  });
}
