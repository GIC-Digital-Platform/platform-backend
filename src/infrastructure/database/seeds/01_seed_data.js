/**
 * Seed data for cafes and employees
 */
exports.seed = async function (knex) {
  // Clean existing data in correct order
  await knex('cafe_employees').del();
  await knex('employees').del();
  await knex('cafes').del();

  // Insert cafes
  const cafes = await knex('cafes')
    .insert([
      {
        id: 'a1b2c3d4-0001-0001-0001-000000000001',
        name: 'The Daily Grind',
        description: 'Artisan coffee and fresh pastries in the heart of Orchard.',
        logo: null,
        location: 'Orchard',
      },
      {
        id: 'a1b2c3d4-0002-0002-0002-000000000002',
        name: 'Bay Brews',
        description: 'Specialty brews with a stunning Marina Bay view.',
        logo: null,
        location: 'Marina Bay',
      },
      {
        id: 'a1b2c3d4-0003-0003-0003-000000000003',
        name: 'Bugis Beans',
        description: 'Cozy neighbourhood cafe serving single-origin coffees.',
        logo: null,
        location: 'Downtown Core',
      },
      {
        id: 'a1b2c3d4-0004-0004-0004-000000000004',
        name: 'East Coast Espresso',
        description: 'Beach-side cafe with cold brews and all-day brunch.',
        logo: null,
        location: 'Tampines',
      },
    ])
    .returning('id');

  // Insert employees
  await knex('employees').insert([
    { id: 'UIAB1CD23', name: 'Alice Tan', email_address: 'alice.tan@example.com', phone_number: '91234567', gender: 'Female' },
    { id: 'UIBC2DE34', name: 'Bob Lim', email_address: 'bob.lim@example.com', phone_number: '82345678', gender: 'Male' },
    { id: 'UICD3EF45', name: 'Carol Wong', email_address: 'carol.wong@example.com', phone_number: '93456789', gender: 'Female' },
    { id: 'UIDE4FG56', name: 'David Ng', email_address: 'david.ng@example.com', phone_number: '84567890', gender: 'Male' },
    { id: 'UIEF5GH67', name: 'Eve Koh', email_address: 'eve.koh@example.com', phone_number: '95678901', gender: 'Female' },
    { id: 'UIFG6HI78', name: 'Frank Lee', email_address: 'frank.lee@example.com', phone_number: '86789012', gender: 'Male' },
    { id: 'UIGH7IJ89', name: 'Grace Chua', email_address: 'grace.chua@example.com', phone_number: '97890123', gender: 'Female' },
    { id: 'UIHI8JK90', name: 'Henry Ong', email_address: 'henry.ong@example.com', phone_number: '88901234', gender: 'Male' },
  ]);

  // Assign employees to cafes with start dates
  await knex('cafe_employees').insert([
    { employee_id: 'UIAB1CD23', cafe_id: 'a1b2c3d4-0001-0001-0001-000000000001', start_date: '2022-01-15' },
    { employee_id: 'UIBC2DE34', cafe_id: 'a1b2c3d4-0001-0001-0001-000000000001', start_date: '2022-06-01' },
    { employee_id: 'UICD3EF45', cafe_id: 'a1b2c3d4-0001-0001-0001-000000000001', start_date: '2023-03-20' },
    { employee_id: 'UIDE4FG56', cafe_id: 'a1b2c3d4-0002-0002-0002-000000000002', start_date: '2021-09-10' },
    { employee_id: 'UIEF5GH67', cafe_id: 'a1b2c3d4-0002-0002-0002-000000000002', start_date: '2022-11-05' },
    { employee_id: 'UIFG6HI78', cafe_id: 'a1b2c3d4-0003-0003-0003-000000000003', start_date: '2023-01-01' },
    { employee_id: 'UIGH7IJ89', cafe_id: 'a1b2c3d4-0003-0003-0003-000000000003', start_date: '2023-07-14' },
    { employee_id: 'UIHI8JK90', cafe_id: 'a1b2c3d4-0004-0004-0004-000000000004', start_date: '2024-02-28' },
  ]);
};
