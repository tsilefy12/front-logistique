export default function insertSeparatorAtMiddle(
  rib: number,
  separator: string = " "
): string {
  if (!rib) return "";
  const ribStr = rib.toString();

  if (ribStr.length !== 16) {
    throw new Error("Le numéro RIB doit contenir exactement 16 caractères.");
  }

  const ribWithSeparator = ribStr.replace(/(.{4})/g, `$1${separator}`).trim();

  return ribWithSeparator;
}
