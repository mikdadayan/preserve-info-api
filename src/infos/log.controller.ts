import { Controller, Get } from "@nestjs/common";

import { Changes } from "src/database/schema/changes.model";
import { LogService } from "./log.service";

@Controller("logs")
export class LogController {
  constructor(private readonly logsService: LogService) {}

  @Get()
  getLogs(): Promise<Changes[]> {
    return this.logsService.getLogs();
  }
}
