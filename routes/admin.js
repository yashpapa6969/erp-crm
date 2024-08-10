const express = require('express');
const router = express.Router();

const apis = require("../controllers/api");
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



router.get('/getAllMessages', (req, res) => { apis.getAllMessages(req, res) });
router.post('/addMessage', (req, res) => { apis.addMessage(req, res) });






router.patch('/updateClient/:client_id', uploadFields, apis.updateClient);
router.post('/createLead', uploadFields, apis.createLead);
router.post('/createClient', uploadFields, apis.createClient);
router.patch('/updateLead/:lead_id', uploadFields,(req, res) => { apis.updateLead(req, res) });
router.post('/createEmployee', uploadFields, apis.createEmployee);


router.get('/getAllEmployees', (req, res) => { apis.getAllEmployees(req, res) });
router.get('/getEmployeeByID/:employee_id', (req, res) => { apis.getEmployeeDetails(req, res) });
router.post('/loginEmployee', (req, res) => { apis.LoginEmployee(req, res) });

router.get('/EmployeespecialDates', (req, res) => { apis.EmployeespecialDates(req, res) });

router.patch('/updateEmployee', (req, res) => { apis.updateEmployee(req, res) });

router.get('/getAllManagersbyDepartment/:department', (req, res) => { apis.getAllManagersbyDepartment(req, res) });
router.get('/getManagersAllDetails/', (req, res) => { apis.getManagersAllDetails(req, res) });

router.post('/createProject', (req, res) => { apis.createProject(req, res) });
router.get('/getAllProjects', (req, res) => { apis.getAllProjects(req, res) });
router.get('/getProjectDetails/:project_id', (req, res) => { apis.getProjectDetails(req, res) });
router.post('/getProjectsByBrandName', (req, res) => { apis.getProjectsByBrandName(req, res) });
router.get('/updateProjectStatus/:project_id/:status', (req, res) => { apis.updateProjectStatus(req, res) });
router.get('/updateProjectPriority/:project_id/:priority', (req, res) => { apis.updateProjectPriority(req, res) });
router.get('/getAllCompletedProjects', (req, res) => { apis.getAllCompletedProjects(req, res) });


router.post('/createClient', (req, res) => { apis.createClient(req, res) });
router.get('/getClientDetails/:client_id', (req, res) => { apis.getClientDetails(req, res) });
router.get('/getAllClients', (req, res) => { apis.getAllClients(req, res) });
router.get('/specialDates', (req, res) => { apis.specialDates(req, res) });

router.post('/getLeadByBrandName', (req, res) => { apis.getLeadByBrandName(req, res) });


router.get('/getAllLeads', (req, res) => { apis.getAllLeads(req, res) });
router.get('/updateLeadStatus/:lead_id/:status', (req, res) => { apis.updateLeadStatus(req, res) });
router.get('/getLeadDetails/:lead_id', (req, res) => { apis.getLeadDetails(req, res) });
router.get('/getLeadsByStatus', (req, res) => { apis.getLeadsByStatus(req, res) });
router.post('/getTotalLeadCount', (req, res) => { apis.getTotalLeadCount(req, res) });


router.post('/addTag', (req, res) => { apis.addTag(req, res) });
router.get('/getAllTags', (req, res) => { apis.getAllTags(req, res) });
router.get('/getTagsDetails/:tag_id', (req, res) => { apis.getTagsDetails(req, res) });




router.post('/addTask', (req, res) => { apis.addTask(req, res) });
router.get('/updateTaskStatus/:task_id/:status', (req, res) => { apis.updateTaskStatus(req, res) });
router.get('/getAllTasks', (req, res) => { apis.getAllTasks(req, res) });
router.get('/getTasksByEmployeeID/:employee_id', (req, res) => { apis.getTasksByEmployeeID(req, res) });
router.get('/getTasksByTaskID/:task_id', (req, res) => { apis.getTasksByTaskID(req, res) });
router.get('/updateTaskPriority/:task_id/:priority', (req, res) => { apis.updateTaskPriority(req, res) });
router.get('/getAllCompletedTask', (req, res) => { apis.getAllCompletedTask(req, res) });

