import { AWSError, Request } from "aws-sdk";
import { Cron, CronExpression } from "@nestjs/schedule";

import { AuthService } from "src/auth/auth.service";
import { Changes } from "src/database/schema/changes.model";
import { DBService } from "src/database/db.service";
import { Injectable } from "@nestjs/common";
import { ReceiveMessageResult } from "aws-sdk/clients/sqs";
import { SQSFifoService } from "src/aws/sqs.fifo.service";

@Injectable()
export class LogService {
  constructor(
    private readonly authService: AuthService,
    private readonly sqsFifoService: SQSFifoService,
    private readonly dbService: DBService
  ) {}

  getLogs(): Promise<Changes[]> {
    return this.dbService.findAll();
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  postLogs(): Request<ReceiveMessageResult, AWSError> {
    return this.sqsFifoService.pullMessages();
  }
}
