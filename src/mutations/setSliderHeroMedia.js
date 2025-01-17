import { createRequire } from "module";
import Random from "@reactioncommerce/random";
import ReactionError from "@reactioncommerce/reaction-error";

const require = createRequire(import.meta.url);

const { FileRecord } = require("@reactioncommerce/file-collections");

/**
 * @name slider/setSliderHeroMedia
 * @method
 * @memberof Slider/Methods
 * @summary Insert a new hero media record and attach it to a slider.
 * @param {Object} context -  an object containing the per-request state
 * @param {Object} input - mutation input
 * @returns {Promise<Object>} SetSliderHeroMediaPayload
 */
export default async function setSliderHeroMedia(context, input) {
  const { appEvents, collections } = context;
  const { Media, MediaRecords, Sliders } = collections;
  const { shopId, sliderId, fileRecord } = input;

  await context.validatePermissions(`reaction:legacy:sliders:${sliderId}`, "update", { shopId });

  let heroMediaUrl = null;

  if (fileRecord) {
    if (!Media || !MediaRecords) throw new Error("Cannot add media if the files plugin isn't registered");

    const doc = {
      ...fileRecord,
      _id: Random.id(),
      metadata: {
        ...fileRecord.metadata,
        workflow: "published"
      }
    };

    const { insertedId } = await MediaRecords.insertOne(doc);

    // Because we don't have access to the URL of the file, we have to
    // do our best to get the URL as it will be once the file is finished being processed.
    heroMediaUrl = `${FileRecord.downloadEndpointPrefix}/${Media.name}/${insertedId}/large/${fileRecord.original.name}`;
  }

  const { result } = await Sliders.updateOne({
    _id: sliderId
  }, {
    $set: {
      heroMediaUrl
    }
  });

  if (result.n === 0) {
    throw new ReactionError("not-found", `Hero media couldn't be updated on slider ${sliderId}`);
  }

  const slider = await Sliders.findOne({ _id: sliderId, shopId });

  appEvents.emit("afterSetSliderHeroMedia", slider);

  return slider;
}
