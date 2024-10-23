const LOOPS_API_KEY = process.env.LOOPS_API_KEY!;
if (!LOOPS_API_KEY) {
  throw new Error("Missing LOOPS_API_KEY environment variable");
}

export { LOOPS_API_KEY };
