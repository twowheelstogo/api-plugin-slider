import { decodeShopOpaqueId, decodeSliderOpaqueId } from "../../xforms/id.js";

/**
 * Arguments passed by the client for a sliders query
 * @typedef {ConnectionArgs} SliderConnectionArgs - An object of all arguments that were sent by the client
 * @memberof Slider/GraphQL
 * @property {ConnectionArgs} args - An object of all arguments that were sent by the client. {@link ConnectionArgs|See default connection arguments}
 * @property {String} args.slugOrId - ID or slug of slider to query
 * @property {Boolean} args.shouldIncludeInvisible - Whether or not to include `isVisible=true` sliders. Default is `false`
 */

/**
 * @name Query/slider
 * @method
 * @memberof Slider/GraphQL
 * @summary Returns a slider for a shop, based on slider slug or ID
 * @param {Object} _ - unused
 * @param {Object} connectionArgs - arguments sent by the client {@link ConnectionArgs|See default connection arguments}
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object[]>} Promise that resolves with array of Slider objects
 */
export default async function slider(_, connectionArgs, context) {
  const { slugOrId: opaqueSlugOrId, shopId: opaqueShopId } = connectionArgs;

  const shopId = decodeShopOpaqueId(opaqueShopId);

  let slugOrId;

  try {
    slugOrId = decodeSliderOpaqueId(opaqueSlugOrId);
  } catch (error) {
    slugOrId = opaqueSlugOrId;
  }

  return context.queries.slider(context, { ...connectionArgs, slugOrId, shopId });
}
