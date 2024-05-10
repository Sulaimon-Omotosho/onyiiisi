"use client";
import Studio from "./Studio";
import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

const SanityPage = () => {
  const [isAdminUser, setIsAdminUser] = useState<boolean>(false);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const session = await getSession();
        if (session) {
          console.log("Fetching admin status...");
          const response = await fetch("/api/admin", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setIsAdminUser(data.isAdmin);
        }
      } catch (error) {
        console.error("Error fetching admin status", error);
        setIsAdminUser(false);
      }
    };

    fetchUserInfo();
  }, []);
  return isAdminUser ? <Studio /> : null;
};

export default SanityPage;
