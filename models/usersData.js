import mongoose from 'mongoose';

const userFormat= new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
      },
    name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
      },
})
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;