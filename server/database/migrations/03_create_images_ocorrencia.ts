import Knex from 'knex';

export async function up(knex: Knex) {
    
    return knex.schema.createTable( 'images_ocorrencia', table => {
        table.increments('id').primary();
        table.integer('numero_ocorrencia')
            .notNullable()
            .references('id')
            .inTable('ocorrencias');
        table.string('image_url');
        table.timestamp('criado_em', {useTz: true}).defaultTo(knex.fn.now());
    });

};

export async function down(knex: Knex) {
    return knex.schema.dropTable('images_ocorrencia');
};