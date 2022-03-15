import ReactionError from "@reactioncommerce/reaction-error";

/**
 * @name slider
 * @method
 * @memberof Catalog/NoMeteorQueries
 * @summary query the Sliders collection and return a slider by slider ID or slug
 * @param {Object} context - an object containing the per-request state
 * @param {Object} input input of slider query
 * @param {String} input.shopId - shopId of slider
 * @param {String} input.slugOrId - ID or slug of slider to query
 * @param {Boolean} [input.shouldIncludeInvisible] - Whether or not to include `isVisible=true` sliders. Default is `false`
 * @returns {Object} - A Slider document if one was found
 */
export default async function slider(context, input) {
  const { collections } = context;
  const { Sliders } = collections;
  const { slugOrId, shopId, shouldIncludeInvisible = false } = input;

  const foundSlider = await Sliders.findOne({
    $or: [{ _id: slugOrId }, { slug: slugOrId }],
    shopId
  });

  if (!foundSlider) {
    throw new ReactionError("not-found", `Slider ${slugOrId} not found`);
  }

  // Check to see if user has `read` permissions for invisible sliders
  const hasInactivePermissions = await context.userHasPermission(`reaction:legacy:sliders:${foundSlider._id}`, "read:invisible", {
    shopId
  });

  // if slider is invisible, only show if `hasInactivePermissions === true` && `shouldIncludeInvisible === true`
  if (foundSlider.isVisible === false && (hasInactivePermissions === false || shouldIncludeInvisible === false)) {
    throw new ReactionError("not-found", `Slider ${slugOrId} not found`);
  }

  return foundSlider;
}
