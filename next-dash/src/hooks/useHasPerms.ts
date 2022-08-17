import { Flags } from "~utils/api/flags";

export const useHasPerms = (flags: number, ...requiredFlags: Flags[]) =>
  hasPermission(flags, requiredFlags);

const hasPermission = (flags: number, requiredFlags: Flags[]) => {
  if (hasFlag(flags, Flags.ADMIN)) return true;

  const totalRequired = requiredFlags?.reduce((acc, flag) => acc | flag, 0);

  return hasFlag(flags, totalRequired);
};

const hasFlag = (flags: number, requiredFlag: Flags) => (flags & requiredFlag) === requiredFlag;
