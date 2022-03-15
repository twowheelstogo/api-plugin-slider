import Random from "@reactioncommerce/random";
import ReactionError from "@reactioncommerce/reaction-error";
import getSlug from "@reactioncommerce/api-utils/getSlug.js";
import { Slider as SliderSchema } from "../simpleSchemas.js"; // TODO: update schemas

/**
 * @name Mutation.addSlider
 * @method
 * @memberof Routes/GraphQL
 * @summary Add a slider
 * @param {Object} context -  an object containing the per-request state
 * @param {Object} input - mutation input
 * @returns {Promise<Object>} AddSliderPayload
 */
export default async function addSlider(context, input) {
  const { shopId, name, isVisible, displayTitle, metafields, heroMediaUrl, slug: slugInput } = input;
  const { appEvents, collections } = context;
  const { Sliders } = collections;

  await context.validatePermissions("reaction:legacy:sliders", "create", { shopId });

  let slug = name;
  if (typeof slugInput === "string" && slugInput.trim().length > 0) {
    slug = slugInput;
  }

  const now = new Date();
  const slider = {
    _id: Random.id(),
    isDeleted: false,
    isTopLevel: false,
    isVisible,
    slug: getSlug(slug),
    metafields,
    name,
    displayTitle,
    heroMediaUrl,
    shopId,
    createdAt: now,
    updatedAt: now
  };

  SliderSchema.validate(slider);

  try {
    const { result } = await Sliders.insertOne(slider);

    if (result.ok !== 1) {
      throw new ReactionError("server-error", "Unable to create slider");
    }

    await appEvents.emit("afterSliderCreate", slider);

    return slider;
  } catch ({ message }) {
    // Mongo duplicate key error.
    if (message.includes("E11000") && message.includes("slug")) {
      throw new ReactionError("error", `Slug ${slider.slug} is already in use`);
    }

    throw new ReactionError("error", message);
  }
}
