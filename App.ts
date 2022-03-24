// In the beginning, there were the environmental variables
import dotenv from 'dotenv';
dotenv.config();
// Then, an app was built from the dust

// Packages
import express from 'express';
import { createConnection } from 'typeorm';

// Config
import { connectionConfig } from '@config/database';
import configExpress, { ErrorHandler } from '@config/express';
import configRoutes from '@config/routes';

const PORT = process.env.SERVER_PORT;

createConnection(connectionConfig)
    .then(() => {
        console.log('🔌[database] Database connected.');

        const app = express();

        configExpress(app);
        configRoutes(app);

        app.use(ErrorHandler);

        app.listen(PORT, () => {
            console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
        });

    }).catch(error => {
        console.log(error);
    });