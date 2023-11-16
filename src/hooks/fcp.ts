import { Marker } from "@/types/markers";
import { extractMarkersFromFcpXml } from "@/logic/fcp";
import { useMemo } from "react";

export function useFcpXmlMarkers(
  fcpXmlContent: string,
): { success: true; markers: Marker[] } | { success: false; error: string } {
  try {
    return useMemo(() => {
      return {
        success: true,
        markers: extractMarkersFromFcpXml(fcpXmlContent),
      };
    }, [fcpXmlContent]);
  } catch (e: any) {
    return {
      success: false,
      error: e.msg ?? `${e}`,
    };
  }
}
