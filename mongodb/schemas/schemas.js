const Employee = require('./employee');
const Project = require('./project');
const Client = require('./client');
const LeaveRequest = require('./leaveManagement');
const Lead = require('./leads');
const Task = require('./tasks');
const Tag = require('./tags');
const sourceTag = require('./sourceTags');
const salarySlip = require('./salarySlip');
const Invoice = require('./invoice');
const productServices = require('./productServices');
const letter = require('./letter');
const Year = require('./Years');
const supplyTag = require('./supply');
const Expense = require('./expense');
const Duration = require('./duration');
const Ledger = require('./cashLedger');
const Receivable = require('./receivables');

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
    salarySlip:salarySlip,
    Invoice:Invoice,
    productServices:productServices,
    Letter:letter,
    Year:Year,
    supplyTag:supplyTag,
    Expense:Expense,
    Duration:Duration,
    Ledger:Ledger,
    Receivable:Receivable,
  }

module.exports = schemas;