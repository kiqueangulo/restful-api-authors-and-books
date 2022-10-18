import { Request, Response } from 'express';

import service from '../service/session.service';

async function createSessionHandler(req: Request, res: Response) {
    const session = await service.createSession(req.body.userId);

    return res.json(session);
}

export default { createSessionHandler };
