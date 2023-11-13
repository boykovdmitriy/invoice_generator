import { getModelForClass, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";

class InvoiceClass {
  @prop({ required: true })
  userId: mongoose.Types.ObjectId | string;

  @prop({ required: true })
  companyId: mongoose.Types.ObjectId | string;

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

  _id: mongoose.Types.ObjectId | string;

  id: string;
}

const Invoice = getModelForClass(InvoiceClass);
export { Invoice, InvoiceClass };
