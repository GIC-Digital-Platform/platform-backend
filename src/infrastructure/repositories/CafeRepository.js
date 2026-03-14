const ICafeRepository = require('../../domain/repositories/ICafeRepository');

class CafeRepository extends ICafeRepository {
  constructor({ db }) {
    super();
    this.db = db;
  }

  async findAll(location) {
    const query = this.db('cafes')
      .select(
        'cafes.id',
        'cafes.name',
        'cafes.description',
        'cafes.logo',
        'cafes.location',
        this.db.raw('COUNT(cafe_employees.employee_id)::int AS employees'),
      )
      .leftJoin('cafe_employees', 'cafes.id', 'cafe_employees.cafe_id')
      .groupBy('cafes.id')
      .orderBy('employees', 'desc');

    if (location) {
      query.whereILike('cafes.location', `%${location}%`);
    }

    return query;
  }

  async findById(id) {
    return this.db('cafes').where({ id }).first();
  }

  async create(data) {
    const [cafe] = await this.db('cafes')
      .insert({
        name: data.name,
        description: data.description,
        logo: data.logo || null,
        location: data.location,
      })
      .returning('*');
    return cafe;
  }

  async update(id, data) {
    const [cafe] = await this.db('cafes')
      .where({ id })
      .update({
        ...data,
        updated_at: this.db.fn.now(),
      })
      .returning('*');
    return cafe;
  }

  async delete(id) {
    const deleted = await this.db('cafes').where({ id }).del();
    return deleted > 0;
  }
}

module.exports = CafeRepository;
