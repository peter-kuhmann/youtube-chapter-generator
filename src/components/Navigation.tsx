"use client";

import Image from "next/image";

export default function Navigation() {
  return (
    <nav className={"container py-16 pb-24"}>
      <div className={"flex flex-row gap-12 items-end"}>
        <Image
          src={"/logo.svg"}
          width="1024"
          height="1024"
          alt={"Logo"}
          className={"max-w-[4rem] dark:hidden"}
        />

        <Image
          src={"/logo-dark.svg"}
          width="1024"
          height="1024"
          alt={"Logo"}
          className={"max-w-[4rem] hidden dark:inline-block"}
        />

        <div className={"text-xl sm:text-3xl md:text-4xl lg:text-5xl"}>
          YT chapter generator
        </div>
      </div>
    </nav>
  );
}
