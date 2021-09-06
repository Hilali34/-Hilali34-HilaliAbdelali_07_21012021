const models = require("../models");

exports.like = (req, res, next) => {
    //Params
    const LIKED = 1
    const postId = req.params.postId
    const userId = req.params.userId

    models.Post.findOne({
        attributes: ['id', 'like'],
        where: { id: postId }
    })
        .then(post => {
            models.LikePost.findOne({
                attributes: ['id', 'UserId', 'PostId', 'isLike'],
                where: { UserId: userId, PostId: postId }
            })
                .then(like => {
                    if (like) {
                        if (like.isLike === LIKED) {
                            return res.status(409).json({ count: post.like, message: "Vous avez deja like ce post !"})
                        }
                        return like.update({ isLike: LIKED })
                            .then(like => {
                                post.update({ like: post.like + 1 })
                                    .then(post => res.status(201).json({ count: post.like, message: " Vous avez liké ce post !", count: post.like }))
                                    .catch(error => res.status(500).json({ error: error }))
                            })
                            .catch(error => res.status(500).json({ error: error }))
                    }
                    models.LikePost.create({ UserId: userId, PostId: postId, isLike: LIKED })
                        .then(like => {
                            post.update({ like: post.like + 1 })
                                .then(post => res.status(201).json({ count: post.like, message: 'Vous avez liké ce post !', post, like }))
                                .catch(error => res.status(500).json({ error: error }))
                        })
                        .catch(error => res.status(500).json({ error: "impossible de like le post" }))
                })
                .catch(error => res.status(406).json({ error: "le like est introuvable !" }))
        })
        .catch(error => res.status(406).json({ error:"Le post est introuvable" }))
}

exports.dislike = (req, res, next) => {
    //Params
    const DISLIKED = -1
    const postId = req.params.postId
    const userId = req.params.userId

    models.Post.findOne({
        attributes: ['id', 'like'],
        where: { id: postId }
    })
        .then(post => {
            models.LikePost.findOne({
                attributes: ['id', 'UserId', 'PostId', 'isLike'],
                where: { UserId: userId, PostId: postId }
            })
                .then(like => {
                    if (like) { //Si oui
                        if (like.isLike === DISLIKED) {
                            return res.status(409).json({ count: post.like, message: "Vous avez déjà disliké ce post !" })
                        }
                        return like.update({ isLike: DISLIKED })
                            .then(like => {
                                post.update({ like: post.like - 1 })
                                    .then(post => res.status(201).json({ count: post.like, message: "Post disliké !", likeId: like.postId, PostId: post.id }))
                                    .catch(error => res.status(500).json({ error: error }))
                            })
                            .catch(error => res.status(500).json({ error: error }))
                    }
                    models.LikePost.create({ UserId: userId, PostId: postId, isLike: DISLIKED })
                        .then(like => {
                            post.update({ like: post.like - 1 }) //On update le post
                                .then(post => res.status(201).json({ count: post.like, message: "Post disliké !", post, like }))
                                .catch(error => res.status(500).json({ error: error }))
                        })
                        .catch(error => res.status(500).json({ error: error }))
                })
                .catch(error => res.status(406).json({ error: "Le like est introuvable !" }))
        })
        .catch(error => res.status(406).json({ error: "Le post est  introuvable !" }))
}
