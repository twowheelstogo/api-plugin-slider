/**
 * @name slidersByIds
 * @method
 * @memberof Catalog/NoMeteorQueries
 * @summary query the Sliders collection by a list of IDs
 * @param {Object} context - an object containing the per-request state
 * @param {String[]} sliderIds - slider IDs to get
 * @param {Object} [params] - Additional options for the query
 * @param {Boolean} [params.shouldIncludeDeleted] - Whether or not to include `isDeleted=true` sliders. Default is `false`
 * @returns {Promise<MongoCursor>} - A MongoDB cursor for the proper query
 */
export default async function slidersByIds(context, sliderIds, { shouldIncludeDeleted = false } = {}) {
  const { collections } = context;

  const { Sliders } = collections;
  const query = { _id: { $in: sliderIds } };

  if (shouldIncludeDeleted !== true) query.isDeleted = { $ne: true };

  return Sliders.find(query);
}
