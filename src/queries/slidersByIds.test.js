import mockContext from "@reactioncommerce/api-utils/tests/mockContext.js";
import slidersByIds from "./slidersByIds.js";

const mockSliderIds = ["ID_ONE", "ID_TWO"];

beforeEach(() => {
  jest.resetAllMocks();
});

test("default", async () => {
  mockContext.collections.Sliders.find.mockReturnValueOnce("CURSOR");
  const result = await slidersByIds(mockContext, mockSliderIds);
  expect(mockContext.collections.Sliders.find).toHaveBeenCalledWith({ _id: { $in: mockSliderIds }, isDeleted: { $ne: true } });
  expect(result).toBe("CURSOR");
});

test("include deleted", async () => {
  mockContext.collections.Sliders.find.mockReturnValueOnce("CURSOR");
  const result = await slidersByIds(mockContext, mockSliderIds, { shouldIncludeDeleted: true });
  expect(mockContext.collections.Sliders.find).toHaveBeenCalledWith({ _id: { $in: mockSliderIds } });
  expect(result).toBe("CURSOR");
});
