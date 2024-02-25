
const createEmployee = require("./Employee/createEmployee"); 
const getAllEmployees = require("./Employee/getAllEmployees"); 
const getEmployeeDetails = require("./Employee/getEmployeebyId"); 
const LoginEmployee = require("./Employee/login"); 

const getAllManagersbyDepartment = require("./Employee/getAllManagersByDepartment"); 
const getManagersAllDetails = require("./Employee/getAllManagers"); 

const createProject = require("./Projects/createProject"); 
const getAllProjects = require("./Projects/getAllProjects"); 



const createClient = require("./Clients/createClient"); 
const getClientDetails = require("./Clients/getClientDetails"); 
const getAllClients = require("./Clients/getAllClients"); 
const updateClient = require("./Clients/updateDetails"); 


const createLead = require("./Leads/createLead"); 
const getAllLeads = require("./Leads/getAllLeads"); 
const updateLeadStatus = require("./Leads/changeLeadStatus"); 
const updateLead = require("./Leads/updateDetails"); 



var apis = {
  createEmployee:createEmployee,
  getAllEmployees:getAllEmployees,
  getEmployeeDetails:getEmployeeDetails,
  LoginEmployee:LoginEmployee,
  getAllManagersbyDepartment:getAllManagersbyDepartment,
  getManagersAllDetails:getManagersAllDetails,

  createProject:createProject,
  getAllProjects:getAllProjects,

  createClient:createClient,
  getClientDetails:getClientDetails,
  getAllClients:getAllClients,
  updateClient:updateClient,

  

  createLead:createLead,
  getAllLeads:getAllLeads,
  updateLeadStatus:updateLeadStatus,
  updateLead:updateLead,
  
};

module.exports = apis;
