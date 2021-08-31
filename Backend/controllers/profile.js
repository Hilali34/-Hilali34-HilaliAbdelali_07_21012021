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
            res.status(200).json({ user })
        })
        .catch(error => res.status(500).json({ error: "Impossible de récupérer l'tilisateur !"}))
}

exports.updateUserProfile = (req, res, next) => {
    //Params
    const userId = req.params.userId;
    const username = req.body.username;
    const bio = req.body.bio;

    models.User.findOne({
        attributes: ["id", 'username', "bio"],
        where: {id: userId}
    })
        .then(user => {
            if (user.id === userId) {
                return user.update({username: username, bio: bio})
                    .then(() => res.status(200).json({message: "Utilisateur modifié !"}))
                    .catch(error => res.status(500).json({error: "Impossible de mettre à jour !"}));
            }
        })
}

exports.deleteUserProfile = (req, res, next) => {
  //Params
   const userId = req.params.userId;
   const username = req.body.username;

   models.User.findOne({
       attributes: ["id", "username"],
       where: {id: userId}
   })
       .then(user => {
            if (username !== user.username) {
                return res.status(406).json({error: "Nom d'utilisateur incorrect !"})
            }
            if (user.id === userId) {
            return user.destroy()
            .then(() => res.status(200).json({message: "L'uilisateur a bien été supprimé !"}))
                .catch(error => res.status(400).json({error: "Impossible de supprimer l'utilisateur !"}));
            }
            res.status(400).json({error: "Impossible de supprimer l'utilisateur !"});
            })
                 .catch(error => res.status(404).json({error: "Utilisateur non trouvé !"}));
}
