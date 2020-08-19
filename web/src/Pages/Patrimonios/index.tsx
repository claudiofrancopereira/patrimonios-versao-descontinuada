import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import api from '../../services/api';

import './styles.css';

const Patrimonios = () => {
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0]);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0,0]);
    const [uploadImages, setUploadImages] = useState<FileList | null>(null);

    const [formData, setFormData] = useState({
        nome: '',
        endereco: '', 
        observacoes: '',
        criado_por: 'claudio'
    });  

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const data = new FormData();
        
        const { nome, endereco, observacoes, criado_por} = formData;
        const [latitude, longitude] = selectedPosition;

        if (nome.length < 3) {
            alert('Nome de patrimônio inválido!');
            document.getElementById('nome')?.focus();
        } 
        
        else if (endereco.length < 3) {
            alert('Endereço inválido!');
            document.getElementById('endereco')?.focus();
        }
        
        else {

            data.append('nome', nome);
            data.append('endereco', endereco);
            data.append('observacoes', observacoes);
            data.append('criado_por', criado_por);
            data.append('latitude', String(latitude));
            data.append('longitude', String(longitude));

            if (uploadImages) {
                for( let i = 0; i < uploadImages.length; i++) {
                    data.append('images', uploadImages[i]);
                };
            };

            await api.post('patrimonios', data);

            alert('Patrimonio criado!');

            document.forms[0].reset();
            
            setFormData({ 
                nome: '',
                endereco: '',
                observacoes: '',
                criado_por: 'claudio'
            });

            document.getElementById('nome')?.focus();
            
            setSelectedPosition([initialPosition[0], initialPosition[1]]);
        };
    
    };

    useEffect( () => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;

            setInitialPosition([latitude, longitude]);
            setSelectedPosition([latitude, longitude]);
        });
    }, []);

    function handleMapClick(event: LeafletMouseEvent) {
        setSelectedPosition([event.latlng.lat, event.latlng.lng]);
    };

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    };

    function handleTextAreaChange( event: ChangeEvent<HTMLTextAreaElement>) {
        const { value } = event.target;

        setFormData({ ...formData, observacoes: value });
      
    };
    
    return (
        
        <div id="page-create">
            <header>
                <Link to="/">
                    <FiArrowLeft />
                </Link>

                <h1>Cadastro de Patrimônio</h1>
            </header>
            
            <form onSubmit={handleSubmit}  encType="multipart/form-data">
                <fieldset>
                    <legend>
                        <h2>Patrimônio</h2>
                    </legend>

                    <div className="field">
                        <input
                            type="text"
                            placeholder="PRAÇA MARCÍLIO DIAS PEREIRA"
                            name="nome"
                            id="nome"
                            onChange={handleInputChange}
                        />
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                    </legend>

                    <div className="field">
                        
                        <input
                            type="text"
                            placeholder="RUA APARECIDA DO TABOADO X RUA ATLÂNTIDA"
                            name="endereco"
                            id="endereco"
                            onChange={handleInputChange}
                        />
                    </div>
                    
                    <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={selectedPosition} />
                    </Map>

                    <div className="lat-long">
                        <div className="field">
                            <label htmlFor="latitude">Latitude</label>
                            <label htmlFor="latvalue">{selectedPosition[0]}</label>
                        </div>

                        <div className="field">
                            <label htmlFor="longitude">Longitude</label>
                            <label htmlFor="longvalue">{selectedPosition[1]}</label>
                        </div>
                    </div>
                    
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Imagem</h2>
                    </legend>
                    
                    <label id="imagem">
                        Nenhuma imagem
                        <input
                            onChange={(event) => {
                                setUploadImages(event.target.files)
                            }}
                            type="file"
                            name="images"
                            id="images"
                            multiple
                        
                            
                        />
                    </label>
                    
                </fieldset>
                
                <fieldset>
                    <legend>
                        <h2>Observações</h2>
                    </legend>

                    <div className="field">
                        <textarea 
                            name="observacoes" 
                            id="observacoes" 
                            onChange={handleTextAreaChange}
                        />
                    </div>
                </fieldset>

                <button type="submit">
                    Cadastrar Patrimônio
                </button>
            </form>
        </div>
    );
};

export default Patrimonios;
