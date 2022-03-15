import { encodeShopOpaqueId, encodeSliderOpaqueId } from "../../xforms/id.js";
import removeSlider from "./removeSlider.js";

beforeEach(() => {
  jest.resetAllMocks();
});

test("calls Mutation.removeSlider and returns the RemoveSliderPayload on success", async () => {
  const shopId = encodeShopOpaqueId("s1");
  const sliderId = encodeSliderOpaqueId("t1");
  const slider = {
    name: "shirt",
    displayTitle: "Shirt"
  };

  const fakeResult = { _id: sliderId, shopId, ...slider };
  const mockMutation = jest.fn().mockName("mutations.addSlider");
  mockMutation.mockReturnValueOnce(Promise.resolve(fakeResult));

  const context = {
    mutations: {
      removeSlider: mockMutation
    }
  };

  const result = await removeSlider(null, {
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
