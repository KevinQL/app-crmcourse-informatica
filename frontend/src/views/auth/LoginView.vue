<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <h2>Iniciar Sesión</h2>
      
      <div class="form-group">
        <label for="username">Usuario:</label>
        <input 
          type="text" 
          id="username"
          v-model="username"
          required
          autocomplete="username"
        >
      </div>

      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input 
          type="password" 
          id="password"
          v-model="password"
          required
          autocomplete="current-password"
        >
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Cargando...' : 'Iniciar Sesión' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/auth/useAuth';

const router = useRouter();
const { login, error, loading } = useAuth();

const username = ref('');
const password = ref('');

async function handleLogin() {
  try {
    await login(username.value, password.value);
    router.push('/admin/profile');
  } catch (err) {
    console.error('Error de login:', err);
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.login-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
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

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
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
</style>