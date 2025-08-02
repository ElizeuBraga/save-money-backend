export async function sum(data: number[]): Promise<number> {
  if (!data || data.length === 0) {
    return 0
  }

  return data.reduce((acc, value) => acc + value, 0)
}
