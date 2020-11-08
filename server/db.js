var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
mongoose.connect('mongodb+srv://leviosa:TD6I18KKmB5JRdWz@dnd-encouters.k57ih.mongodb.net/dnd?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    encounters: {
        type: Array,
        required: false,
    }
});


userSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
})

module.exports = { Mongoose: mongoose, UserSchema: userSchema}