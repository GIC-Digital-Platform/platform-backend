const { NotFoundError } = require('../../../api/middleware/errors');

class DeleteEmployeeHandler {
  constructor({ employeeRepository }) {
    this.employeeRepository = employeeRepository;
  }

  async handle(command) {
    const existing = await this.employeeRepository.findById(command.id);
    if (!existing) throw new NotFoundError(`Employee with id '${command.id}' not found`);

    return this.employeeRepository.delete(command.id);
  }
}

module.exports = DeleteEmployeeHandler;
