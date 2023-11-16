export function formatSecondsAsChapterTimestamp(totalSeconds: number): string {
  const secondsPart = totalSeconds % 60;
  const minutesPart = Math.floor(totalSeconds / 60);
  const hoursPart = Math.floor(minutesPart / 60);

  let timestamp = "";
  if (hoursPart > 0) timestamp += `${padNumberToTwoDigits(hoursPart)}:`;
  timestamp += `${padNumberToTwoDigits(minutesPart)}:`;
  timestamp += padNumberToTwoDigits(secondsPart);

  return timestamp;
}

export function padNumberToTwoDigits(value: number): string {
  if (value < 10) {
    return `0${value}`;
  }

  return `${value}`;
}
