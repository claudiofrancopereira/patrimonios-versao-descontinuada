import { Request, Response } from 'express';
import db from '../../database/connection';

class OcorrenciasController {
    async create(request: Request, response: Response) {
        
        const {
            numero_patrimonio,
            numero_bo,
            descricao,
            incluido_por,
        } = request.body;

        await db.raw('PRAGMA foreign_keys = ON');

        await db('ocorrencias').insert( {
            numero_patrimonio,
            numero_bo,
            descricao,
            incluido_por,
        });

        return response.json({ success: true });
    };
    
};

export default OcorrenciasController;