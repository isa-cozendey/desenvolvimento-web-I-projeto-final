import React, { useState, useEffect } from 'react';
import './LivroForm.css';

const LivroForm = ({ livro, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        titulo: '',
        autor: '',
        ano: '',
        editora: ''
    });

    useEffect(() => {
        if (livro) {
            setFormData({
                titulo: livro.titulo || '',
                autor: livro.autor || '',
                ano: livro.ano || '',
                editora: livro.editora || ''
            });
        }
    }, [livro]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="livro-form-overlay">
            <div className="livro-form-container">
                <h2>{livro ? 'Editar Livro' : 'Novo Livro'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="titulo">Título *</label>
                        <input
                            type="text"
                            id="titulo"
                            name="titulo"
                            value={formData.titulo}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="autor">Autor *</label>
                        <input
                            type="text"
                            id="autor"
                            name="autor"
                            value={formData.autor}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="ano">Ano *</label>
                        <input
                            type="number"
                            id="ano"
                            name="ano"
                            value={formData.ano}
                            onChange={handleChange}
                            required
                            min="1000"
                            max="9999"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="editora">Editora</label>
                        <input
                            type="text"
                            id="editora"
                            name="editora"
                            value={formData.editora}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onCancel} className="btn btn-secondary">
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-success">
                            {livro ? 'Atualizar' : 'Criar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LivroForm;
