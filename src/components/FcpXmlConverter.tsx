"use client";

import clsx from "clsx";
import { ChangeEventHandler, useCallback, useRef, useState } from "react";
import { TextWriter, ZipReader } from "@zip.js/zip.js";
import MarkerDescription from "@/components/MarkerDescription";
import { useFcpXmlMarkers } from "@/hooks/fcp";

export default function FcpXmlConverter() {
  const [fcpXmlContent, setFcpXmlContent] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const fileSelected = useCallback((file: File | null) => {
    if (file === null) {
      setFcpXmlContent(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      return;
    }

    const zipReader = new ZipReader(file.stream());

    zipReader
      .getEntries()
      .then((entries) => {
        const fcpXmlFileEntry =
          entries.find((entry) => entry.filename.endsWith("/Info.fcpxml")) ??
          entries.find((entry) => entry.filename.endsWith(".fcpxml"));

        if (!!fcpXmlFileEntry) {
          // @ts-ignore
          return fcpXmlFileEntry.getData(new TextWriter()).then((data) => {
            setFcpXmlContent(data);
          });
        }
      })
      .catch((e) => {
        setFcpXmlContent(null);
        console.log({ e: e });
      });
  }, []);

  const onInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      fileSelected(
        event.target.files && event.target.files.length > 0
          ? event.target.files[0]
          : null,
      );
    },
    [fileSelected],
  );

  const onResetHandler = useCallback(() => {
    fileSelected(null);
  }, [fileSelected]);

  return (
    <div>
      <input
        ref={inputRef}
        id="fcpXmlInput"
        type={"file"}
        className={"hidden"}
        onChange={onInputChange}
      />

      <label
        onDragEnter={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setIsDragging(false);
        }}
        onDragOver={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            fileSelected(e.dataTransfer.files[0]);
          }
        }}
        htmlFor="fcpXmlInput"
        className={clsx(
          "block mb-8",
          "px-24 py-12",
          "text-center cursor-pointer",
          {
            "bg-my-purple text-gray-50": !isDragging,
            "bg-my-lemon text-gray-950": isDragging,
            "dark:bg-gray-50 dark:text-gray-950": !isDragging,
            "dark:bg-my-lemon dark:text-gray-950": isDragging,
          },
          { hidden: !!fcpXmlContent },
        )}
      >
        {isDragging ? (
          <>Drop it like it&apos;s hot 🍕</>
        ) : (
          <>Select FCP XML export</>
        )}
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
