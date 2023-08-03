const { NotFoundError } = require("../../shared/errors");
const Admin = require("./Admin");

const removeAdmin = async ({id}) =>{
    const adminToDelete = await Admin.findById(id);

    if (!adminToDelete){ 
        throw new NotFoundError("Admin not found")
    };

    adminToDelete.is_deleted = true;

    return await adminToDelete.save();
}

module.exports = removeAdmin