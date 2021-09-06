const models = require("../models/");
const jwt = require("jsonwebtoken");

exports.createComment = (req, res, next) => {

    const userId = req.params.userId;

    //Params
    const comment = req.body.content;
    const postId = req.params.postId;


    if (comment.length < 3) {
        return res.status(400).json({ error: "Merci de remplir tous les champs !" });
    }

    if (postId == null || undefined) {
        return res.status(400).json({ error: "Impossible d'ajouter un commentaire !" });
    }

    models.Comment.create({
        UserId: userId,
        PostId: postId,
        content: comment,
    })
        .then(comment => res.status(201).json({ message:"Le commentaire a bien été créé !" }))
        .catch(error => res.status(500).json({ error }))

}

exports.getAllComment = (req, res, next) => {
    //Params
    const postId = req.params.postId;

    models.Comment.findAll({
        attributes: ['id', 'PostId', 'UserId', 'content', 'createdAt', 'updatedAt'],
        where: { PostId: postId },
        include: [{
            model: models.User,
            attributes: ['username']
        }]
    })
        .then(comment => {
            if (comment.length === 0) {
                return res.status(200).json({ message: "Il ya aucun commentaire !" })
            }
            res.status(200).json({ comment })
        })
        .catch(error => res.status(400).json({ error: error }))
}

exports.getOneComment = (req, res, next) => {
    //Params
    const commentId = req.params.commentId;

    models.Comment.findOne({
        attributes: ["id", "PostId", "UserId", "content", "createdAt", "updatedAt"],
        where: { id: commentId },
        include: [{
            model: models.User,
            attributes: ['username']
        }]
    })
        .then(comment => {
            if (comment == null) {
                return res.status(404).json({ error: "Ce commentaire n'existe pas !" })
            }
            res.status(200).json({ comment })
        })
        .catch(error => res.status(403).json({ error: "Le commentaire est introuvable !" }))
}

exports.updateComment = (req, res, next) => {

    const token = req.headers.authorization.replace("Bearer ", "");
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    const userId = decodedToken.userId;

    //Params
    const commentContent = req.body.content;
    const commentId = req.params.commentId;

    models.Comment.findOne({
        attributes: ["id", "PostId", "UserId", "content"],
        where: { id: commentId }
    })
        .then(comment => {
            if (commentContent === comment.content || commentContent === null || commentContent.length < 3) {
                return res.status(400).json({ error: "aucune modification n'a été apportée !" })
            }
            if (comment.UserId === userId) {
                return comment.update({ comment: commentContent })
                    .then(comment => res.status(200).json({ message: 'Commentaire modifié !', PostId: comment.PostId }))
                    .catch(error => res.status(400).json({ error: 'Impossible de mettre à jour !' }));
            }

        })
        .catch(error => { res.status(404).json({ error: 'Commentaire non trouvé !' }) });
}

exports.deleteComment = (req, res, next) => {

    const token = req.headers.authorization.replace("Bearer ", "");
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    const userId = decodedToken.userId;

    //Params
    const commentId = req.params.commentId;

    models.Comment.findOne({
        where: { id: commentId }
    })
        .then(comment => {
            if (comment.UserId === userId) {
                return comment.destroy()
                    .then(comment => res.status(200).json({ message: "Le commentaire a bien été supprimé!" }))
                    .catch(error => res.status(400).json({ error: "Impossible de supprimer le commentaire !" }));
            }

        })
        .catch(error => res.status(404).json({ error: "Le commentaire est introuvable!" }));
}
