/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .withSchema("unbound")
    .createTableIfNotExists("users", (table) => {
      table.increments(); // id primary key
      table.uuid("uuid").notNullable().defaultTo(knex.fn.uuid()); // uuid v4
      table.string("userName").notNullable(); // username
      table.timestamp("creation_ts").notNullable().defaultTo(knex.fn.now()); // creation date and time
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTable("users");
};
