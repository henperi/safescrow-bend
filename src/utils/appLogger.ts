/* eslint-disable @typescript-eslint/no-explicit-any */
import { log } from 'console';

export const appLogger = (...data: any): void => {
  log(data);
};
