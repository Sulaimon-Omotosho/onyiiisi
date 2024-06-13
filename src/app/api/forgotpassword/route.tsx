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
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: { rejectUnauthorized: false },
    });

    const resetToken = "dummy-reset-token";
    const resetLink = `${process.env.BASE_URL}/reset-password?token=${resetToken}`;

    // const mailOptions = {
    //   from: process.env.MAIL_USER,
    //   to: email,
    //   subject: "Password Reset Request",
    //   html: `<p>You requested a password reset. Input the otp below to reset your password:</p>
    //          <p>0234</p>`,
    // };
    // await transporter.sendMail(mailOptions);

    await transporter.sendMail({
      from: `"Onyiisi" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Reset Password Request",
      text: `
      <p>You requested a password reset. Input the otp below to reset your password:</p>
                <p>0234</p>
      `,
    });
    return new Response(
      JSON.stringify({ message: "Password reset mail successfully sent" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
