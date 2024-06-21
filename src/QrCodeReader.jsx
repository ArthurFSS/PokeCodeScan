import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';

const QrCodeReader = () => {
  const [data, setData] = useState({ msg: 'Nenhum código', codigo: '', sucesso: null });
  const [processingScan, setProcessingScan] = useState(false);
  const [colecao, setColecao] = useState('');
  const [facingMode, setFacingMode] = useState("environment"); // Estado para armazenar a facingMode
  const url = 'http://localhost:5010/';

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
          msg: 'Código já cadastrado',
          codigo: request.codigo,
          sucesso: false
        });
      })
      .finally(() => {
        setTimeout(() => setProcessingScan(false), 2000);
      });
  };

  const handleColecaoChange = (event) => {
    setColecao(event.target.value);
  };

  const toggleCamera = () => {
    setFacingMode((prevMode) => (prevMode === "environment" ? "user" : "environment"));
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
      <button onClick={toggleCamera}>
        Mudar para a câmera {facingMode === "environment" ? "frontal" : "traseira"}
      </button>
      <QrReader
        onResult={(result, _, codeReader) => {
          if (!codeReader.processingScan && result) {
            codeReader.processingScan = true;
            handleScan(result).finally(() => {
              setTimeout(() => (codeReader.processingScan = false), 2000);
            });
          }
        }}
        constraints={{
          video: {
            facingMode: { exact: facingMode },
          },
        }}
        style={{ width: '100%' }}
      />
      <p style={msgStyle}>{data.msg}</p>
      <p style={codigoStyle}>{data.codigo}</p>
    </div>
  );
};

export default QrCodeReader;
