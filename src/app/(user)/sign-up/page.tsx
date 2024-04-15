"use client";
import { CustomFormFields } from "@/components/forms/custom-form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SignUpFormSchema, type SignUpFormType } from "@/lib/types";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoaderIcon } from "lucide-react";

const SignUpPage = () => {
  const { push } = useRouter();
  const form = useForm<SignUpFormType>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  //only details going to server is name, email, password
  const onSubmit = async (data: SignUpFormType) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        toast.success("User registration successful");
        push("/login");
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  // Minimum Number Of Years
  const minYear = 1900;
  const maxYear = new Date().getFullYear();

  return (
    <div
      className="bg-image py-20 flex items-center justify-center"
      style={{
        backgroundImage: "url(loginImg.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div className="bg-white w-full md:w-[80%] lg:w-[60%] xl:w-[50%] my-[80px] md:my-[150px] rounded-lg p-5 md:p-16">
        <h1 className="text-2xl font-bold text-center">
          Create your Onyiisi Account
        </h1>
        <p className="text-lg text-center">OR</p>
        <div className="text-md flex text-center justify-center items-center">
          <h2 className="">Continue with google </h2>
          <Button variant={"ghost"} size={"sm"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              style={{ color: "rgba(0, 0, 0, 1)" }}
            >
              <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
            </svg>
          </Button>
        </div>
        <p className="text-sm text-center">
          Already have an account?{" "}
          <span className="text-orange-800 underline">
            <Link href="/login">Log In</Link>
          </span>
        </p>

        <Form {...form}>
          <form
            className="flex flex-col justify-center pt-8 gap-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <CustomFormFields name="name" control={form.control} />
            {/* <div className='flex gap-4 w-full'>
              <CustomFormFields
                type='text'
                name='first name'
                control={form.control}
              />
              <CustomFormFields
                type='text'
                name='last name'
                control={form.control}
              />
            </div> */}
            <CustomFormFields name="email" control={form.control} />
            <CustomFormFields
              name="password"
              control={form.control}
              type="password"
            />
            <CustomFormFields
              name="confirm password"
              control={form.control}
              type="password"
            />
            <div className="">
              <p className="font-semibold text-sm">
                Gender <span className="text-slate-400 px-1">(optional)</span>
              </p>
              <div className="flex justify-between w-[50%] pt-2">
                <div className="flex gap-2 items-center">
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                    className="h-5 w-5"
                  />
                  <label htmlFor="male" className="text-sm">
                    Male
                  </label>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                    className="h-5 w-5"
                  />
                  <label htmlFor="female" className="text-sm">
                    Female
                  </label>
                </div>
              </div>
            </div>
            <div className="w-full">
              <p className="capitalize font-semibold text-sm">
                date of birth <span className="text-slate-400">(optional)</span>
              </p>
              <div className="flex gap-3 pt-3">
                <div className="relative py-[10px] w-1/3">
                  <label
                    htmlFor="dob.month"
                    className="font-semibold text-sm absolute bg-white left-6 top-0 capitalize px-2 rounded-full"
                  >
                    month
                  </label>
                  <input
                    type="number"
                    name="dob.month"
                    id="dob.month"
                    min={1}
                    max={12}
                    className="border-[1px] w-full border-gray-300 rounded-sm p-3"
                  />
                </div>
                <div className="relative py-[10px] w-1/3">
                  <label
                    htmlFor="dob.day"
                    className="font-semibold text-sm absolute bg-white left-6 top-0 capitalize px-2 rounded-full"
                  >
                    day
                  </label>
                  <input
                    type="number"
                    name="day"
                    id="dob.day"
                    min={1}
                    max={31}
                    className="border-[1px] w-full border-gray-300 rounded-sm p-3"
                  />
                </div>
                <div className="relative py-[10px] w-1/3">
                  <label
                    htmlFor="dob.year"
                    className="font-semibold text-sm absolute bg-white left-6 capitalize top-0 px-2 rounded-full"
                  >
                    year
                  </label>
                  <input
                    type="number"
                    name="year"
                    id="dob.year"
                    min={minYear}
                    max={maxYear}
                    className="border-[1px] w-full border-gray-300 rounded-sm p-3"
                  />
                </div>
              </div>
            </div>
            <div className="py-4">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  className="border-black"
                />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Please send <span className="font-semibold">Onyiisi</span>{" "}
                  updates directly to my inbox.
                </label>
              </div>
              <p className="text-sm text-gray-600 pt-3">
                You may cancel your subscription at any time. By ticking here,
                you agree that you understand our{" "}
                <Link href="/" className="font-semibold text-[rgb(95,40,74)]">
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link href="/" className="font-semibold text-[rgb(95,40,74)]">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
            <div className="flex justify-center">
              <Button
                className="text-white bg-[rgb(95,40,74)] py-1 lg:py-2 w-[50%] rounded-full uppercase font-thin justify-center gap-1 lg:gap-2 "
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && (
                  <LoaderIcon className="animate-spin h-4 w-4 mr-2" />
                )}
                Sign Up
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignUpPage;
