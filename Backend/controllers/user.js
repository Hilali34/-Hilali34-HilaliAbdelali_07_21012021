const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const models = require('../models');

exports.signup = (req, res, next) => {
    //Params

    const email = (req.body.email).trim();
    const username = req.body.username;
    const password = req.body.password;
    const bio = req.body.bio;

    //Regex email et mot de passe
    const regexEmail = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
    const regexPassword = /^(?=.*\d).{4,}$/;

    if (_.isEmpty(email) || _.isEmpty(password ) || _.isEmpty(username )) {
        return res.status(400).json({ error: "Merci de remplir le(s) champ(s) manquant(s) !" });
    }

    if ( username.length < 3) {
        return res.status(400).json({error: "Merci de saisir un  nom d'utilisateur d'au moisn trois caractères !"})
    }

    if (!regexEmail.test(email)) {
        return res.status(406).json({ error: "Merci de saisir un email valide !" });
    }
    if (!regexPassword.test(password)) {
        return res.status(406).json({ error: "Merci de saisir un mot de passe d'au moins quatre  caractères dont au moins un chiffre" });
    }

  models.User.findOne({
   attributes: ["email"],
    where: { email: email }
    })
   .then( function (userFound){
       if(!userFound){
           bcrypt.hash(password, 10)
               .then(hash => {
                   const user = models.User.create({
                       email: email,
                       username: username,
                       password: hash,
                       bio: bio
                   })
                       .then(user => {
                           res.status(201).json({ message:"utilisateur crée !"});
                       })
                       .catch(error => res.status(400).json({ error }));
               })
               .catch(error => {
                   res.status(500).json({ error })});
       }else{
        return res.status(409).json({error: "cette utilisateur exite deja !"})
        }

        })
        .catch( function(err){
         return res.status(500).json({error: "Impossible de verifier s'il l'utilisateur existe deja !"})
         })
}



exports.login = (req, res, next) => {

    //Params
    const email = req.body.email
    const password = req.body.password

    if (email == null || password == null) {
        return res.status(400).json({ error: "Merci de remplir le(s) champ(s) manquant(s) !" });
    }

    models.User.findOne({
        where: { email: email }
    })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: "Utilisateur non trouvé ! "});
            }
            bcrypt.compare(password, user.password)
                .then(valid => {
                    if(!valid) {
                        return res.status(401).json({ error: " Mot de passe incorrect ! "});
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id},
                            "RANDOM_TOKEN_SECRET",
                            { expiresIn: "24h"}
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }));
};
