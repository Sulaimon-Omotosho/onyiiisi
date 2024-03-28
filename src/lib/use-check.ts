import User from "@/models/User";
import { getSession } from "next-auth/react";

// Define a function to check if the user is an admin
export async function isAdmin(): Promise<boolean> {
  try {
    // Retrieve the session
    const session = await getSession();
    // Check if session exists and user is an admin
    if (session && session.user && session.user.name === "admin") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking user role:", error);
    throw error;
  }
}
