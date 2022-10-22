import { Request, Response, NextFunction } from "express";

import Log from "../utils/log";

function checkRequestAndResponse(req: Request, res: Response, next: NextFunction) {
    /* Log the request */
    Log.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on("finish", () => {
        /* Log the response */
        Log.info(`Outgoing -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
    });

    next();
}

function rulesOfHeaders(req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");

        return res.status(200).json({});
    }

    return next();
}

function generalError(req: Request, res: Response) {
    const error = new Error("Not found");

    Log.error(error);

    return res.status(404).json({ message: error.message });
}

export default { checkRequestAndResponse, rulesOfHeaders, generalError };
