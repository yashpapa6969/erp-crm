const Employee = require('./employee');
const Project = require('./project');
const Client = require('./client');
const LeaveRequest = require('./leaveManagement');
const Lead = require('./leads');
const Task = require('./tasks');
const Tag = require('./tags');
const sourceTag = require('./sourceTags');

var schemas =
 {
    Project:Project,
    Employee:Employee,
    Client:Client,
    LeaveRequest:LeaveRequest,
    Lead:Lead,
    Task:Task,
    Tag:Tag,
    sourceTag:sourceTag,
    

   
  }

module.exports = schemas;