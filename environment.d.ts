declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_USER: string;
      DB_NAME: string;
      DB_PASSWORD: string;
      DB_PORT: string;
      DB_HOST: string;
      API_PORT: string;
      ENV: "development" | "staging" | "production";
    }
  }
}

export {};
