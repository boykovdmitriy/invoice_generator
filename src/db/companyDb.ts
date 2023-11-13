import { Company, CompanyClass } from "@/models/company";
import connectDB from "../lib/connectDb";
import { stringToObjectId } from "../lib/utils";

interface CompaniesFilter {
  page?: number;
  limit?: number;
}

export async function getCompanies(filter: CompaniesFilter = {}) {
  try {
    await connectDB();

    const page = filter.page ?? 1;
    const limit = filter.limit ?? 10;
    const skip = (page - 1) * limit;

    const companies = await Company.find()
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();

    const count = companies.length;

    return {
      companies: companies,
      page,
      limit,
      count,
    };
  } catch (error) {
    return { error };
  }
}

export async function createCompany(data: CompanyClass) {
  try {
    await connectDB();

    const company = await Company.create(data);

    return {
      company,
    };
  } catch (error) {
    return { error };
  }
}

export async function getCompany(id: string) {
  try {
    await connectDB();

    const parsedId = stringToObjectId(id);

    if (!parsedId) {
      return { error: "Company not found" };
    }

    const company = await Company.findById(parsedId).lean().exec();
    if (company) {
      return {
        company,
      };
    } else {
      return { error: "Company not found" };
    }
  } catch (error) {
    return { error };
  }
}

export async function updateCompany(id: string, data: Partial<CompanyClass>) {
  try {
    await connectDB();

    const parsedId = stringToObjectId(id);

    if (!parsedId) {
      return { error: "Company not found" };
    }

    const company = await Company.findByIdAndUpdate(parsedId, data, {
      new: true,
    })
      .lean()
      .exec();

    if (company) {
      return {
        company,
      };
    } else {
      return { error: "company not found" };
    }
  } catch (error) {
    return { error };
  }
}

export async function deleteCompany(id: string) {
  try {
    await connectDB();

    const parsedId = stringToObjectId(id);

    if (!parsedId) {
      return { error: "company not found" };
    }

    const todo = await Company.findByIdAndDelete(parsedId).exec();

    if (todo) {
      return {};
    } else {
      return { error: "company not found" };
    }
  } catch (error) {
    return { error };
  }
}
