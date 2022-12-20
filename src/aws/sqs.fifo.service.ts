import { AWSError, Request, SQS } from "aws-sdk";
import { Injectable, Logger } from "@nestjs/common";

import { DBService } from "src/database/db.service";

@Injectable()
export class SQSFifoService {
  constructor(private readonly dbService: DBService) {}

  private readonly logger = new Logger(SQSFifoService.name);
  private readonly sqs = new SQS({
    apiVersion: process.env.AWS_API_VERSION,
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });
  private readonly params = {
    AttributeNames: ["SentTimestamp"],
    MaxNumberOfMessages: 1,
    MessageAttributeNames: ["All"],
    QueueUrl: process.env.AWS_SQS_CHANGES_FIFO_URL,
    VisibilityTimeout: 60,
    WaitTimeSeconds: 20,
  };

  pullMessages = (): Request<SQS.Types.ReceiveMessageResult, AWSError> => {
    const logger = this.logger;
    logger.debug("Pulling message from SQS");

    const removeMessage = this.removeMessage;
    const dbService = this.dbService;

    return this.sqs.receiveMessage(this.params, (err, data) => {
      if (err) {
        logger.error("Receive Error", err);
        return err;
      } else if (data.Messages) {
        logger.log("Successfully Pulled SQS Message");
        logger.debug(data);

        dbService.create(data.Messages[0] as any);
        removeMessage(
          process.env.AWS_SQS_CHANGES_FIFO_URL,
          data.Messages[0].ReceiptHandle
        );

        return data;
      } else {
        logger.debug("Message Attribute Not Found");
        logger.debug(data);
      }
    });
  };

  private removeMessage = (
    queueUrl,
    receiptHandle
  ): Request<Record<string, never>, AWSError> => {
    const deleteParams = {
      QueueUrl: queueUrl,
      ReceiptHandle: receiptHandle,
    };
    this.logger.debug("Removing message from SQS");
    return this.sqs.deleteMessage(deleteParams, (err, data) => {
      if (err) {
        this.logger.error("Delete Error", err);
      } else {
        this.logger.log("Message Deleted", data);
      }
    });
  };
}
