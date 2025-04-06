<template>
  <div class="profile-container">
    <div class="profile-card">
      <h2>Perfil del Administrador</h2>
      
      <form @submit.prevent="handleSubmit" class="profile-form">
        <div class="form-group">
          <label for="firstName">Nombre:</label>
          <input 
            type="text" 
            id="firstName"
            v-model="profileData.firstName"
            required
          >
        </div>

        <div class="form-group">
          <label for="lastName">Apellidos:</label>
          <input 
            type="text" 
            id="lastName"
            v-model="profileData.lastName"
            required
          >
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input 
            type="email" 
            id="email"
            v-model="profileData.email"
            required
          >
        </div>

        <div class="form-group">
          <label for="phone">Teléfono:</label>
          <input 
            type="tel" 
            id="phone"
            v-model="profileData.phone"
          >
        </div>

        <div class="form-group">
          <label for="newPassword">Nueva Contraseña (opcional):</label>
          <input 
            type="password" 
            id="newPassword"
            v-model="profileData.password"
            autocomplete="new-password"
          >
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <div v-if="successMessage" class="success-message">
          {{ successMessage }}
        </div>

        <div class="button-group">
          <button type="submit" :disabled="loading" class="save-button">
            {{ loading ? 'Guardando...' : 'Guardar Cambios' }}
          </button>
          <button type="button" @click="handleLogout" class="logout-button">
            Cerrar Sesión
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/auth/useAuth';

const router = useRouter();
const { getProfile, updateProfile, logout, error, loading } = useAuth();
const successMessage = ref('');

const profileData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: ''
});

onMounted(async () => {
  try {
    const data = await getProfile();
    profileData.value = {
      ...data,
      password: '' // No mostrar la contraseña actual
    };
  } catch (err) {
    console.error('Error al cargar el perfil:', err);
  }
});

async function handleSubmit() {
  try {
    const dataToUpdate = { ...profileData.value };
    if (!dataToUpdate.password) {
      delete dataToUpdate.password;
    }
    
    await updateProfile(dataToUpdate);
    successMessage.value = 'Perfil actualizado correctamente';
    setTimeout(() => {
      successMessage.value = '';
    }, 3000);
  } catch (err) {
    console.error('Error al actualizar el perfil:', err);
  }
}

function handleLogout() {
  logout();
  router.push('/login');
}
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f5f5f5;
}

.profile-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}

.profile-form {
  margin-top: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.save-button, .logout-button {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.save-button {
  background-color: #4CAF50;
  color: white;
}

.logout-button {
  background-color: #dc3545;
  color: white;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-message {
  color: #dc3545;
  margin-bottom: 1rem;
  text-align: center;
}

.success-message {
  color: #4CAF50;
  margin-bottom: 1rem;
  text-align: center;
}
</style>