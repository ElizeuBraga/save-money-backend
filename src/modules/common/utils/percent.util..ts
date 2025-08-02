export default function percent<T>(
  totalPartial: number,
  totalGeneral: number,
): number {
  return Number(((totalPartial * 100) / totalGeneral).toFixed(2))
}
