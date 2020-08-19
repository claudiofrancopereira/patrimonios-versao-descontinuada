import express from 'express';
import multer from 'multer';

import PatrimoniosController from './controllers/PatrimoniosController';
import OcorrenciasController from './controllers/OcorrenciasController';
import multerConfig from './config/multer';

const routes = express.Router();
const upload = multer(multerConfig);

const patrimoniosController = new PatrimoniosController();
const ocorrenciasController = new OcorrenciasController();

routes.post( '/patrimonios', upload.array('images'), patrimoniosController.create);
routes.get( '/patrimonios', patrimoniosController.index );
routes.get( '/patrimonios/:id', patrimoniosController.show );

routes.post('/ocorrencias', ocorrenciasController.create );

/*routes.get('/patrimonios', async (request, response) => {
    const patrimonios = await knex('patrimonios').select('*');

    const serializedPatrimonios = patrimonios.map( patrimonio => {
        return {
            nome: patrimonio.nome,
        }
    })

    return response.json(patrimonios);
});*/

export default routes;
