const express = require("express");
const login = require("../controller/login-controller");
const signup = require("../controller/signup-controller");
const content_create = require("../controller/content_create-controller");
const content_view = require("../controller/content_view-controller");

const router = express.Router();

router.post("/userLogin",login)
router.post("/userSignup",signup)
router.post("/createContent",content_create)
router.get("/getContent",content_view)

module.exports = router;