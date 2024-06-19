"use client";

import { signIn } from "next-auth/react";

export default function SignInGoogle() {
  return (
    <button
      onClick={() =>
        signIn("google", {
          callbackUrl: `${window.location.origin}`,
        })
      }
      className="mt-6"
    >
      Login with Google
    </button>
  );
} 