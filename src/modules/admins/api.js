const express = require("express");
const isLoggedIn = require("../../shared/auth/is-loggen-in.js");
const { loginUser, addAdmin, getAdmins, showAdmin, editAdmin, deleteAdmin, editMe } = require("./controllers.js");
const isSuper = require("../../shared/auth/has-role.js");
const {adminLoginSchema,adminSchema} = require("./schemas.js");
const genValidator = require("../../shared/validator")

const router = express();

router.post("/admins/login",genValidator(adminLoginSchema),loginUser)
router.post("/admins/add", isLoggedIn, isSuper.isSuperAdmin,genValidator(adminSchema), addAdmin)
router.get("/admins/", isLoggedIn, isSuper.isSuperAdmin, getAdmins)
router.get("/admins/:id", isLoggedIn, isSuper.isSuperAdmin, showAdmin)
router.patch("/admins/me", isLoggedIn, genValidator(adminSchema),editMe)
router.patch("/admins/:id", isLoggedIn, isSuper.isSuperAdmin, genValidator(adminSchema),editAdmin)
router.delete("/admins/:id", isLoggedIn,isSuper.isSuperAdmin, deleteAdmin)

module.exports = router