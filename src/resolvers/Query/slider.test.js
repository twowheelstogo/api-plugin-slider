import { encodeShopOpaqueId, encodeSliderOpaqueId } from "../../xforms/id.js";
import sliderQuery from "./slider.js";

beforeEach(() => {
  jest.resetAllMocks();
});

test("calls Query.slider and returns the slider on success", async () => {
  const shopId = encodeShopOpaqueId("s1");
  const sliderId = encodeSliderOpaqueId("t1");
  const slider = {
    _id: "t1",
    shopId: "s1",
    isVisible: true,
    name: "shirts",
    displayTitle: "Shirts"
  };

  const fakeResult = { _id: sliderId, shopId, ...slider };
  const mockMutation = jest.fn().mockName("queries.slider");
  mockMutation.mockReturnValueOnce(Promise.resolve(fakeResult));

  const context = {
    queries: {
      slider: mockMutation
    }
  };

  const result = await sliderQuery(null, {
    input: {
      shopId,
      sliderId,
      clientMutationId: "clientMutationId"
    }
  }, context);

  expect(result).toEqual(slider);
});
