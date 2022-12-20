import { ChangesSchema } from "./schema/changes.model";
import { DBService } from "./db.service";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Changes", schema: ChangesSchema }]),
  ],
  controllers: [],
  providers: [DBService],
  exports: [DBService],
})
export class DBModule {}
