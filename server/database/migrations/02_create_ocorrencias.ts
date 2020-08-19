import Knex from 'knex';

export async function up(knex: Knex) {
    
    return knex.schema.createTable( 'ocorrencias', table => {
        table.increments('id').primary();
        table.integer('numero_patrimonio')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('patrimonios');
        table.integer('numero_bo');
        table.string('descricao').notNullable();
        table.string('incluido_por').notNullable();
        table.timestamp('criado_em', {useTz: true}).defaultTo(knex.fn.now());
    });
};

export async function down(knex: Knex) {
    return knex.schema.dropTable('ocorrencias');
};