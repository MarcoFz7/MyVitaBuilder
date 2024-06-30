import { LoggerConfigs } from "@/app/configs";

export class LoggerHelper {
  private module: string;

  constructor(module: string) {
    this.module = module;
  }

  error = (...args: any[]) => {
    if (LoggerConfigs.error) {
      const now = new Date();

      console.error(`${now.toISOString()} :: ${this.module}`, args);
    }
  };

  log = (...args: any[]) => {
    if (LoggerConfigs.log) {
      const now = new Date();

      console.log(`${now.toISOString()} :: ${this.module}`, args);
    }
  };
}
