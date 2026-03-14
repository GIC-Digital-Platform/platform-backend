/**
 * IEmployeeRepository - Interface contract for Employee persistence
 */
class IEmployeeRepository {
  /** @returns {Promise<Array>} */
  async findAll(cafeName) { throw new Error('Interface not implemented'); }

  /** @returns {Promise<Object|null>} */
  async findById(id) { throw new Error('Interface not implemented'); }

  /** @returns {Promise<boolean>} */
  async existsByEmail(email, excludeId) { throw new Error('Interface not implemented'); }

  /** @returns {Promise<Object>} */
  async create(data, cafeId, startDate) { throw new Error('Interface not implemented'); }

  /** @returns {Promise<Object|null>} */
  async update(id, data, cafeId, startDate) { throw new Error('Interface not implemented'); }

  /** @returns {Promise<boolean>} */
  async delete(id) { throw new Error('Interface not implemented'); }

  /** @returns {Promise<Array>} */
  async findByCafeId(cafeId) { throw new Error('Interface not implemented'); }
}

module.exports = IEmployeeRepository;
