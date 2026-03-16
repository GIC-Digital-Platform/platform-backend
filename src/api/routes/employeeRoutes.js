const { Router } = require('express');
const { validateCreateEmployee, validateUpdateEmployee } = require('./validate');
const { writeLimiter } = require('../middleware/rateLimiter');

function employeeRoutes(employeeController) {
  const router = Router();

  router.get('/', employeeController.getEmployees);
  router.post('/', writeLimiter, validateCreateEmployee, employeeController.createEmployee);
  router.put('/:id', writeLimiter, validateUpdateEmployee, employeeController.updateEmployee);
  router.delete('/:id', writeLimiter, employeeController.deleteEmployee);

  return router;
}

module.exports = employeeRoutes;
