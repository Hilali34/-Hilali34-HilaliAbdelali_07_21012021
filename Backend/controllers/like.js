const models = require("../models");
const jwt = require("jsonwebtoken");


exports.like = (req, res, next) => {
    //Params
    const isLiked =1;
    const isDisliked =-1;
    const likeInitialValue =0;
    const postId = req.params.postId;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;

    models.Post.findOne({
        attributes: ["id", "likes" ,"dislikes"],
        where: { id: postId }
    })
        .then(post => {
            models.Like.findOne({
                attributes: ["id", "UserId", "PostId", "isLike"],
                where: { UserId: userId, PostId: postId }
            })
                .then(like => {
                    if (like) {
                        if (like.isLike === isLiked) {
                            return like.update({ isLike: likeInitialValue })
                                .then(like => {
                                    post.update({ likes: post.likes - 1 })
                                        .then(post => res.status(201).json({ countLike: post.likes,countDislike: post.dislikes, message: "Vous etes neutre !" }))
                                        .catch(error => res.status(500).json({ error: error }))
                                })
                                .catch(error => res.status(500).json({ error: error }))
                        }
                        if (like.isLike === isDisliked){
                            return like.update({ isLike: isLiked })
                                .then(like => {
                                    post.update({ likes: post.likes +1, dislikes: post.dislikes -1  })
                                        .then(post => res.status(201).json({ countLike: post.likes,countDislike: post.dislikes, message: "Vous avez liké ce post !"}))
                                        .catch(error => res.status(500).json({ error: error}))
                                })
                        }

                        return like.update({ isLike: isLiked })
                            .then(like => {
                                post.update({ likes: post.likes+1 })
                                    .then(post => res.status(201).json({countLike: post.likes,countDislike: post.dislikes, message: " Vous avez liké ce post !", count: post.like }))
                                    .catch(error => res.status(500).json({ error: error }))
                            })
                            .catch(error => res.status(500).json({ error: error }))
                    }
                    models.Like.create({ UserId: userId, PostId: postId, isLike: isLiked })
                        .then(like => {
                            post.update({ likes: post.likes+1 })
                                .then(post => res.status(201).json({ countLike: post.likes,countDislike: post.dislikes, message: 'Vous avez liké ce post !', post, like }))
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
    const isDisliked =-1;
    const isLiked =1;
    const likeInitialValue =0;
    const postId = req.params.postId
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;

    models.Post.findOne({
        attributes: ["id", "likes","dislikes"],
        where: { id: postId }
    })
        .then(post => {
            models.Like.findOne({
                attributes: ["id", "UserId", "PostId", "isLike"],
                where: { UserId: userId, PostId: postId }
            })
                .then(like => {
                    if (like) {
                        if (like.isLike === isDisliked) {
                            return like.update({ isLike:likeInitialValue })
                                .then(like => {
                                    post.update({ dislikes: post.dislikes-1 })
                                        .then(post => res.status(201).json({ countLike: post.likes,countDislike: post.dislikes, message: "Vous etes neutre !" }))
                                        .catch(error => res.status(500).json({ error: error}))
                                })
                                .catch(error => res.status(500).json({ error: error}))
                        }
                        if (like.isLike === isLiked){
                            return like.update({ isLike: isDisliked })
                                .then(like => {
                                    post.update({ dislikes: post.dislikes+1 , likes: post.likes-1  })
                                        .then(post => res.status(201).json({ countLike: post.likes,countDislike: post.dislikes, message: "Post disliké !"}))
                                        .catch(error => res.status(500).json({ error: error}))
                                })
                        }
                        return like.update({ isLike: isDisliked })
                            .then(like => {
                                post.update({ dislikes: post.dislikes+1  })
                                    .then(post => res.status(201).json({ countLike: post.likes,countDislike: post.dislikes, message: "Post disliké !"}))
                                    .catch(error => res.status(500).json({ error: error}))
                            })
                            .catch(error => res.status(500).json({ error: error}))
                    }
                    models.Like.create({ UserId: userId, PostId: postId, isLike: isDisliked })
                        .then(like => {
                            post.update({ dislikes: post.dislikes+1 })
                                .then(post => res.status(201).json({ countLike: post.likes,countDislike: post.dislikes, message: "Post disliké !", post, like }))
                                .catch(error => res.status(500).json({ error: error }))
                        })
                        .catch(error => res.status(500).json({ error: error }))
                })
                .catch(error => res.status(406).json({ error: "Le like est introuvable !" }))
        })
        .catch(error => res.status(406).json({ error: "Le post est  introuvable !" }))
}
