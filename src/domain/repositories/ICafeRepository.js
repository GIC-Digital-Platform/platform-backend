/**
 * ICafeRepository - Interface for Cafe persistence
 */
class ICafeRepository {
  /** @returns {Promise<Array>} */
  async findAll(location) { throw new Error('Interface not implemented'); }

  /** @returns {Promise<Object|null>} */
  async findById(id) { throw new Error('Interface not implemented'); }

  /** @returns {Promise<Object>} */
  async create(data) { throw new Error('Interface not implemented'); }

  /** @returns {Promise<Object|null>} */
  async update(id, data) { throw new Error('Interface not implemented'); }

  /** @returns {Promise<boolean>} */
  async delete(id) { throw new Error('Interface not implemented'); }
}

module.exports = ICafeRepository;
