const requiredEnv = (name: string): string => {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value
}

export const env = {
  smtp: {
    host: requiredEnv("SMTP_HOST"),
    port: Number(requiredEnv("SMTP_PORT")),
    user: requiredEnv("SMTP_USER"),
    password: requiredEnv("SMTP_PASSWORD"),
    to: requiredEnv("SMTP_TO"),
  },
}
