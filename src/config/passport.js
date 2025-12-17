const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const AppDataSource = require('./data-source')
const UserSchema = require("../models/user.entity");

module.exports = (passport) => {
// ==================================================
// 1. STRATÉGIE LOCAL (Sert uniquement au Login)
// ==================================================
passport.use(new LocalStrategy({
usernameField: 'email', // Indiquez à Passport quel champ sert d'identifiant
session: false // Désactivez les sessions (car on fait une API REST)
},
async (email, password, done) => {
// TODO :
// 1. Récupérez le Repository User via AppDataSource
    const userRepository = AppDataSource.getRepository("User");

// 2. Cherchez l'utilisateur par son email.
    const userMail = await userRepository.findOne({ where: { email: email } });

// 3. VÉRIFICATIONS :
    
// Si l'user n'existe pas OU si le mot de passe (bcrypt.compare) est faux :
    bcrypt.compare(password, userMail.password, function(err, res) {
        if (err){
            return response.json({success: false, message: 'Le mail ou le mot de passe est erronée'});
        }
        if (res) {
            // 4. SUCCÈS :
            // Si tout est bon :
            return done(null, user);
        } else {
            // response is OutgoingMessage object that server response http request
            return response.json({success: false, message: 'Le mail ou le mot de passe est erronée'});
        }
    });
}
));
// ==================================================
// 2. STRATÉGIE JWT (Sert aux routes protégées)
// ==================================================
const jwtOptions = {
// Indiquez à Passport où trouver le token 
jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// Indiquez la clé secrète
secretOrKey: process.env.JWT_SECRET
};
passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
    const userId = userRepository.findOne({ where: { id: payload.id } });
    if(userId && userId.trim()) return done(null, user);
    else return done(null, false);
}));
};