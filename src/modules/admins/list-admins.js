const Admin = require("./Admin")

const listAdmins = async ({ q, page, sort, filters }) => {
    const { limit = 10, offset = 0 } = page || {};
    const { by = "full_name", order = "desc" } = sort || {};
    const { is_deleted = false, is_super = false } = filters || {};
    const filter = {};

    if (q) {
        filter.$or = [
            { full_name: { $regex: q, $options: "i" } },
            { username: { $regex: q, $options: "i" } },
        ];
    }

    if (is_deleted) {
        filter.is_deleted = is_deleted;
    }
    if (is_super) {
        filter.is_super = is_super;
    }

    const total = await Admin.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    const admins = await Admin.find(filter)
        .sort({ [by]: order === "desc" ? -1 : 1 })
        .skip(offset)
        .limit(limit)

    return {
        limit,
        page: offset + 1,
        totalPages,
        totalResults: total,
        admins
    }
}

module.exports = listAdmins