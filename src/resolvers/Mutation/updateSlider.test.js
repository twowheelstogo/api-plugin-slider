import { encodeShopOpaqueId, encodeSliderOpaqueId } from "../../xforms/id.js";
import updateSlider from "./updateSlider.js";

beforeEach(() => {
  jest.resetAllMocks();
});

test("calls Mutation.updateSlider and returns the UpdateSliderPayload on success", async () => {
  const shopId = encodeShopOpaqueId("s1");
  const sliderId = encodeSliderOpaqueId("t1");
  const slider = {
    isVisible: true,
    name: "shirts",
    displayTitle: "Shirts"
  };

  const fakeResult = { _id: sliderId, shopId, ...slider };
  const mockMutation = jest.fn().mockName("mutations.updateSlider");
  mockMutation.mockReturnValueOnce(Promise.resolve(fakeResult));

  const context = {
    mutations: {
      updateSlider: mockMutation
    }
  };

  const result = await updateSlider(null, {
    input: {
      shopId,
      sliderId,
      clientMutationId: "clientMutationId"
    }
  }, context);

  expect(result).toEqual({
    slider: fakeResult,
    clientMutationId: "clientMutationId"
  });
});
