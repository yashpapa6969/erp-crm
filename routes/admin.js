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
router.post('/createClient', uploadFields, apis.createClient);



  router.post('/createEmployee',(req,res) => {apis.createEmployee(req,res)});
  router.get('/getAllEmployees',(req,res) => {apis.getAllEmployees(req,res)});
  router.get('/getEmployeeByID/:employee_id',(req,res) => {apis.getEmployeeDetails(req,res)});
  router.post('/loginEmployee',(req,res) => {apis.LoginEmployee(req,res)});
  
  router.get('/getAllManagersbyDepartment/:department',(req,res) => {apis.getAllManagersbyDepartment(req,res)});
  router.get('/getManagersAllDetails/',(req,res) => {apis.getManagersAllDetails(req,res)});

  router.post('/createProject',(req,res) => {apis.createProject(req,res)});
  router.get('/getAllProjects',(req,res) => {apis.getAllProjects(req,res)});
  
  router.get('/getProjectDetails/:project_id',(req,res) => {apis.getProjectDetails(req,res)});

  router.post('/getProjectsByBrandName',(req,res) => {apis.getProjectsByBrandName(req,res)});


  
  router.post('/createClient',(req,res) => {apis.createClient(req,res)});
  router.get('/getClientDetails/:client_id',(req,res) => {apis.getClientDetails(req,res)});
  router.get('/getAllClients',(req,res) => {apis.getAllClients(req,res)});
  router.patch('/updateClient/:client_id',(req,res) => {apis.updateClient(req,res)});
  router.get('/specialDates',(req,res) => {apis.specialDates(req,res)});

  
  router.get('/getAllLeads',(req,res) => {apis.getAllLeads(req,res)});
  router.get('/updateLeadStatus/:lead_id/:status',(req,res) => {apis.updateLeadStatus(req,res)});
  router.patch('/updateLead/:lead_id',(req,res) => {apis.updateLead(req,res)});


  router.post('/addTag',(req,res) => {apis.addTag(req,res)});
  router.get('/getAllTags',(req,res) => {apis.getAllTags(req,res)});
  router.get('/getTagsDetails/:tag_id',(req,res) => {apis.getTagsDetails(req,res)});


  

 router.post('/addTask',(req,res) => {apis.addTask(req,res)});
 router.get('/updateTaskStatus/:task_id/:status',(req,res) => {apis.updateTaskStatus(req,res)});
 router.get('/getAllTasks',(req,res) => {apis.getAllTasks(req,res)});
 router.get('/getTasksByEmployeeID/:employee_id',(req,res) => {apis.getTasksByEmployeeID(req,res)});
 router.get('/getTasksByTaskID/:task_id',(req,res) => {apis.getTasksByTaskID(req,res)});

 router.post('/sourceAddTag',(req,res) => {apis.sourceAddTag(req,res)});
 router.get('/sourceGetAllTags',(req,res) => {apis.sourceGetAllTags(req,res)});
 router.get('/sourceGetTagsDetails/:source_tag_id',(req,res) => {apis.sourceGetTagsDetails(req,res)});

 router.post('/createSalarySlip',(req,res) => {apis.createSalarySlip(req,res)});
 router.get('/getAllSlips',(req,res) => {apis.getAllSlips(req,res)});
 router.get('/getAllSlipsByEmployee/:employee_id',(req,res) => {apis.getAllSlipsByEmployee(req,res)});
 router.get('/downloadSalarySlip/:slip_id',(req,res) => {apis.downloadSalarySlip(req,res)});

 router.post('/addProducts',(req,res) => {apis.addProducts(req,res)});
 router.get('/getAllProducts',(req,res) => {apis.getAllProducts(req,res)});
 router.get('/getProductDetails/:product_id',(req,res) => {apis.getProductDetails(req,res)});


 router.post('/createInvoice',(req,res) => {apis.createInvoice(req,res)});
 router.get('/getAllInvoices',(req,res) => {apis.getAllInvoices(req,res)});
 router.get('/getAllInvoiceByClient/:client_id',(req,res) => {apis.getAllInvoiceByClient(req,res)});
 router.get('/downloadInvoice/:invoice_id',(req,res) => {apis.downloadInvoice(req,res)});


 router.delete('/deleteClientById/:client_id',(req,res)=>{apis.deleteClientById(req,res)});
 router.delete('/deleteEmployeeById/:employee_id',(req,res)=>{apis.deleteEmployeeById(req,res)});
 router.delete('/deleteInvoiceById/:invoice_id',(req,res)=>{apis.deleteInvoiceById(req,res)});
 router.delete('/deleteLeadById/:lead_id',(req,res)=>{apis.deleteLeadById(req,res)});
 router.delete('/deleteProductById/:product_id',(req,res)=>{apis.deleteProductById(req,res)});
 router.delete('/deleteProjectById/:project_id',(req,res)=>{apis.deleteProjectById(req,res)});
 router.delete('/deleteSlipById/:slip_id',(req,res)=>{apis.deleteSlipById(req,res)});
 router.delete('/deleteSourceTagById/:source_tag_id',(req,res)=>{apis.deleteSourceTagById(req,res)});
 router.delete('/deleteTagById/:tag_id',(req,res)=>{apis.deleteTagById(req,res)});
 router.delete('/deleteTaskById/:task_id',(req,res)=>{apis.deleteTaskById(req,res)});











module.exports = router
