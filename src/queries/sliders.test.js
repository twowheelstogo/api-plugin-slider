/* eslint-disable max-len */
import mockContext from "@reactioncommerce/api-utils/tests/mockContext.js";
import sliders from "./sliders.js";

const mockShopId = "SHOP_ID";

beforeEach(() => {
  jest.resetAllMocks();
});

test("default - isVisible only, excludes isDeleted", async () => {
  mockContext.collections.Sliders.find.mockReturnValueOnce("CURSOR");
  mockContext.userHasPermission.mockReturnValueOnce(true);
  const result = await sliders(mockContext, mockShopId);
  expect(mockContext.collections.Sliders.find).toHaveBeenCalledWith({ shopId: mockShopId, isDeleted: false, isVisible: true });
  expect(result).toBe("CURSOR");
});

test("explicit - isVisible only, excludes not isVisible", async () => {
  mockContext.collections.Sliders.find.mockReturnValueOnce("CURSOR");
  mockContext.userHasPermission.mockReturnValueOnce(true);
  const result = await sliders(mockContext, mockShopId, { shouldIncludeInvisible: false });
  expect(mockContext.collections.Sliders.find).toHaveBeenCalledWith({ shopId: mockShopId, isDeleted: false, isVisible: true });
  expect(result).toBe("CURSOR");
});

test("explicit - isVisible only, excludes isDeleted", async () => {
  mockContext.collections.Sliders.find.mockReturnValueOnce("CURSOR");
  mockContext.userHasPermission.mockReturnValueOnce(true);
  const result = await sliders(mockContext, mockShopId, { shouldIncludeDeleted: false });
  expect(mockContext.collections.Sliders.find).toHaveBeenCalledWith({ shopId: mockShopId, isDeleted: false, isVisible: true });
  expect(result).toBe("CURSOR");
});

test("explicit - isVisible only, excludes isDeleted and not isVisible", async () => {
  mockContext.collections.Sliders.find.mockReturnValueOnce("CURSOR");
  mockContext.userHasPermission.mockReturnValueOnce(true);
  const result = await sliders(mockContext, mockShopId, { shouldIncludeInvisible: false, shouldIncludeDeleted: false });
  expect(mockContext.collections.Sliders.find).toHaveBeenCalledWith({ shopId: mockShopId, isDeleted: false, isVisible: true });
  expect(result).toBe("CURSOR");
});

test("top-level only", async () => {
  mockContext.collections.Sliders.find.mockReturnValueOnce("CURSOR");
  mockContext.userHasPermission.mockReturnValueOnce(true);
  const result = await sliders(mockContext, mockShopId, { isTopLevel: true });
  expect(mockContext.collections.Sliders.find).toHaveBeenCalledWith({ shopId: mockShopId, isDeleted: false, isTopLevel: true, isVisible: true });
  expect(result).toBe("CURSOR");
});

test("non-top-level only", async () => {
  mockContext.collections.Sliders.find.mockReturnValueOnce("CURSOR");
  mockContext.userHasPermission.mockReturnValueOnce(true);
  const result = await sliders(mockContext, mockShopId, { isTopLevel: false });
  expect(mockContext.collections.Sliders.find).toHaveBeenCalledWith({ shopId: mockShopId, isDeleted: false, isTopLevel: false, isVisible: true });
  expect(result).toBe("CURSOR");
});

test("include isDeleted", async () => {
  mockContext.collections.Sliders.find.mockReturnValueOnce("CURSOR");
  mockContext.userHasPermission.mockReturnValueOnce(true);
  const result = await sliders(mockContext, mockShopId, { shouldIncludeDeleted: true });
  expect(mockContext.userHasPermission).toHaveBeenCalledWith("reaction:legacy:sliders", "read:invisible", { shopId: mockShopId });
  expect(mockContext.collections.Sliders.find).toHaveBeenCalledWith({ shopId: mockShopId, isVisible: true });
  expect(result).toBe("CURSOR");
});

test("top-level only, include isDeleted", async () => {
  mockContext.collections.Sliders.find.mockReturnValueOnce("CURSOR");
  mockContext.userHasPermission.mockReturnValueOnce(true);
  const result = await sliders(mockContext, mockShopId, { isTopLevel: true, shouldIncludeDeleted: true });
  expect(mockContext.userHasPermission).toHaveBeenCalledWith("reaction:legacy:sliders", "read:invisible", { shopId: mockShopId });
  expect(mockContext.collections.Sliders.find).toHaveBeenCalledWith({ shopId: mockShopId, isTopLevel: true, isVisible: true });
  expect(result).toBe("CURSOR");
});

test("non-top-level only, include isDeleted", async () => {
  mockContext.collections.Sliders.find.mockReturnValueOnce("CURSOR");
  mockContext.userHasPermission.mockReturnValueOnce(true);
  const result = await sliders(mockContext, mockShopId, { isTopLevel: false, shouldIncludeDeleted: true });
  expect(mockContext.userHasPermission).toHaveBeenCalledWith("reaction:legacy:sliders", "read:invisible", { shopId: mockShopId });
  expect(mockContext.collections.Sliders.find).toHaveBeenCalledWith({ shopId: mockShopId, isTopLevel: false, isVisible: true });
  expect(result).toBe("CURSOR");
});

test("include not visible - by an admin", async () => {
  mockContext.collections.Sliders.find.mockReturnValueOnce("CURSOR");
  mockContext.userHasPermission.mockReturnValueOnce(true);
  const result = await sliders(mockContext, mockShopId, { shouldIncludeInvisible: true });
  expect(mockContext.userHasPermission).toHaveBeenCalledWith("reaction:legacy:sliders", "read:invisible", { shopId: mockShopId });
  expect(mockContext.collections.Sliders.find).toHaveBeenCalledWith({ shopId: mockShopId, isDeleted: false });
  expect(result).toBe("CURSOR");
});

test("include invisible and only topLevel - by an admin", async () => {
  mockContext.collections.Sliders.find.mockReturnValueOnce("CURSOR");
  mockContext.userHasPermission.mockReturnValueOnce(true);
  const result = await sliders(mockContext, mockShopId, { shouldIncludeInvisible: true, isTopLevel: true });
  expect(mockContext.userHasPermission).toHaveBeenCalledWith("reaction:legacy:sliders", "read:invisible", { shopId: mockShopId });
  expect(mockContext.collections.Sliders.find).toHaveBeenCalledWith({ shopId: mockShopId, isDeleted: false, isTopLevel: true });
  expect(result).toBe("CURSOR");
});
