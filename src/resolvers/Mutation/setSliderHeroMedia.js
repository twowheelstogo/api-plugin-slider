import { decodeShopOpaqueId, decodeSliderOpaqueId } from "../../xforms/id.js";

/**
 * @name Mutation.setSliderHeroMedia
 * @method
 * @memberof Sliders/GraphQL
 * @summary Set hero media for a slider
 * @param {Object} parentResult - unused
 * @param {Object} args.input - AddSliderInput
 * @param {String} args.input.id - Slider ID
 * @param {String} args.input.shopId - ShopId of the slider
 * @param {Boolean} args.input.fileRecord - FileRecord document
 * @param {String} [args.input.clientMutationId] - An optional string identifying the mutation call
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object>} SetSliderHeroMediaPayload
 */
export default async function setSliderHeroMedia(parentResult, { input }, context) {
  const {
    clientMutationId = null,
    id: opaqueSliderId,
    shopId: opaqueShopId,
    fileRecord
  } = input;

  const shopId = decodeShopOpaqueId(opaqueShopId);
  const sliderId = decodeSliderOpaqueId(opaqueSliderId);

  const slider = await context.mutations.setSliderHeroMedia(context, {
    shopId,
    sliderId,
    fileRecord
  });

  return {
    clientMutationId,
    slider
  };
}
