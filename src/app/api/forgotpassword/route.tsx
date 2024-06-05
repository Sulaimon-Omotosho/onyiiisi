import { z } from "zod";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { email } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "No user found with the provided email address" },
        { status: 404 }
      );
    }

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      // Configure your email service provider here
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const resetToken = "dummy-reset-token";
    const resetLink = `${process.env.BASE_URL}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: `<p>You requested a password reset. Input the otp below to reset your password:</p>
             <p>0234</p>`,
    };
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
