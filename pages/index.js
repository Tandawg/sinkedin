import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Head from "next/head";
import { getSession, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Feed from "@/components/Feed";
import { AnimatePresence } from "framer-motion";
import Modal from "@/components/Modal";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "@/atoms/modalAtom";

export default function Home() {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/home");
    },
  });

  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);

  useEffect(() => setMounted(true), []);
  console.log("current theme is", resolvedTheme);

  return (
    <div className="bg-[#F3F2Ef] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6 ">
      <Head>
        <title>Feed | SinkedIn</title>
        {mounted && (
          <>
            {resolvedTheme === "dark" ? (
              <link rel="icon" href="/linkedin-3-xl.png" />
            ) : (
              <link
                rel="icon"
                href="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/600px-LinkedIn_logo_initials.png"
                className="bg-white"
              />
            )}
          </>
        )}
      </Head>
      <Header />
      <main className="flex justify-center gap-x-5 px-4 sm:px-12">
        <div className="flex flex-col md:flex-row gap-5">
          <Sidebar />
          <Feed />
        </div>
        {/* Widgets */}
        <AnimatePresence>
          {modalOpen && (
            <Modal handleClose={() => setModalOpen(false)} type={modalType} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
