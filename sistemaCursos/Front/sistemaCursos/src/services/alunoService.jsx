import axios from 'axios';

const API_URL = 'http://localhost:3001'; // Porta do seu backend Node.js

export const listarAlunos = () => {
  return axios.get(`${API_URL}/alunos`);
};

export const criarAluno = (dados) => {
  return axios.post(`${API_URL}/alunos`, dados);
};

export const buscarAluno = (id) => {
  return axios.get(`${API_URL}/alunos/${id}`);
};

export const editarAluno = (id, dados) => {
  return axios.put(`${API_URL}/alunos/${id}`, dados);
};

export const removerAluno = (id) => {
  return axios.delete(`${API_URL}/alunos/${id}`);
};
