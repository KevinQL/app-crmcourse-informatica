import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const authService = {
  async login(username, password) {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password
    });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  async getProfile() {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.get(`${API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
  },

  async updateProfile(profileData) {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.put(
      `${API_URL}/auth/profile`,
      profileData,
      {
        headers: { Authorization: `Bearer ${user.token}` }
      }
    );
    return response.data;
  },

  logout() {
    localStorage.removeItem('user');
  }
};