import { getModelForClass, prop } from "@typegoose/typegoose";

class UserClass {
  @prop({ required: true })
  remoteUserId: string;

  @prop({ required: true })
  name: string;

  @prop({ required: true })
  email: string;

  address: string;

  paymentDetails: string;

  _id: string;
}

const User = getModelForClass(UserClass);
export { User, UserClass };
