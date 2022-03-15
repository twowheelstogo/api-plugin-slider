import mockContext from "@reactioncommerce/api-utils/tests/mockContext.js";
import sliderQuery from "./slider.js";

beforeEach(() => {
  jest.resetAllMocks();
});

test("default - includes shopId and slider._id", async () => {
  const shopId = "s1";
  const slugOrId = "t1";
  const slider = {
    _id: "t1",
    shopId,
    isVisible: true,
    name: "shirts",
    displayTitle: "Shirts"
  };
  const query = {
    $or: [{ _id: slugOrId }, { slug: slugOrId }],
    shopId
  };
  mockContext.collections.Sliders.findOne.mockReturnValueOnce(slider);

  const result = await sliderQuery(mockContext, { shopId, slugOrId });

  expect(mockContext.collections.Sliders.findOne).toHaveBeenCalledWith(query);
  expect(result).toBe(slider);
});

test("default - includes shopId and slider.slug", async () => {
  const shopId = "s1";
  const slugOrId = "slug1";
  const slider = {
    shopId,
    slug: slugOrId,
    isVisible: true,
    name: "shirts",
    displayTitle: "Shirts"
  };
  const query = {
    $or: [{ _id: slugOrId }, { slug: slugOrId }],
    shopId
  };
  mockContext.collections.Sliders.findOne.mockReturnValueOnce(slider);

  const result = await sliderQuery(mockContext, { shopId, slugOrId });

  expect(mockContext.collections.Sliders.findOne).toHaveBeenCalledWith(query);
  expect(result).toBe(slider);
});
