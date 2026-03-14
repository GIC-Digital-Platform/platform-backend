const { NotFoundError } = require('../../../api/middleware/errors');

class DeleteCafeHandler {
  constructor({ cafeRepository, employeeRepository }) {
    this.cafeRepository = cafeRepository;
    this.employeeRepository = employeeRepository;
  }

  async handle(command) {
    const existing = await this.cafeRepository.findById(command.id);
    if (!existing) throw new NotFoundError(`Cafe with id '${command.id}' not found`);

    // Delete all employees belonging to this cafe first
    const employees = await this.employeeRepository.findByCafeId(command.id);
    for (const emp of employees) {
      await this.employeeRepository.delete(emp.id);
    }

    return this.cafeRepository.delete(command.id);
  }
}

module.exports = DeleteCafeHandler;
