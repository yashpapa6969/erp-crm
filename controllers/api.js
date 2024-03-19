
const createEmployee = require("./Employee/createEmployee");
const getAllEmployees = require("./Employee/getAllEmployees");
const getEmployeeDetails = require("./Employee/getEmployeebyId");
const LoginEmployee = require("./Employee/login");
const deleteEmployeeById = require("./Employee/DeleteEmployee");

const getAllManagersbyDepartment = require("./Employee/getAllManagersByDepartment");
const getManagersAllDetails = require("./Employee/getAllManagers");

const createProject = require("./Projects/createProject");
const getAllProjects = require("./Projects/getAllProjects");
const getProjectDetails = require("./Projects/getProjectById");
const getProjectsByBrandName = require("./Projects/getProjectsByBrandName");
const deleteProjectById = require("./Projects/deleteProject");



const createClient = require("./Clients/createClient");
const getClientDetails = require("./Clients/getClientDetails");
const getAllClients = require("./Clients/getAllClients");
const updateClient = require("./Clients/updateDetails");
const deleteClientById = require("./Clients/deleteClient");
const specialDates = require("./Clients/clientDateReminder");



const createLead = require("./Leads/createLead");
const getAllLeads = require("./Leads/getAllLeads");
const getLeadDetails= require("./Leads/getLeadDetails");
const updateLeadStatus = require("./Leads/changeLeadStatus");
const updateLead = require("./Leads/updateDetails");
const deleteLeadById = require("./Leads/deleteLead");
const getLeadsByStatus = require("./Leads/getLeadsByStatus");
const getTotalLeadCount = require("./Leads/getTotalLeadCount");


const addTag = require("./Tags/addTags");
const getAllTags = require("./Tags/getAllTags");
const getTagsDetails = require("./Tags/getTagsbyID");
const deleteTagById = require("./Tags/deleteTag");


const sourceAddTag = require("./sourceTags/addTags");
const sourceGetAllTags = require("./sourceTags/getAllTags");
const sourceGetTagsDetails = require("./sourceTags/getTagsbyID");
const deleteSourceTagById = require("./sourceTags/deleteSourceTag");


const addTask = require("./Tasks/createTask");
const updateTaskStatus = require("./Tasks/changeTaskStatus");
const getAllTasks = require("./Tasks/getAllTasks");
const getTasksByEmployeeID = require("./Tasks/getTaskByEmpId");
const getTasksByTaskID = require("./Tasks/getTaskByTaskId");
const deleteTaskById = require("./Tasks/deleteTask");



const getAllSlipsByEmployee = require("./salarySlip/getSlipsbyEmployeeId");
const getAllSlips = require("./salarySlip/getAllSlips");
const createSalarySlip = require("./salarySlip/createSalary");
const downloadSalarySlip = require("./salarySlip/salarySlipDownload");
const deleteSlipById = require("./salarySlip/deleteSalarySlip");






const addProducts = require("./productServices/addProducts");
const getAllProducts = require("./productServices/getAllProducts");
const getProductDetails = require("./productServices/getProductsbyID");
const deleteProductById = require("./productServices/deleteProduct");
const getTotalProjects = require("./Projects/getTotalProjects");
const getProjectCountsByStatus = require("./Projects/getProjectCountByStatus");
const getProjectCountsByClient = require("./Projects/getProjectCountsByClient");
const getProjectCountsByBrand = require("./Projects/getProjectCountsByBrand");
const getProjectsByDeadlineRange = require("./Projects/getProjectsByDeadlineRange");




const createInvoice = require("./Invoice/createInvoice");
const getAllInvoices = require("./Invoice/getAllInvoices");
const getAllInvoiceByClient = require("./Invoice/getInvoicebyClientId");
const downloadInvoice = require("./Invoice/invoiceDownload");
const deleteInvoiceById = require("./Invoice/deleteInvoice");
const getAllInvoicesFilter = require("./Invoice/getInvoiceFilter");

