const User = require('./userModel');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
const { username, email, password, confirmPassword, fullName } = req.body;
try {

    if (password !== confirmPassword) {
        req.flash('error', 'As senhas não coincidem.');
        return res.redirect('/register');
}

const emailExists = await User.findOne({ where: { email } });
const usernameExists = await User.findOne({ where: { username } });
if (emailExists || usernameExists) {
    req.flash('error', 'Este e-mail já está cadastrado.');
return res.redirect('/register');
}

const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

await User.create({
username,
email,
password: hashedPassword,
fullName
});

req.flash('success', 'Conta criada com sucesso! Faça seu login.');
res.redirect('/login');
} catch (error) {
    console.error(error);
    req.flash('error', 'Erro ao criar conta. Verifique os dados e tente novamente');
    res.redirect('/register');
  }
};  
