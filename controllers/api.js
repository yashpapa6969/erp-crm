
const createEmployee = require("./Employee/createEmployee"); 
const getAllEmployees = require("./Employee/getAllEmployees"); 
const getEmployeeDetails = require("./Employee/getEmployeebyId"); 
const LoginEmployee = require("./Employee/login"); 

const getAllManagersbyDepartment = require("./Employee/getAllManagersByDepartment"); 
const getManagersAllDetails = require("./Employee/getAllManagers"); 

const createProject = require("./Projects/createProject"); 
const getAllProjects = require("./Projects/getAllProjects"); 
const getProjectDetails = require("./Projects/getProjectById"); 
const getProjectsByBrandName = require("./Projects/getProjectsByBrandName"); 



const createClient = require("./Clients/createClient"); 
const getClientDetails = require("./Clients/getClientDetails"); 
const getAllClients = require("./Clients/getAllClients"); 
const updateClient = require("./Clients/updateDetails"); 


const createLead = require("./Leads/createLead"); 
const getAllLeads = require("./Leads/getAllLeads"); 
const updateLeadStatus = require("./Leads/changeLeadStatus"); 
const updateLead = require("./Leads/updateDetails"); 

const addTag = require("./Tags/addTags"); 
const getAllTags = require("./Tags/getAllTags"); 
const getTagsDetails = require("./Tags/getTagsbyID"); 


const addTask = require("./Tasks/createTask"); 
const updateTaskStatus = require("./Tasks/changeTaskStatus"); 
const getAllTasks = require("./Tasks/getAllTasks"); 
const getTasksByEmployeeID = require("./Tasks/getTaskByEmpId"); 
const getTasksByTaskID = require("./Tasks/getTaskByTaskId"); 









var apis = {
  createEmployee:createEmployee,
  getAllEmployees:getAllEmployees,
  getEmployeeDetails:getEmployeeDetails,
  LoginEmployee:LoginEmployee,
  getAllManagersbyDepartment:getAllManagersbyDepartment,
  getManagersAllDetails:getManagersAllDetails,

  createProject:createProject,
  getAllProjects:getAllProjects,
  getProjectDetails:getProjectDetails,
  getProjectsByBrandName:  getProjectsByBrandName,

  createClient:createClient,
  getClientDetails:getClientDetails,
  getAllClients:getAllClients,
  updateClient:updateClient,

  

  createLead:createLead,
  getAllLeads:getAllLeads,
  updateLeadStatus:updateLeadStatus,
  updateLead:updateLead,
  
  addTag:addTag,
  getAllTags:getAllTags,
  getTagsDetails:getTagsDetails,

  addTask:addTask,
  updateTaskStatus:updateTaskStatus,
  addTask:addTask,
  getAllTasks:getAllTasks,
  getTasksByEmployeeID:getTasksByEmployeeID,
  getTasksByTaskID:getTasksByTaskID,

};

module.exports = apis;
