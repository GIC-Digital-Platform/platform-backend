/**
 * Awilix DI Container — Node.js equivalent of Autofac (.NET)
 *
 * Registers all application services, repositories, handlers, and controllers.
 * The mediator is wired here with all command/query handlers.
 */
const { createContainer, asClass, asValue, InjectionMode, Lifetime } = require('awilix');

const db = require('./infrastructure/database/connection');
const Mediator = require('./application/mediator/Mediator');

// Repositories
const CafeRepository = require('./infrastructure/repositories/CafeRepository');
const EmployeeRepository = require('./infrastructure/repositories/EmployeeRepository');

// Cafe handlers
const GetCafesHandler = require('./application/cafes/handlers/GetCafesHandler');
const CreateCafeHandler = require('./application/cafes/handlers/CreateCafeHandler');
const UpdateCafeHandler = require('./application/cafes/handlers/UpdateCafeHandler');
const DeleteCafeHandler = require('./application/cafes/handlers/DeleteCafeHandler');

// Employee handlers
const GetEmployeesHandler = require('./application/employees/handlers/GetEmployeesHandler');
const CreateEmployeeHandler = require('./application/employees/handlers/CreateEmployeeHandler');
const UpdateEmployeeHandler = require('./application/employees/handlers/UpdateEmployeeHandler');
const DeleteEmployeeHandler = require('./application/employees/handlers/DeleteEmployeeHandler');

// Controllers
const CafeController = require('./api/controllers/CafeController');
const EmployeeController = require('./api/controllers/EmployeeController');

function buildContainer() {
  const container = createContainer({ injectionMode: InjectionMode.PROXY });

  // Database
  container.register({ db: asValue(db) });

  // Repositories (singletons)
  container.register({
    cafeRepository: asClass(CafeRepository, { lifetime: Lifetime.SINGLETON }),
    employeeRepository: asClass(EmployeeRepository, { lifetime: Lifetime.SINGLETON }),
  });

  // Handlers (transient — new instance per resolution)
  container.register({
    getCafesHandler: asClass(GetCafesHandler, { lifetime: Lifetime.TRANSIENT }),
    createCafeHandler: asClass(CreateCafeHandler, { lifetime: Lifetime.TRANSIENT }),
    updateCafeHandler: asClass(UpdateCafeHandler, { lifetime: Lifetime.TRANSIENT }),
    deleteCafeHandler: asClass(DeleteCafeHandler, { lifetime: Lifetime.TRANSIENT }),
    getEmployeesHandler: asClass(GetEmployeesHandler, { lifetime: Lifetime.TRANSIENT }),
    createEmployeeHandler: asClass(CreateEmployeeHandler, { lifetime: Lifetime.TRANSIENT }),
    updateEmployeeHandler: asClass(UpdateEmployeeHandler, { lifetime: Lifetime.TRANSIENT }),
    deleteEmployeeHandler: asClass(DeleteEmployeeHandler, { lifetime: Lifetime.TRANSIENT }),
  });

  // Build and wire the Mediator with all handlers
  const mediator = new Mediator();
  const cradle = container.cradle;

  mediator.register('GetCafesQuery', cradle.getCafesHandler);
  mediator.register('CreateCafeCommand', cradle.createCafeHandler);
  mediator.register('UpdateCafeCommand', cradle.updateCafeHandler);
  mediator.register('DeleteCafeCommand', cradle.deleteCafeHandler);
  mediator.register('GetEmployeesQuery', cradle.getEmployeesHandler);
  mediator.register('CreateEmployeeCommand', cradle.createEmployeeHandler);
  mediator.register('UpdateEmployeeCommand', cradle.updateEmployeeHandler);
  mediator.register('DeleteEmployeeCommand', cradle.deleteEmployeeHandler);

  container.register({ mediator: asValue(mediator) });

  // Controllers (singletons)
  container.register({
    cafeController: asClass(CafeController, { lifetime: Lifetime.SINGLETON }),
    employeeController: asClass(EmployeeController, { lifetime: Lifetime.SINGLETON }),
  });

  return container;
}

module.exports = buildContainer;
