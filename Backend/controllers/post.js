const models = require("../models/");
const jwt = require("jsonwebtoken");
const _ = require('lodash');

exports.createPost = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET")
    const userId = decodedToken.userId

    //Params
    const title = req.body.title;
    const content = req.body.content;

    if (title.length <= 3 || content <= 3) {
        return res.status(200).json({error: "Merci de remplir tous les champs avec au moins trois caractères !"})
    }

    models.Post.create({
        title: title,
        content: content,
        UserId: userId,
        likes: 0,
        dislikes: 0
    })
        .then(post => res.status(201).json({message: "Le Post a été créé ! ", post}))
        .catch(error => res.status(500).json({error}));
}

exports.getAllPost = (req, res, next) => {

    models.Post.findAll({
        order: [['updatedAt', 'DESC']],
        attributes: ["id", "UserId", "title", "content", "likes", "dislikes","createdAt", "updatedAt"],
        include: [{
            model: models.User,
            attributes: ['username']
        }]

    })
        .then(post => {
            if (post === null) {
                return res.status(404).json({error: "Il n'y a aucun post !"})
            }
            res.status(200).json({post});
        })
        .catch(error => res.status(400).json({error: error}))

}

exports.getOnePost = (req, res, next) => {
    const postId = req.params.id;
    models.Post.findOne({
        attributes: ["id", "UserId", "title", "content", "likes", "dislikes", "createdAt", "updatedAt"],
        where: {id: postId},
        include: [{
            model: models.User,
            attributes: ['username']
        }]


    })
        .then(post => {
            if (post == null) {
                return res.status(404).json({error: "Ce post n'existe pas !"})
            }

            res.status(200).json({post});
        })
        .catch(error => res.status(403).json({error: "L'id est incorrect"}))
}

exports.updatePost = (req, res, next) => {

    const token = req.headers.authorization.replace("Bearer ", "");
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;

    //Params
    const title = req.body.title;
    const content = req.body.content;


    models.Post.findOne({

        attributes: ["id", "UserId", "title", "content"],
        where: {id: req.params.id}
    })
        .then(post => {
            if (_.isEmpty(title) || _.isEmpty(content)) {
                return res.status(400).json({error: "Merci de remplir tous les champs !"})
            }
            if (title === post.title && content === post.content) {
                return res.status(400).json({error: "Aucune chagement n'a été apporté !"})
            }
            if (post.UserId === userId) {
                return post.update({title: title, content: content})
                    .then(() => res.status(200).json({post, message: "Le post bien été modifié !"}))
                    .catch(error => res.status(400).json({error: "Impossible de mettre à jour !"}));
            }

        })
        .catch(error => res.status(404).json({error: "Le post est introuvable !"}));
}

exports.deletePost = (req, res, next) => {

    const token = req.headers.authorization.replace("Bearer ", "");
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;

    models.Post.findOne({
        where: {id: req.params.id}
    })
        .then(post => {
            if (post.UserId === userId) {
                return post.destroy()
                    .then(() => res.status(200).json({id:post.id,message: "Le post a été bien  supprimé !"}))
                    .catch(error => res.status(400).json({error: "Impossible de supprimer le psot !"}));
            }

        })
        .catch(error => res.status(404).json({error: "Le post n'a pas été  trouvé !"}));
}
