import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { TriangleAlert } from "lucide-react";
import { AuthFlow } from "../types";
import { ActionLogin } from "@/app/(auth)/auth/action";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

interface Props {
  setState: (state: AuthFlow) => void;
}

const SignInCard: React.FC<Props> = ({ setState }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    startTransition(async () => {
      try {
        const result = await ActionLogin({
          email,
          password,
        });

        if (result?.error) {
          setError(result.error);
          return;
        }

        if (result?.errors) {
          const firstError = Object.values(result.errors)[0]?.[0];
          setError(firstError || "Invalid input");
          return;
        }

        router.push("/");
        router.refresh();
      } catch (err) {
        console.error("Login error:", err);
        setError("An unexpected error occurred. Please try again.");
      }
    });
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-none w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Login to Continue</CardTitle>
        <CardDescription>Use your email to login</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="bg-destructive/15 text-destructive p-3 rounded-md flex items-center gap-x-2 text-sm">
            <TriangleAlert className="size-4" />
            {error}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            placeholder="Email"
            disabled={isPending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
          <Input
            placeholder="Password"
            type="password"
            disabled={isPending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Signing In..." : "Sign In"}
          </Button>
        </form>
        <Separator className="my-4" />
        <Button
          className="w-full flex items-center justify-center gap-2 relative"
          disabled={isPending}>
          Continue with Google
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Don&apos;t have an account?{" "}
          <span
            className="text-sky-700 hover:underline cursor-pointer"
            onClick={() => setState("signUp")}>
            Sign Up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignInCard;
