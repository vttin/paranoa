import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const listarCursos = () => {
  return axios.get(`${API_URL}/cursos`);
};

export const criarCurso = (dados) => {
  return axios.post(`${API_URL}/cursos`, dados);
};

export const buscarCurso = (id) => {
  return axios.get(`${API_URL}/cursos/${id}`);
};

export const editarCurso = (id, dados) => {
  return axios.put(`${API_URL}/cursos/${id}`, dados);
};

export const removerCurso = (id) => {
  return axios.delete(`${API_URL}/cursos/${id}`);
};
