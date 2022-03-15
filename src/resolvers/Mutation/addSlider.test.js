import { encodeShopOpaqueId, encodeSliderOpaqueId } from "../../xforms/id.js";
import addSlider from "./addSlider.js";

beforeEach(() => {
  jest.resetAllMocks();
});

test("calls Mutation.addSlider and returns the AddSliderPayload on success", async () => {
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
      addSlider: mockMutation
    }
  };

  const result = await addSlider(null, {
    input: {
      ...slider,
      clientMutationId: "clientMutationId"
    }
  }, context);

  expect(result).toEqual({
    slider: fakeResult,
    clientMutationId: "clientMutationId"
  });
});
