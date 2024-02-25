
const createEmployee = require("./Employee/createEmployee"); 
const getAllEmployees = require("./Employee/getAllEmployees"); 
const getEmployeeDetails = require("./Employee/getEmployeebyId"); 
const LoginEmployee = require("./Employee/login"); 

const getAllManagersbyDepartment = require("./Employee/getAllManagersByDepartment"); 
const getManagersAllDetails = require("./Employee/getAllManagers"); 

const createProject = require("./Projects/createProject"); 


const createClient = require("./Clients/createClient"); 
const getClientDetails = require("./Clients/getClientDetails"); 
const getAllClients = require("./Clients/getAllClients"); 



const createLead = require("./Leads/createLead"); 
const getAllLeads = require("./Leads/getAllLeads"); 
const updateLeadStatus = require("./Leads/changeLeadStatus"); 



var apis = {
  createEmployee:createEmployee,
  getAllEmployees:getAllEmployees,
  getEmployeeDetails:getEmployeeDetails,

  getAllManagersbyDepartment:getAllManagersbyDepartment,
  getManagersAllDetails:getManagersAllDetails,

  createProject:createProject,

  createClient:createClient,
  getClientDetails:getClientDetails,
  getAllClients:getAllClients,
  LoginEmployee:LoginEmployee,

  createLead:createLead,
  getAllLeads:getAllLeads,
  updateLeadStatus:updateLeadStatus,

};

module.exports = apis;
