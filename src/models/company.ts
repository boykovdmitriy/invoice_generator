import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";
import { User } from "./user";

@modelOptions({ schemaOptions: { collection: "company" } })
class CompanyClass {
  @prop({
    required: true,
    ref: () => User,
    type: mongoose.Types.ObjectId,
  })
  userId: mongoose.Types.ObjectId;

  @prop({ required: true })
  name: string;

  @prop({ required: true })
  responsiblePerson: string;
  rate: number;

  @prop({ required: true })
  prefix: string;

  @prop({ required: true })
  billTo: string;

  @prop({ required: true, default: "active" })
  status: "active" | "archive" | "deleted";

  _id: mongoose.Types.ObjectId;
}

const Company = mongoose.models.company || getModelForClass(CompanyClass);
export { Company, CompanyClass };
