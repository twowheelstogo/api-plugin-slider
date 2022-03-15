import importAsString from "@reactioncommerce/api-utils/importAsString.js";

const addSlider = importAsString("./addSlider.graphql");
const productsBySliderId = importAsString("./productsBySliderId.graphql");
const removeSlider = importAsString("./removeSlider.graphql");
const setSliderHeroMedia = importAsString("./setSliderHeroMedia.graphql");
const slider = importAsString("./slider.graphql");
const sliders = importAsString("./sliders.graphql");
const updateSlider = importAsString("./updateSlider.graphql");

export default [
  addSlider,
  productsBySliderId,
  removeSlider,
  setSliderHeroMedia,
  slider,
  sliders,
  updateSlider
];