router.put('/employees/EditPermission/:employee_id', (req, res) => { apis.EditPermission(req, res) });

router.post('/sourceAddTag', (req, res) => { apis.sourceAddTag(req, res) });
router.get('/sourceGetAllTags', (req, res) => { apis.sourceGetAllTags(req, res) });
router.get('/sourceGetTagsDetails/:source_tag_id', (req, res) => { apis.sourceGetTagsDetails(req, res) });

router.post('/createSalarySlip', (req, res) => { apis.createSalarySlip(req, res) });
router.get('/getAllSlips', (req, res) => { apis.getAllSlips(req, res) });
router.get('/getAllSlipsByEmployee/:employee_id', (req, res) => { apis.getAllSlipsByEmployee(req, res) });
router.get('/downloadSalarySlip/:slip_id', (req, res) => { apis.downloadSalarySlip(req, res) });

router.post('/addProducts', (req, res) => { apis.addProducts(req, res) });
router.get('/getAllProducts', (req, res) => { apis.getAllProducts(req, res) });
router.get('/getProductDetails/:product_id', (req, res) => { apis.getProductDetails(req, res) });


router.post('/createInvoice', (req, res) => { apis.createInvoice(req, res) });
router.get('/getAllInvoices', (req, res) => { apis.getAllInvoices(req, res) });
router.get('/getAllInvoiceByClient/:client_id', (req, res) => { apis.getAllInvoiceByClient(req, res) });
router.get('/downloadInvoice/:invoice_id', (req, res) => { apis.downloadInvoice(req, res) });
router.post('/getAllInvoicesFilter', (req, res) => { apis.getAllInvoicesFilter(req, res) });

router.post('/getTotalInvoiceCount', (req, res) => { apis.getTotalInvoiceCount(req, res) });
router.post('/handleCumulativeInvoices', (req, res) => { apis.handleCumulativeInvoices(req, res) });
router.post('/getAllInvoiceByBrand', (req, res) => { apis.getAllInvoiceByBrand(req, res) });
router.patch('/invoice/:invoice_id', (req, res) => { apis.collectedInvoice(req, res) });
router.get('/getAllPaidInvoices', (req, res) => { apis.getAllPaidInvoices(req, res) });


router.get('/getTotalPaidInvoicesCount', (req, res) => { apis.getTotalPaidInvoicesCount(req, res) });
router.get('/getTotalUnpaidInvoicesCount', (req, res) => { apis.getTotalUnpaidInvoicesCount(req, res) });
router.get('/getLifetimeSales', (req, res) => { apis.getLifetimeSales(req, res) });
router.get('/getAverageInvoiceAmount', (req, res) => { apis.getAverageInvoiceAmount(req, res) });
router.get('/getMonthlySalesReport', (req, res) => { apis.getMonthlySalesReport(req, res) });


router.delete('/deleteClientById/:client_id', (req, res) => { apis.deleteClientById(req, res) });
router.delete('/deleteEmployeeById/:employee_id', (req, res) => { apis.deleteEmployeeById(req, res) });
router.delete('/deleteInvoiceById/:invoice_id', (req, res) => { apis.deleteInvoiceById(req, res) });
router.delete('/deleteLeadById/:lead_id', (req, res) => { apis.deleteLeadById(req, res) });
router.delete('/deleteProductById/:product_id', (req, res) => { apis.deleteProductById(req, res) });
router.delete('/deleteProjectById/:project_id', (req, res) => { apis.deleteProjectById(req, res) });
router.delete('/deleteSlipById/:slip_id', (req, res) => { apis.deleteSlipById(req, res) });
router.delete('/deleteSourceTagById/:source_tag_id', (req, res) => { apis.deleteSourceTagById(req, res) });
router.delete('/deleteTagById/:tag_id', (req, res) => { apis.deleteTagById(req, res) });
router.delete('/deleteTaskById/:task_id', (req, res) => { apis.deleteTaskById(req, res) });



