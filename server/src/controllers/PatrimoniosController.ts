import { Request, Response } from 'express';
import db from '../../database/connection';
import fs from 'fs';
import path from 'path';

class PatrimoniosController {
    async create(request: Request, response: Response) {
        const {
            nome,
            endereco,
            latitude,
            longitude,
            observacoes,
            criado_por,
        } = request.body;
        
        const trx = await db.transaction();
        
        try {
            const [id] = await trx('patrimonios')
                .insert({
                    nome,
                    endereco,
                    latitude,
                    longitude,
                    observacoes,
                    criado_por
                })
                .returning('id');
            
            await trx.commit();

            fs.mkdir(path.resolve(__dirname, '..', '..', 'patrimonios',`${id}`), (err) => {
                if (err) { 
                    return console.error(err); 
                }
    
                const files = fs.readdirSync(path.resolve(__dirname, "..", "..", "tmp", "uploads"));

                files.forEach( file => {
                    console.log(file);
                    fs.rename(
                        path.resolve(__dirname, "..", "..", "tmp", "uploads", file), 
                        path.resolve(__dirname, "..", "..", "patrimonios", `${id}`, `${id}_` + file),
                        (err) => {
                            if (err) throw err;
                        }
                    );
                    
                });
            });

            return response.json(id)

        } catch {
            await trx.rollback();
            return response.status(400).json({
                error: 'Unexpected error creating patrimonio'
            });
        };
    };

    async index(request: Request, response: Response) {
        const patrimonios = await db('patrimonios').select('*');

        return response.json({ patrimonios });
    };

    async show(request: Request, response: Response) {
        const { id } = request.params;
        const patrimonio = await db('patrimonios').where('id', id);
        const images = await db('images_patrimonio')
            .where('id_patrimonio', id)
            .select('image_url');
        const ocorrencias = await db('ocorrencias')
            .where('numero_patrimonio', id )
            .select('id','numero_bo', 'descricao', 'incluido_por', 'criado_em');

        return response.json({ patrimonio, images, ocorrencias });
        
    };
    
};

export default PatrimoniosController;