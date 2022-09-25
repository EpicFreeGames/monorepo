import { BitwisePermissionFlags, PermissionString } from "@efg/types";

export const calcPermissionStringsFromBits = (bits: number) =>
  Object.keys(BitwisePermissionFlags).filter(
    (perm) =>
      (bits & BitwisePermissionFlags[perm as PermissionString]) ===
      BitwisePermissionFlags[perm as PermissionString]
  );
