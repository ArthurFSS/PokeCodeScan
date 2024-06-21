import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';

const QrCodeReader = () => {
  const [data, setData] = useState({ msg: 'Nenhum código', codigo: '', sucesso: null });
  const [processingScan, setProcessingScan] = useState(false);
  const [colecao, setColecao] = useState(''); // Estado para armazenar o valor da coleção
  const url = 'http://localhost:5010/';

  const handleScan = async (result) => {
    if (result) {  
      const request = {
        codigo: result.text,
        colecao: colecao // Usando o valor do estado colecao aqui
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

  // Função para lidar com a mudança no campo de coleção
  const handleColecaoChange = (event) => {
    setColecao(event.target.value);
  };

  // Estilos inline para o campo de coleção
  const colecaoInputStyle = {
    marginBottom: '10px',
    padding: '8px',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box'
  };

  // Estilos inline para as mensagens
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
      {/* Campo de entrada para a coleção */}
      <input
        type="text"
        placeholder="Digite a coleção"
        value={colecao}
        onChange={handleColecaoChange}
        style={colecaoInputStyle}
      />
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
            facingMode: { exact: "environment" },
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
