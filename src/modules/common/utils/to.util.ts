export async function to<T, E = Error>(
  promise: Promise<T>,
): Promise<[E | null, T | null]> {
  try {
    const data = await promise
    return [null, data]
  } catch (error) {
    return [error as E, null]
  }
}
