import * as Express from 'express';

export interface MiddlwareFunction extends Function {
  (req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void>;
}
