import { User, UserClass } from "@/models/user";
import connectDB from "../lib/connectDb";
import { stringToObjectId } from "../lib/utils";

interface UsersFilter {
  page?: number;
  limit?: number;
}

export async function getUsers(filter: UsersFilter = {}) {
  try {
    await connectDB();

    const page = filter.page ?? 1;
    const limit = filter.limit ?? 10;
    const skip = (page - 1) * limit;

    const users = await User.find().skip(skip).limit(limit).lean().exec();

    const count = users.length;

    return {
      users: users,
      page,
      limit,
      count,
    };
  } catch (error) {
    return { error };
  }
}

export async function createUser(
  data: Omit<UserClass, "id" | "_id" | "address" | "paymentDetails">
) {
  try {
    await connectDB();

    const user = await User.create(data);

    return {
      user,
    };
  } catch (error) {
    return { error };
  }
}

export async function getUser(id: string) {
  try {
    await connectDB();

    const parsedId = stringToObjectId(id);

    if (!parsedId) {
      return { error: "User not found" };
    }

    const user = await User.findById(parsedId).lean().exec();
    if (user) {
      return {
        user,
      };
    } else {
      return { error: "User not found" };
    }
  } catch (error) {
    return { error };
  }
}

export async function getUserByRemoteId(id: string) {
  try {
    await connectDB();

    const user = await User.findOne({ remoteUserId: id }).lean().exec();
    if (user) {
      return {
        user,
      };
    } else {
      return { error: "User not found" };
    }
  } catch (error) {
    return { error };
  }
}

export async function updateUser(id: string, data: Partial<UserClass>) {
  try {
    await connectDB();

    const parsedId = stringToObjectId(id);

    if (!parsedId) {
      return { error: "User not found" };
    }

    const user = await User.findByIdAndUpdate(parsedId, data, {
      new: true,
    })
      .lean()
      .exec();

    if (user) {
      return {
        user,
      };
    } else {
      return { error: "User not found" };
    }
  } catch (error) {
    return { error };
  }
}

export async function deleteUser(id: string) {
  try {
    await connectDB();

    const parsedId = stringToObjectId(id);

    if (!parsedId) {
      return { error: "User not found" };
    }

    const user = await User.findByIdAndDelete(parsedId).exec();

    if (user) {
      return {};
    } else {
      return { error: "User not found" };
    }
  } catch (error) {
    return { error };
  }
}
