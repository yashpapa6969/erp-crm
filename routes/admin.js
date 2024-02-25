const express = require('express');
const router = express.Router();

const apis = require("../controllers/api");
const { uploadFile } = require('../s3');
const multer = require('multer');
const upload = multer({ dest: '/tmp/' })


// router.patch('/changeScore/:team_id/:Score',(req,res)=>{apis.changeScore(req,res)});
// router.delete('/deleteTeam/:team_id',(req,res)=>{apis.deleteTeam(req,res)});

  router.post('/createEmployee',(req,res) => {apis.createEmployee(req,res)});
  router.get('/getAllEmployees',(req,res) => {apis.getAllEmployees(req,res)});
  router.get('/getEmployeeByID/:employee_id',(req,res) => {apis.getEmployeeDetails(req,res)});
  router.post('/loginEmployee',(req,res) => {apis.LoginEmployee(req,res)});
  
  router.get('/getAllManagersbyDepartment/:department',(req,res) => {apis.getAllManagersbyDepartment(req,res)});
  router.get('/getManagersAllDetails/',(req,res) => {apis.getManagersAllDetails(req,res)});

  router.post('/createProject',(req,res) => {apis.createProject(req,res)});

  
  router.post('/createClient',(req,res) => {apis.createClient(req,res)});
  router.get('/getClientDetails/:client_id',(req,res) => {apis.getClientDetails(req,res)});
  router.get('/getAllClients',(req,res) => {apis.getAllClients(req,res)});
  
  
  router.post('/createLead',(req,res) => {apis.createLead(req,res)});



module.exports = router
