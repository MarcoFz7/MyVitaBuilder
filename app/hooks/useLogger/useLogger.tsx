import { LoggerConfigs } from "@/app/configs";
import React from "react";

export const useLogger = (module: string) => {
  return React.useMemo(
    () => ({
      error: (...args: any[]) => {
        if (LoggerConfigs.error) {
          const now = new Date();

          console.error(`${now.toISOString()} :: ${module}`, args);
        }
      },
      log: (...args: any[]) => {
        if (LoggerConfigs.log) {
          const now = new Date();

          console.log(`${now.toISOString()} :: ${module}`, args);
        }
      },
    }),
    [module]
  );
};
