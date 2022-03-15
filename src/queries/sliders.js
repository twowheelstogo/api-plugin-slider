import _ from "lodash";

/**
 * @name sliders
 * @method
 * @memberof Catalog/NoMeteorQueries
 * @summary query the Sliders collection by shop ID and optionally by isTopLevel
 * @param {Object} context - an object containing the per-request state
 * @param {String} shopId - ID of shop to query
 * @param {Object} [params] - Additional options for the query
 * @param {Boolean} [params.filter] - If provided, look for `filter` matching this value with regex
 * @param {Boolean} [params.isTopLevel] - If set, look for `isTopLevel` matching this value
 * @param {Boolean} [params.shouldIncludeDeleted] - Admin only. Whether or not to include `isDeleted=true` sliders. Default is `false`
 * @param {Boolean} [params.shouldIncludeInvisible] - Admin only. Whether or not to include `isVisible=false` sliders.  Default is `false`.
 * @param {Boolean} [params.excludedSliderIds] - If set, exclude these sliderIds from the result
 * @returns {Promise<MongoCursor>} - A MongoDB cursor for the proper query
 */
export default async function sliders(
  context,
  shopId,
  {
    filter,
    shouldIncludeDeleted = false,
    isTopLevel,
    shouldIncludeInvisible = false,
    excludedSliderIds
  } = {}
) {
  const { collections } = context;
  const { Sliders } = collections;
  const query = { shopId };
  let searchFieldFilter = {};
  let regexMatch;

  // Check to see if user has `read` permissions for hidden / deleted sliders
  const hasInactivePermissions = await context.userHasPermission("reaction:legacy:sliders", "read:invisible", {
    shopId
  });

  if (isTopLevel === false || isTopLevel === true) query.isTopLevel = isTopLevel;

  // Use `filter` to filter out results on the server
  if (filter) {
    regexMatch = { $regex: _.escapeRegExp(filter), $options: "i" };
    searchFieldFilter = {
      $or: [
        { name: regexMatch },
        { slug: regexMatch }
      ]
    };
  }

  if (Array.isArray(excludedSliderIds)) {
    query._id = {
      $nin: excludedSliderIds
    };
  }

  // If user does not have `read-admin` permissions,
  // or they do but shouldIncludeDeleted === false
  // only show non deleted products
  if (!hasInactivePermissions || (hasInactivePermissions && !shouldIncludeDeleted)) {
    query.isDeleted = false;
  }

  // If user does not have `read-admin` permissions,
  // or they do but shouldIncludeInvisible === false
  // only show visible products
  if (!hasInactivePermissions || (hasInactivePermissions && !shouldIncludeInvisible)) {
    query.isVisible = true;
  }

  return Sliders.find({
    ...query,
    ...searchFieldFilter
  });
}
