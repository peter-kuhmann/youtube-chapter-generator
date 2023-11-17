import { Marker } from "@/types/markers";
import { useMemo } from "react";
import { formatSecondsAsChapterTimestamp } from "@/logic/format";

export function useMarkersToDescription(markers: Marker[]): string {
  return useMemo(() => {
    return "Timestamps:\n" + markers
      .map((marker) => {
        return `${formatSecondsAsChapterTimestamp(marker.startSeconds)} ${
          marker.label
        }`;
      })
      .join("\n");
  }, [markers]);
}
