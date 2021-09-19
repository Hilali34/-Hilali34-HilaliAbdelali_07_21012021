const models = require('../models/');

exports.getUserProfile = (req, res, next) => {
    //Params
    const userId = req.params.userId

    models.User.findOne({
        attributes: [ "id", "email", "username", "bio" ],
        where: { id: userId }
    })
        .then(user => {
            if (user == null) {
                return res.status(404).json({ error: "Utilisateur non trouvé !" })
            }
            res.status(200).json({ user,message: "L'utilisateur a bien été supprimé"})
        })
        .catch(error => res.status(500).json({ error: "Impossible de récupérer l'tilisateur !"}))
}

exports.updateUserProfile = (req, res, next) => {
    //Params
    const userId = req.params.userId;
    const email = req.body.email;
    const username = req.body.username;
    const bio = req.body.bio;

    models.User.findOne({
        attributes: ["id", 'username', "bio"],
        where: {id: userId}
    })
        .then(user => {

            if (user.id == userId) {
                return user.update({email:email, username: username, bio: bio})
                    .then(() => res.status(200).json({user,message: "L'tilisateur  a été modifié avec succes !"}))
                    .catch(error => res.status(500).json({error: "Impossible de mettre à jour les informations !"}));
            }
        })
    .catch(error => res.status(500).json({error: "Utilisateur introuvable !"}));
}

exports.deleteUserProfile = (req, res, next) => {
  //Params
   const userId = req.params.userId;


    models.Comment.destroy({
        where:{Userid: userId}
    })

    models.Like.destroy({
        where:{Userid: userId}
    })

    models.User.findOne({
           where: {id: userId}
       })
           .then(user => {
                if (user.id == userId) {
                return user.destroy()
                .then(() => res.status(201).json({message: "L'uilisateur a bien été supprimé !"}))
                    .catch(error => res.status(400).json({error: "Impossible de supprimer l'utilisateur !"}));
                }
                res.status(400).json({error: "Impossible de supprimer l'utilisateur !"});
                })
                     .catch(error => res.status(404).json({error: "Utilisateur non trouvé !"}));
}
