import { decodeShopOpaqueId, decodeSliderOpaqueId } from "../../xforms/id.js";

/**
 * @name Mutation.removeSlider
 * @method
 * @memberof Routes/GraphQL
 * @summary Remove a specified slider
 * @param {Object} parentResult - unused
 * @param {Object} args.input - RemoveSliderInput
 * @param {String} args.input.id - id of the slider to remove
 * @param {String} args.input.shopId - shopId of the slider to remove
 * @param {String} [args.input.clientMutationId] - An optional string identifying the mutation call
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object>} RemoveSliderPayload
 */
export default async function removeSlider(parentResult, { input }, context) {
  const {
    clientMutationId = null,
    id: opaqueSliderId,
    shopId: opaqueShopId
  } = input;

  const shopId = decodeShopOpaqueId(opaqueShopId);
  const sliderId = decodeSliderOpaqueId(opaqueSliderId);

  const slider = await context.mutations.removeSlider(context, {
    shopId,
    sliderId
  });

  return {
    clientMutationId,
    slider
  };
}
