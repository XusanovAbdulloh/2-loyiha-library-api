const { hash } = require("bcrypt");
const Admin = require("./Admin");
const { BadRequestError } = require("../../shared/errors");

const createAdmin = async (data) =>{
    const admin = await Admin.findOne({ username: data.username });

    if (admin) throw new BadRequestError("Username bor");
  
    const hashedPassword = await hash(data.password, 10);
  
    const result = await Admin.create({
      ...data,
      password: hashedPassword,
    });
  
    return result;
}
module.exports = createAdmin