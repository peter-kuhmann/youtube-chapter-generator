import { FcpAssetClip, FcpMarker } from "@/types/fcp";
import { Marker } from "@/types/markers";

export function extractMarkersFromFcpXml(fcpXml: string): Marker[] {
  const xmlParser = new DOMParser();
  const xmlDom = xmlParser.parseFromString(fcpXml, "text/xml");

  const assetClipsWithMarkers: {
    assetClips: FcpAssetClip[];
    marker: FcpMarker;
  }[] = Array.from(xmlDom.querySelectorAll("marker, chapter-marker")).map((marker) => {
    const parentAssetClips : Element[] = []

    let currentMarkerSearchNode = marker.parentElement
    while ( currentMarkerSearchNode ) {
      const parentAssetClip = currentMarkerSearchNode.closest("asset-clip")

      if ( parentAssetClip ) {
        currentMarkerSearchNode = parentAssetClip.parentElement
        parentAssetClips.push(parentAssetClip)
      } else {
        break
      }
    }

    if ( parentAssetClips.length === 0 ) throw new Error("Did not found any parent asset-clip elements for the marker.")

    return {
      assetClips: parentAssetClips.map(parentAssetClip => {
        return {
            start: parentAssetClip.getAttribute("start") ?? "",
            offset: parentAssetClip.getAttribute("offset") ?? "",
        }
      }),
      marker: {
        start: marker.getAttribute("start") ?? "",
        value: marker.getAttribute("value") ?? "",
      },
    };
  });

  // Now we convert FCP times to readable marker data
  return assetClipsWithMarkers.map(({ assetClips, marker }) => {
    let times : {start: number, offset: number}[] = [{
      start: convertFcpTimeToSeconds(marker.start),
      offset: 0
    }]

    assetClips.forEach(assetClip => {
      times.push({
        start: convertFcpTimeToSeconds(assetClip.start),
        offset: convertFcpTimeToSeconds(assetClip.offset)
      })
    })

    times.reverse()

    let head = 0
    let parentStart = 0

    for ( let i = 0; i < times.length; i++ ) {
      if ( i === times.length - 1 ) {
        // Last element (marker)
        head += times[i].start - parentStart
      } else {
        // asset-clips
        head += times[i].offset - parentStart
        parentStart = times[i].start
      }
    }

    return {
      startSeconds: head,
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
