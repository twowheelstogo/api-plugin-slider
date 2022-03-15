import { decodeShopOpaqueId } from "../../xforms/id.js";

/**
 * @name Mutation.addSlider
 * @method
 * @memberof Routes/GraphQL
 * @summary Add a slider
 * @param {Object} parentResult - unused
 * @param {Object} args.input - AddSliderInput
 * @param {String} args.input.name - path to redirect from
 * @param {String} args.input.displayName - path to redirect to
 * @param {Boolean} args.input.isVisible - whether the slider is visible
 * @param {String} [args.input.clientMutationId] - An optional string identifying the mutation call
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object>} AddSliderPayload
 */
export default async function addSlider(parentResult, { input }, context) {
  const {
    clientMutationId = null,
    shopId: opaqueShopId,
    ...sliderInput
  } = input;

  const shopId = decodeShopOpaqueId(opaqueShopId);

  const slider = await context.mutations.addSlider(context, {
    shopId,
    ...sliderInput
  });

  return {
    clientMutationId,
    slider
  };
}
