export function newError(e: unknown): Error {
  return new Error(String(e));
}

export function newErrorObj(e: unknown): { error: Error } {
  return { error: newError(e) };
}
