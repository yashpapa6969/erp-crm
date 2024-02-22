const Employee = require('./employee');
const Project = require('./project');
const Client = require('./client');
const LeaveRequest = require('./leaveManagement');

var schemas =
 {
    Project:Project,
    Employee:Employee,
    Client:Client,
    LeaveRequest:LeaveRequest,

   
  }

module.exports = schemas;