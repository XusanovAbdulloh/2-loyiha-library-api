const express = require("express");
const isLoggedIn = require("../../shared/auth/is-loggen-in.js");
const { loginUser, addAdmin, getAdmins, showAdmin, editAdmin, deleteAdmin, editMe } = require("./controllers.js");
const {isSuper} = require("../../shared/auth/has-role.js");

const router = express();

router.post("/admins/login",loginUser)
router.post("/admins/add", isLoggedIn, isSuper, addAdmin)
router.get("/admins/", isLoggedIn, isSuper, getAdmins)
router.get("/admins/:id", isLoggedIn, isSuper, showAdmin)
router.patch("/admins/me", isLoggedIn,editMe)
router.patch("/admins/:id", isLoggedIn, isSuper,editAdmin)
router.delete("/admins/:id", isLoggedIn,isSuper, deleteAdmin)

module.exports = router