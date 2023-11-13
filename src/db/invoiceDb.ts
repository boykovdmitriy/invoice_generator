import { Invoice, InvoiceClass } from "@/models/invoice";
import connectDB from "../lib/connectDb";
import { stringToObjectId } from "../lib/utils";

interface InvoicesFilter {
  page?: number;
  limit?: number;
}

export async function getInvoices(filter: InvoicesFilter = {}) {
  try {
    await connectDB();

    const page = filter.page ?? 1;
    const limit = filter.limit ?? 10;
    const skip = (page - 1) * limit;

    const invoices = await Invoice.find().skip(skip).limit(limit).lean().exec();

    const count = invoices.length;

    return {
      invoices: invoices,
      page,
      limit,
      count,
    };
  } catch (error) {
    return { error };
  }
}

export async function createInvoice(data: Omit<InvoiceClass, "id" | "_id">) {
  try {
    await connectDB();

    const invoice = await Invoice.create(data);

    return {
      invoice,
    };
  } catch (error) {
    return { error };
  }
}

export async function getInvoice(id: string) {
  try {
    await connectDB();

    const parsedId = stringToObjectId(id);

    if (!parsedId) {
      return { error: "invoice not found" };
    }

    const invoice = await Invoice.findById(parsedId).lean().exec();
    if (invoice) {
      return {
        invoice,
      };
    } else {
      return { error: "invoice not found" };
    }
  } catch (error) {
    return { error };
  }
}

export async function updateInvoice(id: string, data: Partial<InvoiceClass>) {
  try {
    await connectDB();

    const parsedId = stringToObjectId(id);

    if (!parsedId) {
      return { error: "invoice not found" };
    }

    const invoice = await Invoice.findByIdAndUpdate(parsedId, data, {
      new: true,
    })
      .lean()
      .exec();

    if (invoice) {
      return {
        invoice,
      };
    } else {
      return { error: "invoice not found" };
    }
  } catch (error) {
    return { error };
  }
}

export async function deleteInvoice(id: string) {
  try {
    await connectDB();

    const parsedId = stringToObjectId(id);

    if (!parsedId) {
      return { error: "Invoice not found" };
    }

    const invoice = await Invoice.findByIdAndDelete(parsedId).exec();

    if (invoice) {
      return {};
    } else {
      return { error: "invoice not found" };
    }
  } catch (error) {
    return { error };
  }
}
