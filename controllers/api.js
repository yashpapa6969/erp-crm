
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
};

module.exports = apis;
