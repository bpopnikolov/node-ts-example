import express, { NextFunction, Request, Response } from 'express';

export const reqMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(`
    ----------------------------------
    REQUEST MIDDLEWARE
    HTTP ${req.method} ${req.url}
    ----------------------------------
    `);
    next();
};

export const exceptionLoggerMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {

    // Log exception
    console.error(`
    ----------------------------------
    EXCEPTION MIDDLEWARE
    HTTP ${req.method} ${req.url}
    ${error.message}
    ${error.stack}
    ----------------------------------
    `);

    // Hide stack from client for security reasons
    const e = { error: 'Internal server error' };
    res.status(500).json(e);

};
