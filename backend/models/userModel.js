import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const gameSessionSchema = new Schema({
  gameName: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, default: null },
});

const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  profession: { type: String, default: 'Sem atividade profissional' },
  gender: { type: String, default: 'Não especificar' },
  profileImage: { type: String, default: "images/defaultUser.jpg" },
  isAdmin: { type: Boolean, default: false },
  gameSessions: [gameSessionSchema],
  gameStats: [{
    gameName: { type: String, required: true },
    totalPlayTime: { type: Number, default: 0 },
    lastPlayed: { type: Date, default: Date.now() },
  }],
  totalPlayTime: { type: Number, default: 0 },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date }
}, { timestamps: true });

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;