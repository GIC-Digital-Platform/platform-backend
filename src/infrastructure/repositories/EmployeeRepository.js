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
        'employees.cafe_id',
        'employees.start_date',
        'cafes.name as cafe_name',
      )
      .leftJoin('cafes', 'employees.cafe_id', 'cafes.id');

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
        cafe_id: row.cafe_id,
        start_date: row.start_date,
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
    const [employee] = await this.db('employees')
      .insert({
        id: data.id,
        name: data.name,
        email_address: data.emailAddress,
        phone_number: data.phoneNumber,
        gender: data.gender,
        cafe_id: cafeId,
        start_date: startDate,
      })
      .returning('*');

    return employee;
  }

  async update(id, data, cafeId, startDate) {
    const updatePayload = {
      name: data.name,
      email_address: data.emailAddress,
      phone_number: data.phoneNumber,
      gender: data.gender,
      updated_at: this.db.fn.now(),
    };

    if (cafeId !== undefined) updatePayload.cafe_id = cafeId;
    if (startDate !== undefined) updatePayload.start_date = startDate;

    const [employee] = await this.db('employees')
      .where({ id })
      .update(updatePayload)
      .returning('*');

    return employee;
  }

  async delete(id) {
    const deleted = await this.db('employees').where({ id }).del();
    return deleted > 0;
  }

  async findByCafeId(cafeId) {
    return this.db('employees').where({ cafe_id: cafeId }).select('*');
  }
}

module.exports = EmployeeRepository;
