const { NotFoundError, ConflictError } = require('../../../api/middleware/errors');

class UpdateEmployeeHandler {
  constructor({ employeeRepository }) {
    this.employeeRepository = employeeRepository;
  }

  async handle(command) {
    const existing = await this.employeeRepository.findById(command.id);
    if (!existing) throw new NotFoundError(`Employee with id '${command.id}' not found`);

    return this.employeeRepository.update(
      command.id,
      { name: command.name, emailAddress: command.emailAddress, phoneNumber: command.phoneNumber, gender: command.gender },
      command.cafeId,
      command.startDate,
    );
  }
}

module.exports = UpdateEmployeeHandler;
