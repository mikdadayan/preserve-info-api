import { AuthModule } from "src/auth/auth.module";
import { DBModule } from "src/database/db.module";
import { LogController } from "./log.controller";
import { LogService } from "./log.service";
import { Module } from "@nestjs/common";
import { SQSFifoModule } from "src/aws/sqs.fifo.module";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [ScheduleModule.forRoot(), AuthModule, SQSFifoModule, DBModule],
  controllers: [LogController],
  providers: [LogService],
})
export class LogModule {}
