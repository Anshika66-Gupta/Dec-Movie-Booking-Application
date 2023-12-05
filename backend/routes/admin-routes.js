const express = require('express');
const adminRouter = express.Router();

const { addAdmin, adminLogin, getAdmins, getAdminByID } = require('../controllers/admin-controller');

adminRouter.post('/signup', addAdmin);
adminRouter.post("/login", adminLogin);
adminRouter.get('/',getAdmins);
adminRouter.get("/:id", getAdminByID);

module.exports = adminRouter
