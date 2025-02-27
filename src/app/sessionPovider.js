"use client";
import { SessionProvider } from "next-auth/react";

export default function ProviderSession({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
