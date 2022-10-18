import SessionORM from '../models/session.model';

async function createSession(userId: string) {
    const newSession = await SessionORM.create({ user: userId });

    return newSession.toJSON();
}

export default { createSession };
