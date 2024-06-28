import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Estoque = () => {
    const [codigos, setCodigos] = useState([]);
    const [email, setEmail] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [colecaoSelecionada, setColecaoSelecionada] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    //const url = 'http://localhost:5010/';
    const url = 'https://app.noida.tech/';

    useEffect(() => {
        fetchCodigos();
    }, []);

    const fetchCodigos = () => {
        fetch(url + 'codigos')
            .then(response => response.json())
            .then(data => setCodigos(data))
            .catch(error => console.error('Erro ao buscar dados:', error));
    };

    const handleEnviarCodigos = () => {
        const request = {
            quantidade: parseInt(quantidade),
            colecao: colecaoSelecionada,
            email: email
        };

        setIsLoading(true); // Ativar o loader

        axios.post(url + 'codigos/EnviarCodigos', request)
            .then(response => {
                console.log(response.data);
                // Exibir mensagem de sucesso ou erro, se necessário

                // Limpar campos após o envio bem-sucedido
                setEmail('');
                setQuantidade('');
                setColecaoSelecionada('');
                fetchCodigos();
            })
            .catch(error => {
                console.error('Erro ao enviar códigos:', error);
                // Exibir mensagem de erro, se necessário
            })
            .finally(() => {
                setIsLoading(false); // Desativar o loader após a requisição
            });
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleQuantidadeChange = (event) => {
        setQuantidade(event.target.value);
    };

    const handleColecaoChange = (event) => {
        setColecaoSelecionada(event.target.value);
    };

    return (
        <div>
            <h1>Estoque</h1>
            {isLoading && <div style={loaderStyle}>Enviando...</div>}
            {!isLoading && (
                <>
                    <div>
                        <label htmlFor="emailInput">E-mail:</label>
                        <input
                            type="email"
                            id="emailInput"
                            value={email}
                            onChange={handleEmailChange}
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label htmlFor="quantidadeInput">Quantidade:</label>
                        <input
                            type="number"
                            id="quantidadeInput"
                            value={quantidade}
                            onChange={handleQuantidadeChange}
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label htmlFor="colecaoSelect">Coleção:</label>
                        <select
                            id="colecaoSelect"
                            value={colecaoSelecionada}
                            onChange={handleColecaoChange}
                            style={inputStyle}
                        >
                            <option value="">Selecione uma coleção</option>
                            {codigos.map((codigo, index) => (
                                <option key={index} value={codigo.colecao}>{codigo.colecao}</option>
                            ))}
                        </select>
                    </div>
                    <button onClick={handleEnviarCodigos}>Enviar Códigos</button>
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th style={thTdStyle}>Coleção</th>
                                <th style={thTdStyle}>Quantidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {codigos.map((codigo, index) => (
                                <tr key={index}>
                                    <td style={thTdStyle}>{codigo.colecao}</td>
                                    <td style={thTdStyle}>{codigo.quantidade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

// Estilos CSS em JavaScript
const inputStyle = {
    marginBottom: '10px',
    padding: '8px',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box'
};

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px'
};

const thTdStyle = {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
};

const loaderStyle = {
    fontSize: '20px',
    textAlign: 'center',
    margin: '20px'
};

export default Estoque;