import Head from "next/head";
import Link from "next/link";

import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, [router]);

  return null; // or loading spinner
}