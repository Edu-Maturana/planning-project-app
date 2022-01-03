import express, {Application} from 'express';
import cors from 'cors';

import userRoutes from './routes/users'; 
import authRoutes from './routes/auth';
import connection from './db/connection';

class Server {

    private app:Application;
    private port:string;
    private apiPaths = {
        auth: '/api/auth',
        users: '/api/users',
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {
        try {
            await connection.authenticate();
            console.log('Successful connection to the database.');
        }
        catch (error) {
            console.error('Unable to connect to the database', error);
        }
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Body Parser
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.apiPaths.auth, authRoutes);
        this.app.use(this.apiPaths.users, userRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port', this.port);
        });
    }
}

export default Server;