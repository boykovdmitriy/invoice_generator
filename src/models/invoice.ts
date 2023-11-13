import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";
import { User } from "./user";
import { Company } from "./company";

@modelOptions({ schemaOptions: { collection: "invoice" } })
class InvoiceClass {
  @prop({
    required: true,
    ref: () => User,
    type: mongoose.Types.ObjectId,
  })
  userId: mongoose.Types.ObjectId;

  @prop({
    required: true,
    ref: () => Company,
    type: mongoose.Types.ObjectId,
  })
  companyId: mongoose.Types.ObjectId;

  @prop({ required: true })
  serialNumber: number;

  dueDate: string;

  @prop({ required: true })
  creationDate: string;

  comments: string;

  items: Array<{
    name: string;
    quantity: number;
    price: number;
    comment: string;
  }>;

  total?: number;

  _id: mongoose.Types.ObjectId;
}

const Invoice = mongoose.models.invoice || getModelForClass(InvoiceClass);
export { Invoice, InvoiceClass };
