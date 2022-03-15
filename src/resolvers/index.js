import getConnectionTypeResolvers from "@reactioncommerce/api-utils/graphql/getConnectionTypeResolvers.js";
import CatalogProduct from "./CatalogProduct/index.js";
import Mutation from "./Mutation/index.js";
import Query from "./Query/index.js";
import Shop from "./Shop/index.js";
import Slider from "./Slider/index.js";

export default {
  CatalogProduct,
  Mutation,
  Query,
  Shop,
  Slider,
  ...getConnectionTypeResolvers("Slider"),
  ...getConnectionTypeResolvers("SliderProduct")
};
