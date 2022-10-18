import dotenv from 'dotenv';

dotenv.config();

export const config = {
    mongo: {
        url: process.env.MONGO_URL || ''
    },
    server: {
        port: process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337
    },
    keys: {
        private: process.env.PRIVATE_KEY,
        public: process.env.PUBLIC_KEY
    }
};
