import sjcl from "sjcl"

export function stringHash(text: string): string {
  const bitArray = sjcl.hash.sha256.hash(text)
  const hash = sjcl.codec.hex.fromBits(bitArray)
  return hash
}
