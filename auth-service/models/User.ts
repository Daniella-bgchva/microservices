import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    refreshToken?: string;
    checkPassword(password: string): Promise<boolean>;
}

const SALT_WORK_FACTOR = 10;

const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    refreshToken: { type: String },
}, {
    timestamps: true,
    versionKey: false
});

UserSchema.pre<IUser>("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, SALT_WORK_FACTOR);
});

UserSchema.methods.checkPassword = function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

UserSchema.set("toJSON", {
    transform: (_doc, ret) => {
        delete ret.password;
        delete ret.refreshToken;
        return ret;
    },
});

export const User = mongoose.model<IUser>("User", UserSchema);