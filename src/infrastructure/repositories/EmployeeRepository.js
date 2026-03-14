const IEmployeeRepository = require('../../domain/repositories/IEmployeeRepository');

class EmployeeRepository extends IEmployeeRepository {
  constructor({ db }) {
    super();
    this.db = db;
  }

  async findAll(cafeName) {
    const query = this.db('employees')
      .select(
        'employees.id',
        'employees.name',
        'employees.email_address',
        'employees.phone_number',
        'employees.gender',
        'cafes.name as cafe_name',
        'cafe_employees.start_date',
      )
      .leftJoin('cafe_employees', 'employees.id', 'cafe_employees.employee_id')
      .leftJoin('cafes', 'cafe_employees.cafe_id', 'cafes.id');

    if (cafeName) {
      query.whereILike('cafes.name', `%${cafeName}%`);
    }

    const rows = await query;

    return rows
      .map((row) => ({
        id: row.id,
        name: row.name,
        email_address: row.email_address,
        phone_number: row.phone_number,
        gender: row.gender,
        cafe: row.cafe_name || '',
        days_worked: row.start_date
          ? Math.floor((Date.now() - new Date(row.start_date).getTime()) / (1000 * 60 * 60 * 24))
          : 0,
      }))
      .sort((a, b) => b.days_worked - a.days_worked);
  }

  async findById(id) {
    return this.db('employees').where({ id }).first();
  }

  async create(data, cafeId, startDate) {
    return this.db.transaction(async (trx) => {
      const [employee] = await trx('employees')
        .insert({
          id: data.id,
          name: data.name,
          email_address: data.emailAddress,
          phone_number: data.phoneNumber,
          gender: data.gender,
        })
        .returning('*');

      if (cafeId && startDate) {
        await trx('cafe_employees').insert({
          employee_id: employee.id,
          cafe_id: cafeId,
          start_date: startDate,
        });
      }

      return employee;
    });
  }

  async update(id, data, cafeId, startDate) {
    return this.db.transaction(async (trx) => {
      const [employee] = await trx('employees')
        .where({ id })
        .update({
          name: data.name,
          email_address: data.emailAddress,
          phone_number: data.phoneNumber,
          gender: data.gender,
          updated_at: trx.fn.now(),
        })
        .returning('*');

      // Remove existing cafe assignment
      await trx('cafe_employees').where({ employee_id: id }).del();

      if (cafeId && startDate) {
        await trx('cafe_employees').insert({
          employee_id: id,
          cafe_id: cafeId,
          start_date: startDate,
        });
      }

      return employee;
    });
  }

  async delete(id) {
    // cafe_employees rows are deleted by CASCADE
    const deleted = await this.db('employees').where({ id }).del();
    return deleted > 0;
  }

  async findByCafeId(cafeId) {
    return this.db('employees')
      .join('cafe_employees', 'employees.id', 'cafe_employees.employee_id')
      .where('cafe_employees.cafe_id', cafeId)
      .select('employees.*');
  }
}

module.exports = EmployeeRepository;
