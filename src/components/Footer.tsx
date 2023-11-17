import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";

export default function Footer() {
  const logoClassName = "h-[3rem] w-auto";

  return (
    <footer className={"container pt-16 pb-24"}>
      <div
        className={"border-t border-gray-950/40 dark:border-gray-50/40 mb-8"}
      />

      <p className={"mb-8"}>A service proudly created and presented by:</p>

      <div className={"mb-12"}>
        <a href={"https://www.peter-kuhmann.de"} className={"no-default-style"}>
          <Image
            src={"/peterkuhmann-logo.svg"}
            alt={"Logo of Peter Kuhmann"}
            width={5590}
            height={1000}
            className={clsx(logoClassName, "dark:hidden")}
          />

          <Image
            src={"/peterkuhmann-logo-dark.svg"}
            alt={"Logo of Peter Kuhmann"}
            width={5590}
            height={1000}
            className={clsx(logoClassName, "hidden dark:block")}
          />
        </a>
      </div>

      <div className={"flex flex-row gap-4 items-center flex-wrap"}>
        <a href={"https://www.peter-kuhmann.de"}>Website</a>
        <a href={"https://www.peter-kuhmann.de/impressum"}>Imprint</a>
        <Link href={"/privacy-policy"}>Privacy Policy</Link>
        <a href={"https://github.com/peter-kuhmann/youtube-chapter-generator"}>GitHub Repository</a>
      </div>
    </footer>
  );
}
