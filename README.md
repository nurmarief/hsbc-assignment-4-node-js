# HSBC Assignment #4: NodeJs
In this assignment, students were asked to add a new service to an existing RESTful API project (web content management API) created with NodeJs (using expressJs) and MySql (using sequelize).

## Service added
1. Posts
2. Comments

```
<!-- ./src/index.js -->
const postRoute = require('./routes/post.route');
const commentRoute = require('./routes/comment.route');

app.use('/posts', postRoute);
app.use('/comments', commentRoute);
```

### Posts
1. Create Post
![Create Post](./new-service-postman-testing/posts-create-post.png)  
2. Delete Post
![Delete Post](./new-service-postman-testing/posts-delete-post.png)
3. Get Posts that created by a specific user
![Get Posts](./new-service-postman-testing/posts-get-posts.png)
4. Update Post
![Update Posts](./new-service-postman-testing/posts-update-post.png)


### Comments
1. Create Comments
![Create Comment](./new-service-postman-testing/comments-create-comment.png)
2. Delete Comments
![Delete Comment](./new-service-postman-testing/comments-delete-comment.png)
3. Get Comments for a specific post
![Get Comments](./new-service-postman-testing/comments-get-comments.png)
4. Update Comments
![Update Comment](./new-service-postman-testing/comments-update-comment.png)

## Other improvements
1. Create universal error handling middleware

```
<!-- ./src/middlewars/processError.js -->
const processError = (error, req, res, next) => {

    return res.status(500).json({
        message: error.message || 'operation failed, an error occured'
    })
}

module.exports = processError;

<!-- ./src/index.js -->
app.use(processError);

```

## Step to Recreate Project
1. Create .env file and copy and fill in all the required variable from .env.example
2. Run ``` npm run migrate ```