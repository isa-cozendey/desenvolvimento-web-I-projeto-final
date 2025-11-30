import React, { useState, useEffect } from 'react';
import './LivroForm.css';

const LivroForm = ({ livro, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        titulo: '', autor: '', ano: '', editora: ''
    });
    // NOVO: Estado para armazenar o ficheiro
    const [imagemArquivo, setImagemArquivo] = useState(null);

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
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // NOVO: Handler de ficheiro
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImagemArquivo(e.target.files[0]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // NOVO: Usamos FormData para enviar ficheiro
        const dadosEnvio = new FormData();
        dadosEnvio.append('titulo', formData.titulo);
        dadosEnvio.append('autor', formData.autor);
        dadosEnvio.append('ano', formData.ano);
        dadosEnvio.append('editora', formData.editora);
        
        if (imagemArquivo) {
            dadosEnvio.append('imagem', imagemArquivo);
        }

        onSubmit(dadosEnvio);
    };

    return (
        <div className="livro-form-overlay">
            <div className="livro-form-container">
                <h2>{livro ? 'Editar Livro' : 'Novo Livro'}</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="input-group">
                        <label htmlFor="titulo">Título *</label>
                        <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="autor">Autor *</label>
                        <input type="text" name="autor" value={formData.autor} onChange={handleChange} required />
                    </div>

                    {/* NOVO: Input de Imagem */}
                    <div className="input-group">
                        <label htmlFor="imagem">Capa do Livro</label>
                        <input type="file" name="imagem" accept="image/*" onChange={handleFileChange} />
                        {livro && livro.imagem_capa && !imagemArquivo && (
                            <small style={{display: 'block', marginTop: '5px', color: '#666'}}>
                                Capa atual salva. Envia outra para trocar.
                            </small>
                        )}
                    </div>

                    <div className="input-group">
                        <label htmlFor="ano">Ano *</label>
                        <input type="number" name="ano" value={formData.ano} onChange={handleChange} required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="editora">Editora</label>
                        <input type="text" name="editora" value={formData.editora} onChange={handleChange} />
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onCancel} className="btn btn-secondary">Cancelar</button>
                        <button type="submit" className="btn btn-success">{livro ? 'Atualizar' : 'Criar'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default LivroForm;