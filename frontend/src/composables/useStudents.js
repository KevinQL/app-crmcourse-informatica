import { ref } from 'vue';
import { studentService } from '../services/api/student';

export function useStudents() {
  const students = ref([]);
  const currentStudent = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const fetchStudents = async () => {
    try {
      loading.value = true;
      error.value = null;
      const response = await studentService.getAll();
      students.value = response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al cargar estudiantes';
      console.error('Error:', err);
    } finally {
      loading.value = false;
    }
  };

  const getStudent = async (id) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await studentService.getById(id);
      currentStudent.value = response.data;
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al obtener estudiante';
      console.error('Error:', err);
    } finally {
      loading.value = false;
    }
  };

  const createStudent = async (studentData) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await studentService.create(studentData);
      students.value.push(response.data);
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al crear estudiante';
      console.error('Error:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateStudent = async (id, studentData) => {
    try {
      loading.value = true;
      error.value = null;
      await studentService.update(id, studentData);
      const index = students.value.findIndex(s => s.id === id);
      if (index !== -1) {
        students.value[index] = { ...students.value[index], ...studentData };
      }
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al actualizar estudiante';
      console.error('Error:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteStudent = async (id) => {
    try {
      loading.value = true;
      error.value = null;
      await studentService.delete(id);
      students.value = students.value.filter(s => s.id !== id);
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al eliminar estudiante';
      console.error('Error:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    students,
    currentStudent,
    loading,
    error,
    fetchStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent
  };
}