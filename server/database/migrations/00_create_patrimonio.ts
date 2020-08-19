import Knex from 'knex';

export async function up(knex: Knex) {
    
    return knex.schema.createTable( 'patrimonios', table => {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('endereco').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('observacoes').notNullable();
        table.string('criado_por').notNullable();
        table.timestamp('criado_em', {useTz: true}).defaultTo(knex.fn.now());
    });

};

export async function down(knex: Knex) {
    return knex.schema.dropTable('patrimonios');
};