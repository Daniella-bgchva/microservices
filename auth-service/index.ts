import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import userRouters from "./routers/userRouters";
import config from "./config";

const app = express();

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Auth Service API",
            version: "1.0.0",
            description: "Service for user authentication and JWT management",
        },
        servers: [{ url: `http://localhost:${config.port}` }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: ["./routers/*.ts", "./controllers/*.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(express.json());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/auth", userRouters);

const run = async () => {
    try {
        await mongoose.connect(config.db);
        console.log("MongoDB connected");

        app.listen(Number(config.port), "0.0.0.0", () => {
            console.log(`Auth Service running on port ${config.port}`);
            console.log(`Swagger: http://localhost:${config.port}/api-docs`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

run().catch(console.error);