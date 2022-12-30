import { Controller, Get } from "@nestjs/common";

import { Changes } from "src/database/schema/changes.model";
import { LogService } from "./log.service";

@Controller("logs")
export class LogController {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly logsService: LogService) {}

  @Get()
  getLogs(): Promise<Changes[]> {
    return this.logsService.getLogs();
  }
}
