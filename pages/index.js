import { Header } from "@/components/Header";
import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <main className="">
      <Header />
    </main>
  );
}
