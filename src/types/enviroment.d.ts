export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_PORT: string;
      DB_USER: string;
      DB_PASS: string;
      DATABASE: string;
      DB_SCHEMA: string;
      ENV: "test" | "dev" | "prod";
      JWT_SECRET: string;
      BASE_URL: string;
    }
  }
}
