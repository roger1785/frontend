import { redirect } from "react-router-dom";

import { getProfile } from "../services/AuthService";

export const requireAuth = async () => {
  try {
    await getProfile();
  } catch (error) {
    return redirect("/login");
  }
};
