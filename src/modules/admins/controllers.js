const jwt = require('jsonwebtoken');
const mongoose = require("mongoose")
const Admin = require('./Admin');
require("dotenv/config");
const httpValidator = require("../../shared/http-validator");
const { loginAdminSchema, postAdminSchema, listAdminsSchema, showAdminSchema, patchAdminSchema, deleteAdminSchmea } = require("./schemas");
const listAdmins = require("./list-admins");
const createAdmin = require("./create-admin");
const getAdmin = require("./show-admin");
const patchAdmin = require("./patch-admin");
const removeAdmin = require("./remove-admin")
// const { UnauthorizedError, NotFoundError, BadRequestError } = require('../../shared/errors');


const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    httpValidator({ body: req.body }, loginAdminSchema);
    const admin = await Admin.findOne({ username });
    console.log(admin);
    if (!admin) {
      // throw new UnauthorizedError('Login ma\'lumotlari noto\'g\'ri');
      return res.json({ message: "login malumotlarini notogri" })
    }

    const token = jwt.sign(
      { adminId: admin._id, isSuperAdmin: admin.is_super },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token });
  } catch (err) {
    next(err)
  }
};

const addAdmin = async (req, res) => {
  try {
    httpValidator({ body: req.body }, postAdminSchema)
    const result = await createAdmin(req.body)
    res.json({
      data: result
    })
  } catch (err) {
    console.error(err);
    res.json({ message: "error viev console" })
  }
};


const getAdmins = async (req, res) => {
 try{
    httpValidator({ query: req.query }, listAdminsSchema);
     const data = await listAdmins(req.query)
    res.status(200).json({
      data: data,
    });
  } catch (err) {
    console.error(err);
    res.json({ message: "Xato: Konsolda ko'ring" });
  }
};


const showAdmin = async (req, res) => {
  try {
    httpValidator({params: req.params}, showAdminSchema)

    const result = await getAdmin(req.params);
    res.json({
      data: result
    })
  } catch (err) {
    console.error(err);
    res.json({ message: "error viev console" })
  }
};

const editAdmin = async (req, res) => {
  try {
     httpValidator({params: req.params, body: req.body}, patchAdminSchema)
     const result = await patchAdmin({ id: req.params.id, changes: req.body });
     res.json({
       data: result,
     });
  } catch (err) {
    console.error(err);
    res.json({ message: "error viev console" })
  }
};


const editMe = async (req, res) => {
  const user = req.user;
  console.log(user);
  const userId = new mongoose.Types.ObjectId(user.adminId);

  try {
    const patched = await patchAdmin(
      { id: userId, changes: req.body },patchAdminSchema
    );

    res.status(201).json({
      data: patched,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAdmin = async (req, res) => {
  try {
    httpValidator({ params: req.params }, deleteAdminSchmea);

    await removeAdmin(req.params);

    res.json({ message: 'Admin deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.json({ message: "error viev console" })
  }
};



module.exports = { loginUser, addAdmin, getAdmins, showAdmin, editAdmin, editMe, deleteAdmin }
