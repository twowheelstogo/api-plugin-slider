import { decodeShopOpaqueId, decodeSliderOpaqueId } from "../../xforms/id.js";

/**
 * @name Mutation.updateSlider
 * @method
 * @memberof Routes/GraphQL
 * @summary Update a specified redirect rule
 * @param {Object} parentResult - unused
 * @param {Object} args.input - UpdateSliderInput
 * @param {String} args.input.name - path to redirect from
 * @param {String} args.input.displayName - path to redirect to
 * @param {Boolean} args.input.isVisible - whether the slider is visible
 * @param {String} [args.input.clientMutationId] - An optional string identifying the mutation call
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object>} UpdateSliderPayload
 */
export default async function updateSlider(parentResult, { input }, context) {
  const {
    clientMutationId = null,
    id: opaqueSliderId,
    shopId: opaqueShopId,
    ...sliderInput
  } = input;

  const shopId = decodeShopOpaqueId(opaqueShopId);
  const sliderId = decodeSliderOpaqueId(opaqueSliderId);

  const slider = await context.mutations.updateSlider(context, {
    shopId,
    sliderId,
    ...sliderInput
  });

  return {
    clientMutationId,
    slider
  };
}
