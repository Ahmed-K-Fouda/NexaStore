import { getCurrentSession, loginUser, registerUser } from "@/actions/auth";
import SignUp from "@/app/components/auth/sign_up/SignUp";
import { redirect } from "next/navigation";
import React from "react";
import zod from "zod";

const SignUpSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(5),
});



const SignUpPage = async () => {
  const { user } = await getCurrentSession();

  if (user) {
    return redirect("/");
  }

  const action = async (
    prevState: { message: string },
    formData: FormData
  ): Promise<{ message: string }> => {
    "use server";


    const parsed = SignUpSchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) {
      return { message: "Invalid form data" };
    }

    const { email, password } = parsed.data;
    const { user, error } = await registerUser(email, password);

    if (error) {
      return { message: error };
    } else if (user) {
      await loginUser(email, password);
      redirect("/");
      return { message: "" };
    }

    return { message: "An unexpected error occurred" };
  };

  return <SignUp action={action} />;
};

export default SignUpPage;
