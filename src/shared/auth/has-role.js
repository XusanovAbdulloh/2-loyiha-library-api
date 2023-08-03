const express = require("express");
const { ForbiddenError } = require("../errors");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const isSuper = async (req, res, next) => {
  try {
    if (!req.user.isSuperAdmin) {
      throw new ForbiddenError("Ruxsat yo'q");
    }
  next();
  } catch (error) {
    next(error);
  }
};
module.exports = {isSuper};