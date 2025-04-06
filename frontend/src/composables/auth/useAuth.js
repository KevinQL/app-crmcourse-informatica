import { ref, computed } from 'vue';
import { authService } from '@/services/api/auth';

const user = ref(JSON.parse(localStorage.getItem('user')));
const error = ref(null);
const loading = ref(false);

export function useAuth() {
  const isAuthenticated = computed(() => !!user.value);

  const login = async (username, password) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await authService.login(username, password);
      user.value = response;
      return response;
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al iniciar sesión';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    authService.logout();
    user.value = null;
  };

  const getProfile = async () => {
    try {
      loading.value = true;
      error.value = null;
      const response = await authService.getProfile();
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al obtener el perfil';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateProfile = async (profileData) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await authService.updateProfile(profileData);
      return response;
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al actualizar el perfil';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    user,
    error,
    loading,
    isAuthenticated,
    login,
    logout,
    getProfile,
    updateProfile
  };
}