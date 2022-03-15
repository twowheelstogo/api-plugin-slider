import getFakeMongoCursor from "@reactioncommerce/api-utils/tests/getFakeMongoCursor.js";
import {
  createFactoryForSchema,
  Factory
} from "@reactioncommerce/data-factory";
import { Slider } from "../../simpleSchemas.js";
import slidersResolver from "./sliders.js";

createFactoryForSchema("Slider", Slider);

const base64ID = "cmVhY3Rpb24vc2hvcDoxMjM="; // reaction/shop:123
const mockSliders = Factory.Slider.makeMany(3, {
  _id: (newId) => (newId + 100).toString()
});
const mockSlidersQuery = getFakeMongoCursor("Sliders", mockSliders);

test("calls queries.sliders and returns a partial connection", async () => {
  const sliders = jest
    .fn()
    .mockName("queries.sliders")
    .mockReturnValueOnce(Promise.resolve(mockSlidersQuery));

  const result = await slidersResolver(
    {},
    { shopId: base64ID },
    {
      queries: { sliders }
    },
    { fieldNodes: [] }
  );

  expect(result).toEqual({
    nodes: mockSliders,
    pageInfo: {
      endCursor: "102",
      startCursor: "100"
    },
    totalCount: null
  });

  expect(sliders).toHaveBeenCalled();
  expect(sliders.mock.calls[0][1]).toBe("123");
});
