import { loggerConfigs } from "@/app/configs";

export class LoggerHelper {
  private module: string;

  constructor(module: string) {
    this.module = module;
  }

  error = (...args: any[]) => {
    if (loggerConfigs.error) {
      const now = new Date();

      console.error(`${now.toISOString()} :: ${this.module}`, args);
    }
  };

  log = (...args: any[]) => {
    if (loggerConfigs.log) {
      const now = new Date();

      console.log(`${now.toISOString()} :: ${this.module}`, args);
    }
  };
}
