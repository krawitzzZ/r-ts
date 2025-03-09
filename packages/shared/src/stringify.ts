export function stringify(value: unknown, quoteString = false): string {
  if (value instanceof Promise) {
    return "promise";
  }

  if (value === null) {
    return "null";
  }

  if (value === undefined) {
    return "undefined";
  }

  if (typeof value === "string") {
    return quoteString ? `'${value}'` : value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (typeof value === "symbol") {
    return value.toString();
  }

  if (typeof value === "bigint") {
    return value.toString() + "n";
  }

  if (typeof value === "function") {
    return `[Function: ${value.name || "anonymous"}]`;
  }

  if (typeof value === "object") {
    const v = value as { toString?: () => string };

    if (
      typeof v.toString === "function" &&
      v.toString !== Object.prototype.toString
    ) {
      return v.toString();
    }

    try {
      return JSON.stringify(value);
    } catch {
      return "[Circular or Unstringifiable Object]";
    }
  }

  return "[Unknown Type]";
}
