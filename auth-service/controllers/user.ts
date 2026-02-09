import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import config from "../config";

const generateAccessToken = (userId: string) => {
    return jwt.sign({ id: userId }, config.accessSecret, {
        expiresIn: config.accessExpires
    });
};

const generateRefreshToken = (userId: string) => {
    return jwt.sign({ id: userId }, config.refreshSecret, {
        expiresIn: config.refreshExpires
    });
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        const valid = await user.checkPassword(password);
        if (!valid) return res.status(401).json({ error: "Invalid credentials" });

        const accessToken = generateAccessToken(user._id.toString());
        const refreshToken = generateRefreshToken(user._id.toString());

        user.refreshToken = refreshToken;
        await user.save();

        res.json({ accessToken, refreshToken });
    } catch (e) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const refresh = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ error: "Refresh token missing" });

    let payload: { id: string };
    try {
        payload = jwt.verify(refreshToken, config.refreshSecret) as { id: string };
    } catch {
        return res.status(401).json({ error: "Invalid or expired refresh token" });
    }

    const user = await User.findById(payload.id);

    if (!user || user.refreshToken !== refreshToken) {
        return res.status(401).json({ error: "Refresh token not valid" });
    }

    const newAccessToken = generateAccessToken(user._id.toString());
    const newRefreshToken = generateRefreshToken(user._id.toString());

    user.refreshToken = newRefreshToken;
    await user.save();

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
};

export const logout = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: "Refresh token missing" });

    const user = await User.findOne({ refreshToken });
    if (user) {
        user.refreshToken = undefined;
        await user.save();
    }

    res.json({ message: "Logged out successfully" });
};