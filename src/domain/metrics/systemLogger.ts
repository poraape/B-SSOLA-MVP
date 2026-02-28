type LogLevel = "debug" | "info" | "warn" | "error";

const isProd = process.env.NODE_ENV === "production";
const isTest = process.env.NODE_ENV === "test";
const warnedKeys = new Set<string>();

function shouldLog(level: LogLevel): boolean {
  if (isProd && level !== "error") return false;
  if (isTest && level !== "error") return false;
  return true;
}

function emit(level: LogLevel, message: string, context?: Record<string, unknown>): void {
  if (!shouldLog(level)) return;
  const payload = context ? { message, ...context } : { message };
  const text = `[Domain:${level}] ${JSON.stringify(payload)}`;

  if (level === "error") {
    console.error(text);
    return;
  }
  if (level === "warn") {
    console.warn(text);
    return;
  }
  if (level === "info") {
    console.info(text);
    return;
  }
  console.debug(text);
}

export const systemLogger = {
  debug(message: string, context?: Record<string, unknown>): void {
    emit("debug", message, context);
  },
  info(message: string, context?: Record<string, unknown>): void {
    emit("info", message, context);
  },
  warn(message: string, context?: Record<string, unknown>): void {
    emit("warn", message, context);
  },
  error(message: string, context?: Record<string, unknown>): void {
    emit("error", message, context);
  },
  warnOnce(key: string, message: string, context?: Record<string, unknown>): void {
    if (warnedKeys.has(key)) return;
    warnedKeys.add(key);
    emit("warn", message, context);
  },
};

