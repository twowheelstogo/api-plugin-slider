/* eslint-disable id-length */
import mockContext from "@reactioncommerce/api-utils/tests/mockContext.js";
import ReactionError from "@reactioncommerce/reaction-error";
import updateSlider from "./updateSlider.js";

const testShopId = "1234";
const testSliderId = "5678";

beforeEach(() => {
  jest.resetAllMocks();
});

test("calls mutations.updateSlider and returns the UpdateSliderPayload on success", async () => {
  mockContext.validatePermissions.mockReturnValueOnce(Promise.resolve(null));
  mockContext.collections.Sliders.updateOne.mockReturnValueOnce({ result: { n: 1 } });
  mockContext.collections.Sliders.findOne.mockReturnValueOnce({
    _id: "5678",
    shopId: "1234",
    isVisible: true,
    name: "shirts",
    displayTitle: "Shirts"
  });

  const input = {
    shopId: testShopId,
    sliderId: testSliderId,
    isVisible: true,
    name: "shirts",
    displayTitle: "Shirts"
  };
  const result = await updateSlider(mockContext, input);

  expect(result).toBeDefined();
  expect(mockContext.collections.Sliders.updateOne).toHaveBeenCalled();
});

test("calls mutations.updateSlider and throws for non admins", async () => {
  mockContext.validatePermissions.mockImplementation(() => {
    throw new ReactionError("access-denied", "Access Denied");
  });
  mockContext.collections.Sliders.updateOne.mockReturnValueOnce({ result: { n: 1 } });

  const result = updateSlider(mockContext, {});
  expect(result).rejects.toThrowErrorMatchingSnapshot();
  expect(mockContext.collections.Sliders.updateOne).not.toHaveBeenCalled();
});
