const model = require("../models");

module.exports.postComment = async (req, res, next) => {
    try {
        let { userId, postId, text } = req.body;

        // Mengubah properti req.body sesuai kebutuhan
        userId = Number(userId);
        postId = Number(postId);

        const comment = await model.comment.create({
            userId, postId, text
        });

        return res.status(200).json({
            message: "success",
            comment,
        });

    } catch (error) {
        next(error);
    }
}

module.exports.deleteComment = async (req, res, next) => {
    try {
        let { commentId } = req.body;

        // Mengubah commentId sesuai kebutuhan
        commentId = Number(commentId);
        
        await model.comment.destroy({
            where: {
                id: commentId
            }
        })
        
        return res.status(200).json({
            message: `success, comment with id ${commentId} was deleted`
        });
        
    } catch (error) {
        next(error);
    }
}

module.exports.getComments = async(req, res, next) => {
    try {
        let { postId, page } = req.body;
        
        // Mengubah properti req.body sesuai kebutuhan
        if(!page) {
            page = 1;
        }
        
        page = Number(page);
        postId = Number(postId);

        // Menguhitung variabel untuk paginasi
        const commentsPerPage = 10;
        const offset = commentsPerPage * (page - 1);

        const totalCommentsFound = await model.comment.findAndCountAll({
            where: {
                postId
            }
        });

        const comments = await model.comment.findAll({
            where: {postId},
            limit: commentsPerPage,
            offset
        });
        
        return res.status(200).json({
            totalCommentsFound: totalCommentsFound.count,
            commentsPerPage,
            totalPage: Math.ceil(totalCommentsFound.count / commentsPerPage),
            currentPage: page,
            currentPageCommentsFound: comments.length,
            data: comments,
        });

    } catch (error) {
        next(error);
    }
}

module.exports.updateComment = async(req, res, next) => {
    try {
        let { commentId, text } = req.body;

        // Mengubah properti req.body sesuai kebutuhan
        commentId = Number(commentId);
        
        await model.comment.update({text}, {
            where: {
                id: commentId
            }
        });

        return res.status(200).json({
            message: "success",
            text
        });
        
    } catch (error) {
        next(error);
    }
}