import { Marker } from "@/types/markers";
import { useMarkersToDescription } from "@/hooks/description";
import "./MarkerDescription.scss";
import { useCallback, useEffect, useRef, useState } from "react";

export type MarkerDescriptionProps = {
  markers: Marker[];
  onReset: () => void;
};

export default function MarkerDescription({
  markers,
  onReset,
}: MarkerDescriptionProps) {
  const description = useMarkersToDescription(markers);
  const descriptionParagraphRef = useRef<HTMLParagraphElement | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const onCopyHandler = useCallback(() => {
    if (descriptionParagraphRef.current) {
      const textRange = document.createRange();
      textRange.selectNodeContents(descriptionParagraphRef.current);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(textRange);

        navigator.clipboard
          .writeText(description)
          .then(() => {
            setCopySuccess(true);
          })
          .catch((err) => {
            document.execCommand("copy");
            setCopySuccess(true);
          });
      }
    }
  }, [description]);

  useEffect(() => {
    if (copySuccess) {
      const timeout = setTimeout(() => {
        setCopySuccess(false);
      }, 1500);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [copySuccess]);

  return (
    <div>
      <div className={"mb-4 flex flex-row gap-4 items-center justify-end"}>
        <button onClick={onReset}>Reset</button>
        <button onClick={onCopyHandler}>Copy to clipboard</button>
      </div>

      {copySuccess && <p className={"mb-4 text-right"}>Successfully copied.</p>}

      <p ref={descriptionParagraphRef} className={"marker-description"}>
        {description}
      </p>
    </div>
  );
}
