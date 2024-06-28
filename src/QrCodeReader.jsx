import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';

const QrCodeReader = () => {
  const [data, setData] = useState({ msg: 'Nenhum código', codigo: '', sucesso: null });
  const [processingScan, setProcessingScan] = useState(false);
  const [colecao, setColecao] = useState('');
  const [mostrarQrReader, setMostrarQrReader] = useState(false);

  //const url = 'http://localhost:5010/';
  const url = 'https://app.noida.tech/';

  const handleScan = async (result) => {
    if (result) {
      const request = {
        codigo: result.text,
        colecao: colecao 
      };

      if (!processingScan) {
        setProcessingScan(true);
        sendToApi(request);
      }
    }
  };

  const sendToApi = (request) => {
    axios.post(url + 'codigos', request)
      .then(response => {
        setData({
          msg: 'Código cadastrado com sucesso',
          codigo: request.codigo,
          sucesso: true
        });
      })
      .catch(error => {
        setData({
          msg: 'Código cadastrado com sucesso',
          codigo: request.codigo,
          sucesso: true
        });
      })
      .finally(() => {
        setTimeout(() => setProcessingScan(false), 2000);
      });
  };

  const handleColecaoChange = (event) => {
    setColecao(event.target.value);
  };

  const handleAbrirCameraClick = () => {
    if (colecao.trim() !== '') {
      setMostrarQrReader(true);
    } else {
      alert('Digite a coleção antes de abrir a câmera.');
    }
  };

  const colecaoInputStyle = {
    marginBottom: '10px',
    padding: '8px',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box'
  };

  const msgStyle = {
    color: data.sucesso ? 'green' : 'red',
    fontWeight: 'bold',
    fontSize: '18px'
  };

  const codigoStyle = {
    color: data.sucesso ? 'green' : 'red',
    fontSize: '16px'
  };

  return (
    <div>
      <h1>Leitor de Códigos</h1>
      <input
        type="text"
        placeholder="Digite a coleção"
        value={colecao}
        onChange={handleColecaoChange}
        style={colecaoInputStyle}
      />
      <button onClick={handleAbrirCameraClick}>Abrir Câmera</button>
      {mostrarQrReader && (
        <QrReader
          onResult={(result) => handleScan(result)}
          constraints={{
            facingMode: "environment"
          }}
          style={{ width: '100%' }}
        />
      )}
      <p style={msgStyle}>{data.msg}</p>
      <p style={codigoStyle}>{data.codigo}</p>
    </div>
  );
};

export default QrCodeReader;
