import pkg from "../package.json";
import i18n from "./i18n/index.js";
import mutations from "./mutations/index.js";
import policies from "./policies.json";
import queries from "./queries/index.js";
import resolvers from "./resolvers/index.js";
import schemas from "./schemas/index.js";
import { Slider } from "./simpleSchemas.js";
import preStartup from "./preStartup.js";

/**
 * @summary Import and call this function to add this plugin to your API.
 * @param {ReactionAPI} app The ReactionAPI instance
 * @returns {undefined}
 */
export default async function register(app) {
  await app.registerPlugin({
    label: "Sliders",
    name: "sliders",
    version: pkg.version,
    i18n,
    functionsByType: {
      preStartup: [preStartup]
    },
    collections: {
      Sliders: {
        name: "Sliders",
        indexes: [
          // Create indexes. We set specific names for backwards compatibility
          // with indexes created by the aldeed:schema-index Meteor package.
          [{ name: 1 }, { name: "c2_name" }],
          [{ relatedSliderIds: 1 }, { name: "c2_relatedSliderIds" }],
          [{ shopId: 1 }, { name: "c2_shopId" }],
          [{ slug: 1, shopId: 1 }, { unique: true }]
        ]
      }
    },
    graphQL: {
      resolvers,
      schemas
    },
    mutations,
    queries,
    policies,
    simpleSchemas: {
      Slider
    }
  });
}
