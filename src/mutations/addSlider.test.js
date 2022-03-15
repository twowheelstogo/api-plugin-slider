import mockContext from "@reactioncommerce/api-utils/tests/mockContext.js";
import ReactionError from "@reactioncommerce/reaction-error";
import addSlider from "./addSlider.js";

beforeEach(() => {
  jest.resetAllMocks();
});

test("calls mutations.addSlider and returns the AddSliderPayload on success", async () => {
  mockContext.validatePermissions.mockReturnValueOnce(Promise.resolve(null));
  mockContext.collections.Sliders.insertOne.mockReturnValueOnce({ result: { ok: 1 } });

  const input = {
    shopId: "1234",
    name: "shirt",
    displayTitle: "Shirt",
    isVisible: true
  };
  const result = await addSlider(mockContext, input);

  expect(result).toBeDefined();
  expect(mockContext.collections.Sliders.insertOne).toHaveBeenCalled();
});

test("calls mutations.addSlider and throws for non admins", async () => {
  mockContext.validatePermissions.mockImplementation(() => {
    throw new ReactionError("access-denied", "Access Denied");
  });
  mockContext.collections.Sliders.insertOne.mockReturnValueOnce({ result: { ok: 1 } });

  const result = addSlider(mockContext, {});
  expect(result).rejects.toThrowErrorMatchingSnapshot();
  expect(mockContext.collections.Sliders.insertOne).not.toHaveBeenCalled();
});
