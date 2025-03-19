import { getCurrentSession, loginUser } from "@/actions/auth";
import SignIn from "@/app/components/auth/sign_in/SignIn";
import { redirect } from "next/navigation";
import zod from "zod";

const SignInSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(5),
});

const SignInPage = async () => {
  const { user } = await getCurrentSession();

  if (user) {
    return redirect("/");
  }

  const action = async (
    prevState: { message: string },
    formData: FormData
  ): Promise<{ message: string }> => {
    "use server";

    const parsed = SignInSchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) {
      return { message: "Invalid form data" };
    }

    const { email, password } = parsed.data;
    const { user, error } = await loginUser(email, password);

    if (error) {
      return { message: error };
    } else if (user) {
      redirect("/");
      return { message: "" };
    }

    return { message: "An unexpected error occurred" };
  };

  return <SignIn action={action} />;
};

export default SignInPage;
