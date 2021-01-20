const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    }
});

registerSchema.pre("save", async function (next) {
    if (this.isModified('password')){
        try 
        {
            this.password = await bcrypt.hash(this.password, 10);
            this.confirmPassword=undefined;
        }
        catch (error) {
            console.log(error)
        }
    }
    next();
})

const Register = new mongoose.model('Register', registerSchema);
module.exports = Register;