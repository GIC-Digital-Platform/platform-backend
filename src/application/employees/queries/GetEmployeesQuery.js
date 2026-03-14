class GetEmployeesQuery {
  constructor({ cafe } = {}) {
    this.cafe = cafe || null;
  }
}

module.exports = GetEmployeesQuery;
