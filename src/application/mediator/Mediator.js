/**
 * Mediator - Routes commands and queries to their registered handlers.
 * Pairs with awilix DI container (Autofac equivalent) for handler resolution.
 */
class Mediator {
  constructor() {
    this._handlers = new Map();
  }

  /**
   * Register a handler for a specific command/query class name
   * @param {string} commandName - The constructor name of the command/query
   * @param {Object} handler - Handler instance with a handle(command) method
   */
  register(commandName, handler) {
    this._handlers.set(commandName, handler);
  }

  /**
   * Dispatch a command or query to its registered handler
   * @param {Object} command - Command or Query instance
   * @returns {Promise<any>} Result from the handler
   */
  async send(command) {
    const handlerName = command.constructor.name;
    const handler = this._handlers.get(handlerName);

    if (!handler) {
      throw new Error(`No handler registered for: ${handlerName}`);
    }

    return handler.handle(command);
  }
}

module.exports = Mediator;
