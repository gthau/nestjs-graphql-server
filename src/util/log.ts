import * as IO from 'fp-ts/lib/IO';

export type LogLevel = 'trace' | 'info' | 'debug' | 'warn' | 'error';

export function log(level: LogLevel, text: string): IO.IO<void> {
  const logFn = consoleFnByLogLevel(level);
  return () => logFn(text);
}

export const info = (text: string) => log('info', text);
export const debug = (text: string) => log('debug', text);
export const warn = (text: string) => log('warn', text);
export const error = (text: string) => log('error', text);
export const trace = (text: string) => log('trace', text);

function consoleFnByLogLevel(level: LogLevel): (...args: unknown[]) => void {
  switch (level) {
    case 'trace':
      return console.trace;
    case 'info':
      return console.info;
    case 'debug':
      return console.debug;
    case 'warn':
      return console.warn;
    case 'error':
      return console.error;
    default:
      return console.log;
  }
}
