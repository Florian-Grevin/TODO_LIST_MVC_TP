const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const AppDataSource = require('./data-source')

module.exports = (passport) => {
passport.use(new LocalStrategy({
usernameField: 'email', // Indiquez à Passport quel champ sert d'identifiant
session: false // Désactivez les sessions (car on fait une API REST)
},
async (email, password, done) => {

    const userRepository = AppDataSource.getRepository("User");
    const user = await userRepository.findOne({ where: { email: email } });
    
// Si l'user n'existe pas OU si le mot de passe (bcrypt.compare) est faux :
    bcrypt.compare(password, user.password, function(err, res) {
        if (err){
            return response.json({success: false, message: 'Le mail ou le mot de passe est erronée'});
        }
        if (res) {
            // Si tout est bon :
            return done(null, user);
        } else {
            return response.json({success: false, message: 'Le mail ou le mot de passe est erronée'});
        }
    });
}
));
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