import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const listarMatriculas = () => {
  return axios.get(`${API_URL}/matriculas`);
};

export const criarMatricula = (dados) => {
  return axios.post(`${API_URL}/matriculas`, dados);
};

export const buscarMatricula = (id) => {
  return axios.get(`${API_URL}/matriculas/${id}`);
};

export const removerMatricula = (id) => {
  return axios.delete(`${API_URL}/matriculas/${id}`);
};
