const models = require("../models");


exports.like = (req, res, next) => {
    //Params
    const isLiked = 1
    const postId = req.params.postId
    const userId = req.params.userId

    models.Post.findOne({
        attributes: ['id', 'likes'],
        where: { id: postId }
    })
        .then(post => {
            models.Like.findOne({
                attributes: ['id', 'UserId', 'PostId', 'isLike'],
                where: { UserId: userId, PostId: postId }
            })
                .then(like => {
                    if (like) {
                        if (like.isLike === isLiked) {
                            return res.status(409).json({ count: post.likes, message: "Vous avez deja like ce post !"})
                        }
                        return like.update({ isLike: isLiked })
                            .then(like => {
                                post.update({ likes: post.likes + 1 })
                                    .then(post => res.status(201).json({ count: post.likes, message: " Vous avez liké ce post !", count: post.like }))
                                    .catch(error => res.status(500).json({ error: error }))
                            })
                            .catch(error => res.status(500).json({ error: error }))
                    }
                    models.Like.create({ userId: userId, postId: postId, isLike: isLiked })
                        .then(like => {
                            post.update({ likes: post.likes + 1 })
                                .then(post => res.status(201).json({ count: post.likes, message: 'Vous avez liké ce post !', post, like }))
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
    const IsDisliked = -1
    const postId = req.params.postId
    const userId = req.params.userId

    models.Post.findOne({
        attributes: ['id', 'likes'],
        where: { id: postId }
    })
        .then(post => {
            models.Like.findOne({
                attributes: ['id', 'UserId', 'PostId', 'isLike'],
                where: { UserId: userId, PostId: postId }
            })
                .then(like => {
                    if (like) {
                        if (like.isLike === IsDisliked) {
                            return res.status(409).json({ count: post.likes, message: "Vous avez déjà disliké ce post !" })
                        }
                        return like.update({ isLike: IsDisliked })
                            .then(like => {
                                post.update({ likes: post.likes - 1 })
                                    .then(post => res.status(201).json({ count: post.likes, message: "Post disliké !", likeId: like.postId, PostId: post.id }))
                                    .catch(error => res.status(500).json({ error: error}))
                            })
                            .catch(error => res.status(500).json({ error: error}))
                    }
                    models.Like.create({ userId: userId, postId: postId, isLike: IsDisliked })
                        .then(like => {
                            post.update({ likes: post.likes - 1 })
                                .then(post => res.status(201).json({ count: post.likes, message: "Post disliké !", post, like }))
                                .catch(error => res.status(500).json({ error: error }))
                        })
                        .catch(error => res.status(500).json({ error: error }))
                })
                .catch(error => res.status(406).json({ error: "Le like est introuvable !" }))
        })
        .catch(error => res.status(406).json({ error: "Le post est  introuvable !" }))
}
