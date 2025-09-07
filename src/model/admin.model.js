import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const adminSchema = new mongoose.Schema(
    {

        email: { type: String },
        password: { type: String },
        isAdmin: {
            type: Boolean,
            default: false
        },
        OTP: Number

    },
    { timestamps: true }
);

adminSchema.pre('save', async function (next) {

    if (this.isModified('password'))
        this.password = await bcrypt.hash(this.password, 10);
    next();

})

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
export default Admin
