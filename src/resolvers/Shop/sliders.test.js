import getFakeMongoCursor from "@reactioncommerce/api-utils/tests/getFakeMongoCursor.js";
import slidersResolver from "./sliders.js";

const shopId = "123";

const mockSliders = [
  { _id: "a1", name: "Men" },
  { _id: "b2", name: "Women" },
  { _id: "c3", name: "Children" }
];

const mockSlidersQuery = getFakeMongoCursor("Sliders", mockSliders);

test("calls queries.sliders and returns a partial connection", async () => {
  const sliders = jest.fn().mockName("queries.sliders").mockReturnValueOnce(Promise.resolve(mockSlidersQuery));

  const context = {
    queries: { sliders }
  };

  const result = await slidersResolver({ _id: shopId }, {}, context, { fieldNodes: [] });

  expect(result).toEqual({
    nodes: mockSliders,
    pageInfo: {
      endCursor: "c3",
      startCursor: "a1"
    },
    totalCount: null
  });

  expect(sliders).toHaveBeenCalledWith(context, shopId, {});
});
