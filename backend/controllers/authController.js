import User from '../models/userModel.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dddd78436@gmail.com',
      pass: '12345678.BOMDIA'
    }
  });
  
  export default transporter;

// Função para gerar e-mail de recuperação de senha
export const sendPasswordResetEmail = async (email, token) => {
  const mailOptions = {
    from: 'dddd78436@gmail.com',
    to: email,
    subject: 'Redefinir Palavra-passe',
    text: `Clique no link para redefinir sua palavra-passe: http://localhost:3000/reset-password/${token}`
  };

  await transporter.sendMail(mailOptions);
};

// Controlador para lidar com a solicitação de redefinição de senha
export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'E-mail não encontrado.' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
    await user.save();

    await sendPasswordResetEmail(email, token);

    res.status(200).json({ message: 'E-mail de recuperação de senha enviado.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};