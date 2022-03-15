import { encodeSliderOpaqueId } from "../../xforms/id.js";
import heroMediaUrl from "./heroMediaUrl.js";
import subSliders from "./subSliders.js";

export default {
  _id: (slider) => encodeSliderOpaqueId(slider._id),
  heroMediaUrl,
  subSliderIds: (slider) => (slider.relatedSliderIds || []).map(encodeSliderOpaqueId),
  subSliders
};
