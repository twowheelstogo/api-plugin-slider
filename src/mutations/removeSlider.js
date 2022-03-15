import ReactionError from "@reactioncommerce/reaction-error";

/**
 * @name Mutation.removeSlider
 * @method
 * @memberof Routes/GraphQL
 * @summary Add a slider
 * @param {Object} context -  an object containing the per-request state
 * @param {Object} input - mutation input
 * @returns {Promise<Object>} RemoveSliderPayload
 */
export default async function removeSlider(context, input) {
  const { shopId, sliderId } = input;
  const { Sliders } = context.collections;

  await context.validatePermissions(`reaction:legacy:sliders:${sliderId}`, "delete", { shopId });

  const slider = await Sliders.findOne({ _id: sliderId, shopId });
  const { result } = await Sliders.deleteOne({ _id: sliderId, shopId });

  if (result.n === 0) {
    throw new ReactionError("not-found", "Slider not found");
  }

  return slider;
}
