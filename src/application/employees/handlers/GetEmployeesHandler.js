class GetEmployeesHandler {
  constructor({ employeeRepository }) {
    this.employeeRepository = employeeRepository;
  }

  async handle(query) {
    return this.employeeRepository.findAll(query.cafe);
  }
}

module.exports = GetEmployeesHandler;
