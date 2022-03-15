import mockContext from "@reactioncommerce/api-utils/tests/mockContext.js";
import ReactionError from "@reactioncommerce/reaction-error";
import removeSlider from "./removeSlider.js";

const testShopId = "1234";
const testSliderId = "5678";

beforeEach(() => {
  jest.resetAllMocks();
});

test("calls mutations.removeSlider and returns the RemoveSliderPayload on success", async () => {
  mockContext.validatePermissions.mockReturnValueOnce(Promise.resolve(null));
  mockContext.collections.Sliders.deleteOne.mockReturnValueOnce({ result: { ok: 1 } });
  mockContext.collections.Sliders.findOne.mockReturnValueOnce({
    shopId: testShopId,
    sliderId: testSliderId
  });

  const input = {
    input: {
      shopId: testShopId,
      sliderId: testSliderId
    }
  };
  const result = await removeSlider(mockContext, input);

  expect(result).toEqual({
    shopId: testShopId,
    sliderId: testSliderId
  });
  expect(mockContext.collections.Sliders.deleteOne).toHaveBeenCalled();
});

test("calls mutations.removeSlider and throws for non admins", async () => {
  mockContext.validatePermissions.mockImplementation(() => {
    throw new ReactionError("access-denied", "Access Denied");
  });
  mockContext.collections.Sliders.deleteOne.mockReturnValueOnce({ result: { ok: 1 } });

  const result = removeSlider(mockContext, {});
  expect(result).rejects.toThrowErrorMatchingSnapshot();
  expect(mockContext.collections.Sliders.deleteOne).not.toHaveBeenCalled();
});
