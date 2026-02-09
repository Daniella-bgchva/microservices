import path from "path";
import { config as configDotenv } from "dotenv";
import { SignOptions } from "jsonwebtoken";

const envFile = process.env.NODE_ENV ? `.${process.env.NODE_ENV}.env` : ".env";
configDotenv({ path: path.resolve(process.cwd(), envFile) });

if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
    throw new Error("JWT Secrets (Access or Refresh) are not defined in ENV");
}

export const accessSecret = process.env.JWT_ACCESS_SECRET;
export const refreshSecret = process.env.JWT_REFRESH_SECRET;
export const port = process.env.PORT || 8000;

export const accessExpires = (process.env.ACCESS_EXPIRES || "1h") as SignOptions['expiresIn'];
export const refreshExpires = (process.env.REFRESH_EXPIRES || "7d") as SignOptions['expiresIn'];

export const db = process.env.MONGO_DB_URL || "mongodb://localhost/auth_service_db";

export const rootPath = __dirname;
export const publicPath = path.join(rootPath, "public");

const config = {
    accessSecret,
    refreshSecret,
    port,
    accessExpires,
    refreshExpires,
    db,
    rootPath,
    publicPath,
};

export default config;
