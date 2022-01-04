import express, { Application } from "express";
import cors from "cors";
const fileUpload = require("express-fileupload");

import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import projectRoutes from "./routes/projects";
import ticketRoutes from "./routes/tickets";
import workspaceRoutes from "./routes/workspaces";
import connection from "./db/connection";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    auth: "/api/auth",
    users: "/api/users",
    projects: "/api/projects",
    tickets: "/api/tickets",
    workspace: "/api/workspace",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";

    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    try {
      await connection.authenticate();
      console.log("Successful connection to the database.");
    } catch (error) {
      console.error("Unable to connect to the database", error);
    }
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Body Parser
    this.app.use(express.json());

    // File Upload
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.apiPaths.auth, authRoutes);
    this.app.use(this.apiPaths.projects, projectRoutes);
    this.app.use(this.apiPaths.users, userRoutes);
    this.app.use(this.apiPaths.tickets, ticketRoutes);
    this.app.use(this.apiPaths.workspace, workspaceRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port", this.port);
    });
  }
}

export default Server;
