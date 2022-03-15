import ReactionError from "@reactioncommerce/reaction-error";
import SimpleSchema from "simpl-schema";
import getSlug from "@reactioncommerce/api-utils/getSlug.js";

const inputSchema = new SimpleSchema({
  "slug": String,
  "name": String,
  "displayTitle": {
    type: String,
    optional: true
  },
  "heroMediaUrl": {
    type: String,
    optional: true
  },
  "isVisible": Boolean,
  "metafields": { type: Array, optional: true },
  "metafields.$": new SimpleSchema({
    key: { type: String, max: 30 },
    namespace: { type: String, max: 20 },
    value: { type: String }
  }),
  "featuredProductIds": { type: Array, optional: true },
  "featuredProductIds.$": String
});

/**
 * @name Mutation.updateSlider
 * @method
 * @memberof Routes/GraphQL
 * @summary Add a slider
 * @param {Object} context -  an object containing the per-request state
 * @param {Object} input - mutation input
 * @returns {Promise<Object>} UpdateSliderPayload
 */
export default async function updateSlider(context, input) {
  const { appEvents, collections } = context;
  const { Sliders } = collections;
  const { shopId, sliderId, slug: slugInput } = input;

  await context.validatePermissions(`reaction:legacy:sliders:${sliderId}`, "update", { shopId });

  const metafields = [];

  // Filter out blank meta fields
  Array.isArray(input.metafields) && input.metafields.forEach((field) => {
    if (typeof field.value === "string" && field.value.trim().length) {
      metafields.push(field);
    }
  });

  let slug = input.name;
  if (typeof slugInput === "string" && slugInput.trim().length > 0) {
    slug = slugInput;
  }

  const params = {
    slug: getSlug(slug),
    name: input.name,
    displayTitle: input.displayTitle,
    isVisible: input.isVisible,
    metafields: (metafields.length && metafields) || null,
    featuredProductIds: input.featuredProductIds
  };

  if (typeof input.heroMediaUrl === "string" && input.heroMediaUrl.length) {
    params.heroMediaUrl = input.heroMediaUrl;
  } else {
    params.heroMediaUrl = null;
  }

  inputSchema.validate(params);
  params.updatedAt = new Date();

  try {
    const { result } = await Sliders.updateOne(
      { _id: sliderId, shopId },
      { $set: params }
    );

    if (result.n === 0) {
      throw new ReactionError("not-found", "Slider couldn't be updated, or doesn't exist");
    }

    const slider = await Sliders.findOne({ _id: sliderId, shopId });

    await appEvents.emit("afterSliderUpdate", slider);

    return slider;
  } catch ({ message }) {
    // Mongo duplicate key error.
    if (message.includes("E11000") && message.includes("slug")) {
      throw new ReactionError("error", `Slug ${params.slug} is already in use`);
    }

    throw new ReactionError("error", message);
  }
}
