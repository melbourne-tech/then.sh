declare global {
  interface Window {
    ENV: WindowEnv;
  }

  interface WindowEnv {
    LOOPS_API_KEY: string;
  }
}

export {};
