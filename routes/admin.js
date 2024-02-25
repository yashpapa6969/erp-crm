const express = require('express');
const router = express.Router();

const apis = require("../controllers/api");
const { uploadFile } = require('../s3');
const multer = require('multer');
//const upload = multer({ dest: '/tmp/' })
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadsDir = path.join(__dirname, '../uploads');
    fs.mkdirSync(uploadsDir, { recursive: true }); // Ensure the upload directory exists
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const uploadFields = upload.fields([
  { name: 'singleFile', maxCount: 1 },
  { name: 'multipleFiles', maxCount: 10 } 
]);



router.post('/createLead', uploadFields, apis.createLead);

// router.patch('/changeScore/:team_id/:Score',(req,res)=>{apis.changeScore(req,res)});
// router.delete('/deleteTeam/:team_id',(req,res)=>{apis.deleteTeam(req,res)});

  router.post('/createEmployee',(req,res) => {apis.createEmployee(req,res)});
  router.get('/getAllEmployees',(req,res) => {apis.getAllEmployees(req,res)});
  router.get('/getEmployeeByID/:employee_id',(req,res) => {apis.getEmployeeDetails(req,res)});
  router.post('/loginEmployee',(req,res) => {apis.LoginEmployee(req,res)});
  
  router.get('/getAllManagersbyDepartment/:department',(req,res) => {apis.getAllManagersbyDepartment(req,res)});
  router.get('/getManagersAllDetails/',(req,res) => {apis.getManagersAllDetails(req,res)});

  router.post('/createProject',(req,res) => {apis.createProject(req,res)});
  router.get('/getAllProjects',(req,res) => {apis.getAllProjects(req,res)});

  
  router.post('/createClient',(req,res) => {apis.createClient(req,res)});
  router.get('/getClientDetails/:client_id',(req,res) => {apis.getClientDetails(req,res)});
  router.get('/getAllClients',(req,res) => {apis.getAllClients(req,res)});
  router.patch('/updateClient/:client_id',(req,res) => {apis.updateClient(req,res)});

  
  router.get('/getAllLeads',(req,res) => {apis.getAllLeads(req,res)});
  router.get('/updateLeadStatus/:lead_id/:status',(req,res) => {apis.updateLeadStatus(req,res)});
  router.patch('/updateLead/:leqd_id',(req,res) => {apis.updateLead(req,res)});

  

module.exports = router
