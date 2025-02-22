"use server";

import { authUser } from "@/utils/isLogin";

export const getUser = async () => {
  try {
    const user = await authUser();
  

    if (!user) {
      return null;
    }

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Error in getUser:", error);
    return null;
  }
};
