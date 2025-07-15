export function requiredEnvs(envs: string[]) {
  const missingEnvs = envs.filter((env) => !process.env[env])
  if (missingEnvs.length) {
    throw new Error(`Missing environment variables: ${missingEnvs.join(', ')}`)
  }
}
