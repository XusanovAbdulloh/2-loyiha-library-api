const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose")
const Admin = require('./Admin');
// const { UnauthorizedError, NotFoundError, BadRequestError } = require('../../shared/errors');

const loginUser =   async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const admin = await Admin.findOne({ username });
    console.log(admin);
    if (!admin) {
      // throw new UnauthorizedError('Login ma\'lumotlari noto\'g\'ri');
      res.json({message: "login malumotlarini notogri"})
    }

    const token = jwt.sign(
      { adminId: admin._id, isSuperAdmin: admin.is_super },
      'hey',
      { expiresIn: '24h' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    // throw new BadRequestError("server xatosi")
    res.json({message: "error viev console"})
  }
};

const addAdmin = async(req, res) => {
  const { full_name, username, password } = req.body;

  try {
    const newAdmin = new Admin({
      full_name,
      username,
      password,
      is_super: false
    });

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    newAdmin.password = hashedPassword;

    const savedAdmin = await newAdmin.save();

    res.status(201).json(savedAdmin);
  } catch (err) {
    console.error(err);
    res.json({message: "error viev console"})
  }
};


const getAdmins = async (req, res) => {
  try {
    const { q, sort, filters, page } = req.query;
    const PAGE_SIZE = 10;
    const pageNumber = parseInt(page) || 1;
    const skip = (pageNumber - 1) * PAGE_SIZE;

    let filterQuery = {};
    if (filters && filters.is_deleted !== undefined) {
      filterQuery.is_deleted = filters.is_deleted;
    }
    if (filters && filters.is_super !== undefined) {
      filterQuery.is_super = filters.is_super;
    }

    let sortQuery = {};
    if (sort) {
      const sortBy = sort.by || 'full_name';
      const sortOrder = sort.order === 'desc' ? -1 : 1;
      sortQuery[sortBy] = sortOrder;
    }

    let searchQuery = {};
    if (q) {
      const searchRegex = new RegExp(q, 'i');
      searchQuery = {
        $or: [{ full_name: searchRegex }, { username: searchRegex }],
      };
    }

    const totalAdmins = await Admin.countDocuments(filterQuery);
    const admins = await Admin.find({ ...filterQuery, ...searchQuery })
      .sort(sortQuery)
      .skip(skip)
      .limit(PAGE_SIZE);

    const totalPages = Math.ceil(totalAdmins / PAGE_SIZE);

    res.json({
      page: pageNumber,
      totalPages,
      totalResults: totalAdmins,
      admins,
    });
  } catch (err) {
    console.error(err);
    res.json({message: "error viev console"})
  }
};

const showAdmin =  async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({ message: 'Admin topilmadi' });
    }

    res.json(admin);
  } catch (err) {
    console.error(err);
    res.json({message: "error viev console"})
  }
};

const editAdmin = async (req, res) => {
  const { id } = req.params;
  const { full_name, username, password } = req.body;

  try {
    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({ message: 'Adminn topilmadi' });
    }


    admin.full_name = full_name;
    admin.username = username;
    admin.password = password;

    await admin.save();

    res.json(admin);
  } catch (err) {
    console.error(err);
    res.json({message: "error viev console"})
  }
};


const editMe = async (req, res) => {
  const { full_name, username, password } = req.body;
  const user = req.user; 
  console.log(user);
  const userId = new mongoose.Types.ObjectId(user.adminId);

  try {
    const admin = await Admin.findById(userId);

    if (!admin) {
      return res.status(404).json({ message: 'error' });
    } 
    admin.full_name = full_name;
    admin.username = username;
    admin.password = password;

    await admin.save();

    res.json(admin);
  } catch (err) {
    console.error(err);
    res.json({message: "error viev console"})
  }
};

const deleteAdmin = async (req, res) => {
  const adminId = req.params.id;


  try {
  
    const adminToDelete = await Admin.findById(adminId);

    if (!adminToDelete) {
      return res.status(404).json({ message: 'Admin not found.' });
    }

    adminToDelete.is_deleted = true;

    await adminToDelete.save();

    res.json({ message: 'Admin deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.json({message: "error viev console"})
  }
};



module.exports = {loginUser, addAdmin, getAdmins, showAdmin, editAdmin, editMe, deleteAdmin}
