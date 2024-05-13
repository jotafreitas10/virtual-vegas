import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const gameSessionSchema = mongoose.Schema({
  gameName: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, default: null },
});

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  username: {type: String, required: true, unique: true},
  email: { type: String, required: true,  unique: true} ,
  password: { type: String, required: true},
  dateOfBirth: {type: String, required: true},
  profession: {type: String, default:'Sem atividade profissional'},
  gender: {type: String, default: 'Não especificar'},
  profileImage: {type: String, default:"images/defaultUser.jpg"},
  isAdmin: {type: Boolean, default: false},
  gameSessions: [gameSessionSchema], // Para registrar sessões de jogo
  gameStats: [{
    gameName: { type: String, required: true },
    totalPlayTime: { type: Number, default: 0 }, // Tempo total gasto em cada jogo (em minutos)
    lastPlayed: { type: Date, default: Date.now() }, // Última vez que o jogo foi jogado
  }],
  totalPlayTime: { type: Number, default: 0 }, // Tempo total gasto jogando no geral (em minutos)
},  {timestamps:true});

// Match user entered password to hashed password in database
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
