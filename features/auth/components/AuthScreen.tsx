"use client";
import React, { useState } from "react";
import SignInCard from "./SignInScreen";
import SignUpCard from "./SignUpScreen";
import { AuthFlow } from "../types";

const AuthScreen = () => {
  const [state, setState] = useState<AuthFlow>("signIn");

  return (
    <div className="flex w-full justify-center items-center h-screen ">
      <div className="w-full max-w-md rounded-md bg-gray-50">
        {state === "signIn" ? (
          <SignInCard setState={setState} />
        ) : (
          <SignUpCard setState={setState} />
        )}
      </div>
    </div>
  );
};

export default AuthScreen;
