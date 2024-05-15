const model = require("../models");

module.exports.postPost = async (req, res, next) => {
    try {
        let { userId, title, body } = req.body;

        // Mengubah properti req.body sesuai kebutuhan
        userId = Number(userId);

        const post = await model.post.create({
            userId, title, body
        });
        
        return res.status(200).json({
            message: "success",
            post
        });
        
    } catch (error) {
        next(error);
    }
}

module.exports.deletePost = async (req, res, next) => {
    try {
        let { postId } = req.body;

        // Mengubah postId sesuai kebutuhan
        postId = Number(postId);
        
        await model.post.destroy({
            where: {
                id: postId
            }
        });
        
        return res.status(200).json({
            message: `success, post with id ${postId} was deleted`
        });

    } catch (error) {
        next(error);
    }
}

module.exports.getPosts = async (req, res, next) => {
    try {
        let { userId, page } = req.body;

        // Mengubah properti req.body sesuai kebutuhan
        if(!page) {
            page = 1;
        }
        
        page = Number(page);
        userId = Number(userId);

        // Menguhitung variabel untuk paginasi
        const postsPerPage = 10;
        const offset = postsPerPage * (page - 1);

        const totalPostsFound = await model.post.findAndCountAll({
            where: {
                userId
            }
        });

        const posts = await model.post.findAll({
            where: {userId},
            limit: postsPerPage,
            offset
        });
        
        return res.status(200).json({
            totalPostsFound: totalPostsFound.count,
            postsPerPage,
            totalPage: Math.ceil(totalPostsFound.count / postsPerPage),
            currentPage: page,
            currentPagePostsFound: posts.length,
            data: posts,
        });
        
    } catch (error) {
        next(error);
    }
}

module.exports.updatePost = async (req, res, next) => {
    try {
        let { postId } = req.body;
        let reqBodyCopy = {...req.body};
        const reqBodyPropertyToDelete = ["postId"];

        for (let index = 0; index < reqBodyPropertyToDelete.length; index++) {
            delete reqBodyCopy[reqBodyPropertyToDelete[index]]
        }

        // Mengubah properti req.body sesuai kebutuhan
        postId = Number(postId);

        const post = await model.post.update({...reqBodyCopy}, {where: {
            id: postId
        }});
        
        return res.status(200).json({
            message: `success, post with id ${postId} was updated`,
            ...reqBodyCopy,
        });

    } catch (error) {
        next(error);
    }
}