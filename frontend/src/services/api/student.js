import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const studentService = {
  async getAll() {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.get(`${API_URL}/students`, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
  },

  async getById(id) {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.get(`${API_URL}/students/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
  },

  async create(studentData) {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.post(`${API_URL}/students`, studentData, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
  },

  async update(id, studentData) {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.put(`${API_URL}/students/${id}`, studentData, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
  },

  async delete(id) {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.delete(`${API_URL}/students/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
  }
};