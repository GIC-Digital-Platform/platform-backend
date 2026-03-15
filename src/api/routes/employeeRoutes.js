const { Router } = require('express');
const { validateCreateEmployee, validateUpdateEmployee } = require('./validate');

function employeeRoutes(employeeController) {
  const router = Router();

  router.get('/', employeeController.getEmployees);
  router.post('/', validateCreateEmployee, employeeController.createEmployee);
  router.put('/:id', validateUpdateEmployee, employeeController.updateEmployee);
  router.delete('/:id', employeeController.deleteEmployee);

  return router;
}

module.exports = employeeRoutes;
