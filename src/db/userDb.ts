import { User, UserClass } from "@/models/user";
import connectDB from "../lib/connectDb";
import { stringToObjectId } from "../lib/utils";

export async function createUser(
  data: Omit<UserClass, "_id" | "address" | "paymentDetails">
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

    const user = await User.findOne<UserClass>({ remoteUserId: id })
      .lean()
      .exec();
    if (user && user._id) {
      return { user } as { user: UserClass };
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

    if (user && user._id) {
      return { user };
    } else {
      return { error: "User not found" };
    }
  } catch (error) {
    return { error };
  }
}
