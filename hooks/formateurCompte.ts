export default function insertSeparatorAtMiddle(
  rib: string,
  separator: string = " "
): string {
  if (!rib) return "";

  const middleIndex = Math.floor(rib.length / 2);
  const ribWithSeparator =
    rib.slice(0, middleIndex) + separator + rib.slice(middleIndex);

  return ribWithSeparator;
}
