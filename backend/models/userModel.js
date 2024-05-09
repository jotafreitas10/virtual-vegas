import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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
