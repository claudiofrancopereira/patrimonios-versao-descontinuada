import Knex from 'knex';

export async function up(knex: Knex) {
    
    return knex.schema.createTable( 'images_patrimonio', table => {
        table.increments('id').primary();
        table.integer('id_patrimonio')
            .notNullable()
            .references('id')
            .inTable('patrimonios');
        table.string('image_url');
        table.timestamp('criado_em', {useTz: true}).defaultTo(knex.fn.now());
    });

};

export async function down(knex: Knex) {
    return knex.schema.dropTable('images_patrimonio');
};