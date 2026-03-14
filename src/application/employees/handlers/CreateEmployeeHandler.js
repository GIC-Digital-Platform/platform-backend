const { ConflictError } = require('../../../api/middleware/errors');
const { generateEmployeeId } = require('../../../infrastructure/utils/idGenerator');

class CreateEmployeeHandler {
  constructor({ employeeRepository }) {
    this.employeeRepository = employeeRepository;
  }

  async handle(command) {
    const id = generateEmployeeId();

    return this.employeeRepository.create(
      { id, name: command.name, emailAddress: command.emailAddress, phoneNumber: command.phoneNumber, gender: command.gender },
      command.cafeId,
      command.startDate,
    );
  }
}

module.exports = CreateEmployeeHandler;
