<template>
  <div class="students-container">
    <div class="header">
      <h1>Gestión de Estudiantes</h1>
      <button @click="showCreateForm = true" class="btn-primary">
        Nuevo Estudiante
      </button>
    </div>

    <div v-if="loading" class="loading">
      Cargando estudiantes...
    </div>

    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>

    <table v-else class="students-table">
      <thead>
        <tr>
          <th>DNI</th>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.id">
          <td>{{ student.dni }}</td>
          <td>{{ student.firstName }}</td>
          <td>{{ student.lastName }}</td>
          <td>{{ student.email }}</td>
          <td>{{ student.phone }}</td>
          <td>
            <span :class="['status', student.status]">
              {{ student.status === 'active' ? 'Activo' : 'Inactivo' }}
            </span>
          </td>
          <td>
            <button @click="editStudent(student)" class="btn-edit">
              Editar
            </button>
            <button @click="confirmDelete(student)" class="btn-delete">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal para crear/editar estudiante -->
    <div v-if="showCreateForm || editingStudent" class="modal">
      <div class="modal-content">
        <h2>{{ editingStudent ? 'Editar' : 'Nuevo' }} Estudiante</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="dni">DNI:</label>
            <input 
              type="text" 
              id="dni" 
              v-model="studentForm.dni"
              required
            >
          </div>

          <div class="form-group">
            <label for="firstName">Nombres:</label>
            <input 
              type="text" 
              id="firstName" 
              v-model="studentForm.firstName"
              required
            >
          </div>

          <div class="form-group">
            <label for="lastName">Apellidos:</label>
            <input 
              type="text" 
              id="lastName" 
              v-model="studentForm.lastName"
              required
            >
          </div>

          <div class="form-group">
            <label for="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              v-model="studentForm.email"
              required
            >
          </div>

          <div class="form-group">
            <label for="phone">Teléfono:</label>
            <input 
              type="tel" 
              id="phone" 
              v-model="studentForm.phone"
            >
          </div>

          <div class="form-group">
            <label for="status">Estado:</label>
            <select id="status" v-model="studentForm.status">
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
            </select>
          </div>

          <div class="button-group">
            <button type="submit" class="btn-primary">
              {{ editingStudent ? 'Actualizar' : 'Crear' }}
            </button>
            <button type="button" @click="closeForm" class="btn-secondary">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal de confirmación de eliminación -->
    <div v-if="showDeleteConfirm" class="modal">
      <div class="modal-content">
        <h2>Confirmar Eliminación</h2>
        <p>¿Estás seguro de que deseas eliminar a {{ deletingStudent?.firstName }} {{ deletingStudent?.lastName }}?</p>
        <div class="button-group">
          <button @click="handleDelete" class="btn-delete">Eliminar</button>
          <button @click="showDeleteConfirm = false" class="btn-secondary">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStudents } from '@/composables/useStudents';

const {
  students,
  loading,
  error,
  fetchStudents,
  createStudent,
  updateStudent,
  deleteStudent
} = useStudents();

const showCreateForm = ref(false);
const editingStudent = ref(null);
const showDeleteConfirm = ref(false);
const deletingStudent = ref(null);

const studentForm = ref({
  dni: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  status: 'active'
});

onMounted(() => {
  fetchStudents();
});

const resetForm = () => {
  studentForm.value = {
    dni: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    status: 'active'
  };
};

const editStudent = (student) => {
  editingStudent.value = student;
  studentForm.value = { ...student };
  showCreateForm.value = true;
};

const closeForm = () => {
  showCreateForm.value = false;
  editingStudent.value = null;
  resetForm();
};

const handleSubmit = async () => {
  try {
    if (editingStudent.value) {
      await updateStudent(editingStudent.value.id, studentForm.value);
    } else {
      await createStudent(studentForm.value);
    }
    closeForm();
    fetchStudents();
  } catch (err) {
    console.error('Error al guardar estudiante:', err);
  }
};

const confirmDelete = (student) => {
  deletingStudent.value = student;
  showDeleteConfirm.value = true;
};

const handleDelete = async () => {
  try {
    await deleteStudent(deletingStudent.value.id);
    showDeleteConfirm.value = false;
    deletingStudent.value = null;
  } catch (err) {
    console.error('Error al eliminar estudiante:', err);
  }
};
</script>

<style scoped>
.students-container {
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.students-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.students-table th,
.students-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.students-table th {
  background-color: #f8f9fa;
  font-weight: 600;
}

.status {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
}

.status.active {
  background-color: #d4edda;
  color: #155724;
}

.status.inactive {
  background-color: #f8d7da;
  color: #721c24;
}

.btn-primary {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.btn-edit {
  background-color: #ffc107;
  color: #000;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin-right: 0.5rem;
  cursor: pointer;
}

.btn-delete {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.error-message {
  color: #dc3545;
  text-align: center;
  padding: 1rem;
}
</style>