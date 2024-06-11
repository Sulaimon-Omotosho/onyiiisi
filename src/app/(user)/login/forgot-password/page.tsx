"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const parsedData = forgotPasswordSchema.parse({ email });
      const { email: parsedEmail } = parsedData;

      const response = await fetch("/api/forgotpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: parsedEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setError("");
      } else {
        setError(data.error);
        setSuccess("");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors.map((err) => err.message).join(", "));
        setSuccess("");
      } else {
        setError("Internal Server Error");
        setSuccess("");
      }
    }
  };
  return (
    <div
      className="bg-image py-20 flex items-center justify-center"
      style={{
        backgroundImage: "url(/loginImg.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div className="bg-white w-full md:w-[80%] lg:w-[60%] xl:w-[50%] my-[80px] md:my-[150px] rounded-lg p-5 md:p-16">
        <h1 className="text-xl md:text-2xl font-bold text-center">
          Forgot your password?
        </h1>
        <p className="text-sm text-center">
          We&apos;ve got you, please enter your registered email address
        </p>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
        <form
          className="flex flex-col justify-center pt-8 gap-6"
          onSubmit={handleSubmit}
        >
          <div className="relative py-[10px]">
            <label
              htmlFor="email"
              className="font-semibold text-sm absolute bg-white left-6 top-0 px-2 rounded-full"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              className="border-[1px] border-gray-300 rounded-sm p-3 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <input
              type="submit"
              value="continue"
              className="text-white bg-[rgb(95,40,74)] py-1 lg:py-2 w-[50%] rounded-full uppercase font-thin justify-center gap-1 lg:gap-2 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
