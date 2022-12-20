import { Changes, ChangesDocument } from "./schema/changes.model";
import { Injectable, Logger } from "@nestjs/common";

import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class DBService {
  constructor(
    @InjectModel("Changes")
    private readonly changesModel: Model<ChangesDocument>
  ) {}

  private readonly logger = new Logger(DBService.name);

  async create(message: ChangesDocument): Promise<Changes> {
    const createdDocument = new this.changesModel(message);
    this.logger.log("Document was stored in the database");
    return createdDocument.save();
  }

  async findAll(): Promise<Changes[]> {
    this.logger.log("FIND ALL LOGS ");
    return this.changesModel.find().exec();
  }
}
