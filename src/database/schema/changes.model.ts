import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Document } from "mongoose";

export type ChangesDocument = Changes & Document;

@Schema()
export class Changes {
  @Prop()
  MessageId: string;
  @Prop()
  MD5OfBody: string;
  @Prop()
  Body: string;
}

export const ChangesSchema = SchemaFactory.createForClass(Changes);
