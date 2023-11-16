import Image from "next/image";
import FcpXmlConverter from "@/components/FcpXmlConverter";

export default function FcpPage() {
  return (
    <main className={"container"}>
      <p className={"mb-8"}>
        Generate a YouTube chapter description based on your Final Cut Pro
        project&apos;s markers.
      </p>

      <p className={"mb-16"}>
        Export your FCP project as an XML file
        (File&nbsp;→&nbsp;Export&nbsp;XML) and select the file down below.
      </p>

      <FcpXmlConverter />
    </main>
  );
}