router.get('/getTotalProjects', (req, res) => { apis.getTotalProjects(req, res) });

router.post('/getProjectCountByStatus', (req, res) => { apis.getProjectCountsByStatus(req, res) });

router.get('/getProjectCountByClient', (req, res) => { apis.getProjectCountsByClient(req, res) });
router.get('/getProjectCountByBrand', (req, res) => { apis.getProjectCountsByBrand(req, res) });
router.get('/getProjectsByDeadlineRange', (req, res) => { apis.getProjectsByDeadlineRange(req, res) });


router.post('/createNewLeave', (req, res) => { apis.createNewLeave(req, res) });
router.get('/getLeaveById/:leave_id', apis.getLeaveById);
router.get('/getAllLeaves', apis.getAllLeaves);
router.delete('/deleteLeaveById/:leave_id', apis.deleteLeaveById);
router.patch('/updateLeave/:leave_id', apis.updateLeave);
router.get('/updateLeaveStatus/:leave_id/:status', apis.updateLeaveStatus);

router.post('/getLeavesByStatus/:financialYear?/:month?', (req, res) => { apis.getLeavesByStatus(req, res) });
router.post('/getTotalLeaves', (req, res) => { apis.getTotalLeaveCount(req, res) });


router.post('/createLetter', uploadFields,apis.createLetter);
router.patch('/updateLetter/:letter_id', uploadFields,apis.updateLetter);
router.get('/getAllLetters', apis.getAllLetters);
router.get('/getLetterById/:letter_id', apis.getLetterById);
router.delete('/deleteLetterById/:letter_id', apis.deleteLetterById);


router.post('/updatePassword', (req, res) => { apis.updatePassword(req, res) });




router.post('/addYears', (req, res) => { apis.addYears(req, res) });
router.get('/getAllYears', (req, res) => { apis.getAllYears(req, res) });
router.delete('/deleteYearById/:year_id', apis.deleteYearById);



router.post('/addSupply', (req, res) => { apis.addSupply(req, res) });
router.get('/getAllSupplys', (req, res) => { apis.getAllSupplys(req, res) });
router.delete('/deleteSupplyById/:supply_id', apis.deleteSupplyById);

router.post('/createExpenses',apis.createExpenses);
router.patch('/updateExpense/:expense_id',apis.updateExpense);
router.get('/getAllExpenses', apis.getAllExpenses);
router.get('/getExpenseById/:expense_id', apis.getExpenseById);
router.delete('/deleteExpense/:expense_id', apis.deleteExpense);


router.get('/getAllDuration', (req, res) => { apis.getAllDuration(req, res) });
router.post('/addDuration', (req, res) => { apis.addDuration(req, res) });
router.delete('/deleteDurationById/:duration_id', apis.deleteDurationById);



router.post('/addLedger',apis.addLedger);
router.get('/getLeadgerbyLedgerId/:ledger_id',apis.getLeadgerbyLedgerId);
router.get('/getLeadgerbyEmployeeId/:ledger_id',apis.getLeadgerbyEmployeeId);
router.get('/getLeadgerByClientId/:ledger_id',apis.getLeadgerByClientId);
router.get('/getAllLedgers', apis.getAllLedgers);
router.delete('/deleteLedger/:ledger_id', apis.deleteLedger);
router.get('/ledgerStatistics', apis.ledgerStatistics);


router.post('/addReceivable',apis.addReceivable);
router.get('/getAllReceivable', apis.getAllReceivable);
router.delete('/deleteReceivable/:rec_id', apis.deleteReceivable);
router.patch('/updateReceivable/:rec_id',apis.updateReceivable);

router.post('/addHoliday', apis.addHoliday);
router.get('/getAllHolidays', apis.getHolidays);
router.get('/getHolidayById/:calender_id', apis.getHolidayById);
router.delete('/deleteHoliday/:calender_id', apis.deleteHolidayById);
router.patch('/updateHoliday/:calender_id', apis.updateHolidayById);

module.exports = router
