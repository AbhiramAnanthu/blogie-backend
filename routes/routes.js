const router = require("express").Router();
const {
  viewBlog,
  createBlog,
  editBlog,
  deleteBlog,
} = require("../controllers/controller");

const { authorize, createUser } = require("../controllers/auth");

// @desc GET blog data
// @api  GET /api/get-blog/:blog-id
router.get("/get-blog/:blogId", viewBlog);

// @desc Create Blog
// @api  POST /api/:user-id/create-blog
router.post("/:userId/create-blog", createBlog);

// @desc Edit Blog
// @api  PUT /api/:user-id/edit-blog/:blog-id
router.put("/:userId/edit-blog/:blogId", editBlog);

// @desc Delete Blog
// @api  DELETE /api/:user-id/delete-blog/:blog-id
router.delete("/:userId/delete-blog/:blogId", deleteBlog);

// @desc Login
// @api  DELETE /api/login
router.delete("/login", authorize);

// @desc Create User
// @api  POST /api/create-user
router.post("/create-user", createUser);
module.exports = router;
