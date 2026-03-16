/**
 * Initial database schema migration
 */
exports.up = async function (knex) {
  // Create cafes table
  await knex.schema.createTable('cafes', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name', 255).notNullable();
    table.text('description').notNullable();
    table.string('logo', 500).nullable();
    table.string('location', 255).notNullable();
    table.timestamps(true, true);
  });

  // Create employees table with cafe assignment embedded (1-to-1 relationship)
  await knex.schema.createTable('employees', (table) => {
    table.string('id', 10).primary();
    table.string('name', 255).notNullable();
    table.string('email_address', 255).notNullable().unique();
    table.string('phone_number', 8).notNullable();
    table.string('gender', 10).notNullable();
    table.uuid('cafe_id').notNullable().references('id').inTable('cafes').onDelete('CASCADE');
    table.date('start_date').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('employees');
  await knex.schema.dropTableIfExists('cafes');
};