const createNewLeave = require("./leaveManagement/createLeave");
const getLeaveById= require("./leaveManagement/getLeaveById");
const deleteLeaveById= require("./leaveManagement/deleteLeaveById");
const getAllLeaves= require("./leaveManagement/getAllLeaves");
const updateLeave= require("./leaveManagement/updateLeave");
const updateLeaveStatus= require("./leaveManagement/updateLeaveStatus");
const getLeaveByStatus = require("./leaveManagement/getLeaveByStatus");
const getTotalLeaveCount = require("./leaveManagement/getTotalLeaveCount");



const updatePassword = require("./Settings/updatePassword");



const createLetter = require("./Letters/createLetter");
const getAllLetters = require("./Letters/getAllLetters");
const updateLetter = require("./Letters/updateLetter");
const getLetterById = require("./Letters/getLetterById");
const deleteLetterById = require("./Letters/deleteLetterById");

var apis = {
  createEmployee: createEmployee,
  getAllEmployees: getAllEmployees,
  getEmployeeDetails: getEmployeeDetails,
  LoginEmployee: LoginEmployee,
  getAllManagersbyDepartment: getAllManagersbyDepartment,
  getManagersAllDetails: getManagersAllDetails,

  createProject: createProject,
  getAllProjects: getAllProjects,
  getProjectDetails: getProjectDetails,
  getProjectsByBrandName: getProjectsByBrandName,

  createClient: createClient,
  getClientDetails: getClientDetails,
  getAllClients: getAllClients,
  updateClient: updateClient,
  specialDates:specialDates,



  createLead: createLead,
  getAllLeads: getAllLeads,
  updateLeadStatus: updateLeadStatus,
  updateLead: updateLead,
  getLeadDetails : getLeadDetails,
  getLeadsByStatus : getLeadsByStatus,
  getTotalLeadCount : getTotalLeadCount,

  addTag: addTag,
  getAllTags: getAllTags,
  getTagsDetails: getTagsDetails,

  addTask: addTask,
  updateTaskStatus: updateTaskStatus,
  addTask: addTask,
  getAllTasks: getAllTasks,
  getTasksByEmployeeID: getTasksByEmployeeID,
  getTasksByTaskID: getTasksByTaskID,


  sourceGetTagsDetails: sourceGetTagsDetails,
  sourceAddTag: sourceAddTag,
  sourceGetAllTags: sourceGetAllTags,


  getAllSlipsByEmployee: getAllSlipsByEmployee,
  getAllSlips: getAllSlips,
  createSalarySlip: createSalarySlip,
  downloadSalarySlip: downloadSalarySlip,


  addProducts: addProducts,
  getAllProducts: getAllProducts,
  getProductDetails: getProductDetails,
  getTotalProjects : getTotalProjects,
  getProjectCountsByStatus : getProjectCountsByStatus,
  getProjectCountsByClient : getProjectCountsByClient,
  getProjectCountsByBrand : getProjectCountsByBrand,
  getProjectsByDeadlineRange : getProjectsByDeadlineRange,

  createInvoice: createInvoice,
  getAllInvoices: getAllInvoices,
  getAllInvoiceByClient: getAllInvoiceByClient,
  downloadInvoice: downloadInvoice,
  getAllInvoicesFilter:getAllInvoicesFilter,




  deleteClientById: deleteClientById,
  deleteEmployeeById: deleteInvoiceById,
  deleteInvoiceById: deleteInvoiceById,
  deleteLeadById: deleteLeadById,
  deleteProductById: deleteProductById,
  deleteProjectById: deleteProjectById,
  deleteSlipById: deleteSlipById,
  deleteSourceTagById: deleteSourceTagById,
  deleteTagById: deleteTagById,
  deleteTaskById: deleteTaskById,

  createNewLeave : createNewLeave,
  getLeaveById : getLeaveById,
  getAllLeaves : getAllLeaves,
  deleteLeaveById: deleteLeaveById ,
  updateLeave : updateLeave,
  updateLeaveStatus : updateLeaveStatus,
  getLeavesByStatus : getLeaveByStatus,
  getTotalLeaveCount : getTotalLeaveCount,



  updatePassword:updatePassword,,


  createLetter : createLetter,
  getAllLetters : getAllLetters ,
  updateLetter:updateLetter, 
  getLetterById:getLetterById,
  deleteLetterById : deleteLetterById

};

module.exports = apis;
