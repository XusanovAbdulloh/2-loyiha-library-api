const { NotFoundError} = require("../../shared/errors");
const Admin = require("./Admin");

const patchAdmin = async ({ id, changes }) => {
    const admin = await Admin.findById(id);

    if (!admin) {
       throw new NotFoundError("not found")
    }
console.log(changes);
    admin.full_name = changes.full_name;
    admin.username = changes.username;
    admin.password = changes.password;

   return await admin.save();

};

module.exports = patchAdmin;