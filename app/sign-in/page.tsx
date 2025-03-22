

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
// import { redirect } from "next/navigation";

// import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CredentialsSignInForm from "./credentials-signin-form";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignIn = async (props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) => {
  const { callbackUrl } = await props.searchParams;
  const session = await auth();

  if (session) {
    return redirect(callbackUrl || "/");
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-4">
          <Link href="/" className="flex justify-center items-center">
            <Image
              priority={true}
              src="/images/survey-icon.png"
              width={100}
              height={100}
              alt={`survey app logo`}
            />
          </Link>
          <CardTitle className="text-center font-bold text-2xl">
            Sign In
          </CardTitle>
          <CardDescription className="text-center">
            Select a method to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CredentialsSignInForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
