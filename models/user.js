const { Schema, model } = require('mongoose')


// hashing the password 
const { createHmac, randomBytes } = require('node:crypto')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        // required: true
    },
    profileImageURL: {
        type: String,
        default: './public/default.png',
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    }

}, { timestamps: true });


// hashing password
userSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) return;

    const salt = randomBytes(16).toString();

    const hashedPassword = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex");
    
    this.salt = salt;
    this.password = hashedPassword;

    next();
})

// Virtual Function for matching the hash password

userSchema.static("matchPassword", async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User not found!");

    // User password store in db
    const salt = user.salt;
    const hashedPassword = user.password;
    //  *** //

    // User provided password for login 
    const userProvidedHash = createHmac("sha256", salt)
        .update(password)
        .digest("hex");
    //  ****** //

    if (hashedPassword !== userProvidedHash)
        throw new Error("Incorrect Password!")

    // if match password then it will only return user
    return user;

})
//  ****** //
const User = model('user', userSchema);

module.exports = User;