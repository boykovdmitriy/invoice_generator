import { getModelForClass, prop } from "@typegoose/typegoose";

class CompanyClass {
  @prop({ required: true })
  userId: string;

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

  _id: string;
}

const Company = getModelForClass(CompanyClass);
export { Company, CompanyClass };
