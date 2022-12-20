import { DBModule } from "src/database/db.module";
import { Module } from "@nestjs/common";
import { SQSFifoService } from "./sqs.fifo.service";

@Module({
  imports: [DBModule],
  controllers: [],
  providers: [SQSFifoService],
  exports: [SQSFifoService],
})
export class SQSFifoModule {}
