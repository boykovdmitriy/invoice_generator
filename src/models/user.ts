import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";

@modelOptions({
  schemaOptions: { collection: "user" },
  options: { customName: "user" },
})
class UserClass {
  @prop({ required: true, unique: true })
  remoteUserId: string;

  @prop({ required: true })
  name: string;

  @prop({ required: true })
  email: string;

  address: string;

  paymentDetails: string;

  _id: mongoose.Types.ObjectId;
}

const User = mongoose.models.user || getModelForClass(UserClass);
export { User, UserClass };
