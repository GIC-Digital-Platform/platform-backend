const GetEmployeesQuery = require('../../application/employees/queries/GetEmployeesQuery');
const CreateEmployeeCommand = require('../../application/employees/commands/CreateEmployeeCommand');
const UpdateEmployeeCommand = require('../../application/employees/commands/UpdateEmployeeCommand');
const DeleteEmployeeCommand = require('../../application/employees/commands/DeleteEmployeeCommand');

class EmployeeController {
  constructor({ mediator }) {
    this.mediator = mediator;
    this.getEmployees = this.getEmployees.bind(this);
    this.createEmployee = this.createEmployee.bind(this);
    this.updateEmployee = this.updateEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }

  async getEmployees(req, res, next) {
    try {
      const { cafe } = req.query;
      const data = await this.mediator.send(new GetEmployeesQuery({ cafe }));
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }

  async createEmployee(req, res, next) {
    try {
      const { name, email_address, phone_number, gender, cafe_id, start_date } = req.body;
      const data = await this.mediator.send(
        new CreateEmployeeCommand({
          name,
          emailAddress: email_address,
          phoneNumber: phone_number,
          gender,
          cafeId: cafe_id || null,
          startDate: start_date || null,
        }),
      );
      res.status(201).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }

  async updateEmployee(req, res, next) {
    try {
      const { name, email_address, phone_number, gender, cafe_id, start_date } = req.body;
      const data = await this.mediator.send(
        new UpdateEmployeeCommand({
          id: req.params.id,
          name,
          emailAddress: email_address,
          phoneNumber: phone_number,
          gender,
          cafeId: cafe_id !== undefined ? (cafe_id || null) : undefined,
          startDate: start_date !== undefined ? (start_date || null) : undefined,
        }),
      );
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }

  async deleteEmployee(req, res, next) {
    try {
      await this.mediator.send(new DeleteEmployeeCommand({ id: req.params.id }));
      res.json({ success: true, message: 'Employee deleted successfully' });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = EmployeeController;
