import { FcpAssetClip, FcpMarker } from "@/types/fcp";
import { Marker } from "@/types/markers";

export function extractMarkersFromFcpXml(fcpXml: string): Marker[] {
  const xmlParser = new DOMParser();
  const xmlDom = xmlParser.parseFromString(fcpXml, "text/xml");

  const assetClipsWithMarkers: {
    assetClip: FcpAssetClip;
    marker: FcpMarker;
  }[] = Array.from(xmlDom.querySelectorAll("marker")).map((marker) => {
    const parentAssetClip = marker.closest("asset-clip");
    if (!parentAssetClip) throw new Error("Could not find parent asset-clip.");

    return {
      assetClip: {
        start: parentAssetClip.getAttribute("start") ?? "",
        offset: parentAssetClip.getAttribute("offset") ?? "",
      },
      marker: {
        start: marker.getAttribute("start") ?? "",
        value: marker.getAttribute("value") ?? "",
      },
    };
  });

  // Now we convert FCP times to readable marker data
  return assetClipsWithMarkers.map(({ assetClip, marker }) => {
    const assetClipStart = convertFcpTimeToSeconds(assetClip.start);
    const assetClipOffset = convertFcpTimeToSeconds(assetClip.offset);
    const markerStart = convertFcpTimeToSeconds(marker.start);

    return {
      startSeconds: Math.floor(markerStart - assetClipStart + assetClipOffset),
      label: marker.value,
    };
  });
}

export function convertFcpTimeToSeconds(fcpTime: string): number {
  if (fcpTime === "0s") return 0;

  const secondsMatch = /(\d+)\/(\d+)s/.exec(fcpTime);

  if (!secondsMatch) {
    throw new Error(
      `Could not extract FCP time (format '{d}/{d}s'). Got: '${fcpTime}'`,
    );
  }

  return parseInt(secondsMatch[1]) / parseInt(secondsMatch[2]);
}
