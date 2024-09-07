export default function insertSeparatorAtMiddle(
  rib: number,
  separator: string = " "
): string {
  if (!rib) return "";
  const ribStr = rib.toString();

  const ribWithSeparator = ribStr.replace(/(.{4})/g, `$1${separator}`).trim();

  return ribWithSeparator;
}
