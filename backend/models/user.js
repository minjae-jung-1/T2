const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    username: String,
    password: {
        type: String,
        required: true
    },
    csgo: {
        type: Schema.Types.Mixed,
        default: {
            rank: "s1",
            role: "awp"
        }
    },
    league: {
        type: Schema.Types.Mixed,
        default: {
            rank: "g1",
            role: "jg"
        }
    }
});

userSchema.pre("save", async function(next) {
    try {
        //generate a salt
        const salt = await bcrypt.genSalt(10);
        //generate salted password hash
        const passwordHash = await bcrypt.hash(this.password, salt);
        // assign hashed password over original
        this.password = passwordHash;
        next();
    } catch (error) {
        next(error);
    } 
})

userSchema.methods.isValidPassword = async function(newPassword) {
    try {
       return bcrypt.compare(newPassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
}

const User = mongoose.model("users", userSchema);

module.exports = User;