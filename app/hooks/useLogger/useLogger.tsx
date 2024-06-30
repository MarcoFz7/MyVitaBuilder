import { LoggerHelper } from "@/app/helpers";
import React from "react";

export const useLogger = (module: string) => {
  return React.useMemo(() => {
    return new LoggerHelper(module);
  }, [module]);
};
