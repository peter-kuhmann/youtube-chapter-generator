"use client";

import clsx from "clsx";
import { ChangeEventHandler, useCallback, useState } from "react";
import { TextWriter, ZipReader } from "@zip.js/zip.js";
import MarkerDescription from "@/components/MarkerDescription";
import { useFcpXmlMarkers } from "@/hooks/fcp";

export default function FcpXmlConverter() {
  const [fcpXmlContent, setFcpXmlContent] = useState<string | null>(null);

  const onInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];

        const zipReader = new ZipReader(file.stream());

        zipReader
          .getEntries()
          .then((entries) => {
            const fcpXmlFileEntry =
              entries.find((entry) =>
                entry.filename.endsWith("/Info.fcpxml"),
              ) ?? entries.find((entry) => entry.filename.endsWith(".fcpxml"));

            if (!!fcpXmlFileEntry) {
              // @ts-ignore
              return fcpXmlFileEntry.getData(new TextWriter()).then((data) => {
                setFcpXmlContent(data);
              });
            }
          })
          .catch(() => {
            setFcpXmlContent(null);
          });
      } else {
        setFcpXmlContent(null);
      }
    },
    [],
  );

  const onResetHandler = useCallback(() => {
    setFcpXmlContent(null);
  }, []);

  return (
    <div>
      <input
        id="fcpXmlInput"
        type={"file"}
        className={"hidden"}
        onChange={onInputChange}
      />

      <label
        htmlFor="fcpXmlInput"
        className={clsx(
          "block mb-8",
          "bg-my-purple text-gray-50",
          "dark:bg-gray-50 dark:text-gray-950",
          "px-24 py-12",
          "text-center cursor-pointer",
          { hidden: !!fcpXmlContent },
        )}
      >
        Select FCP XML file
        <br />
        or drop it here
      </label>

      {!!fcpXmlContent && (
        <ChapterDescriptionGenerator
          fcpXmlContent={fcpXmlContent}
          onReset={onResetHandler}
        />
      )}
    </div>
  );
}

type ChapterDescriptionGeneratorProps = {
  fcpXmlContent: string;
  onReset: () => void;
};

function ChapterDescriptionGenerator({
  fcpXmlContent,
  onReset,
}: ChapterDescriptionGeneratorProps) {
  const parseResult = useFcpXmlMarkers(fcpXmlContent);

  if (!parseResult.success) {
    return (
      <>
        <p className={"mb-4"}>An error occurred: {parseResult.error}</p>
        <button onClick={onReset}>Reset</button>
      </>
    );
  }

  return (
    <>
      {parseResult.markers.length === 0 ? (
        <>
          <p className={"mb-4"}>No markers found.</p>
          <button onClick={onReset}>Reset</button>
        </>
      ) : (
        <MarkerDescription markers={parseResult.markers} onReset={onReset} />
      )}
    </>
  );
}
