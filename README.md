# Sistema de Gestión de Estudiantes - Curso de Ofimática

## Descripción
Sistema web para gestionar estudiantes y asistencias de un curso de ofimática. Desarrollado con Vue 3 (Composition API) en el frontend y Node.js con Express y MySQL en el backend.

## Estructura del Proyecto
- `frontend/`: Aplicación Vue 3 con Vite
- `backend/`: API REST con Node.js y Express

## Características Implementadas

### Sistema de Autenticación
- Login para administradores
- Gestión de perfil de administrador
- JWT para autenticación
- Rutas protegidas

## Credenciales por Defecto
```
Usuario: admin
Contraseña: admin123
Email: admin@example.com
```

## Requisitos
- Node.js y npm
- MySQL (XAMPP)
- Vue.js 3
- Git

## Configuración del Proyecto

### Base de Datos
1. Iniciar MySQL en XAMPP
2. Crear base de datos `curso_ofimatica`

### Backend
1. Navegar al directorio backend:
```bash
cd backend
```

2. Instalar dependencias:
```bash
npm install
```

3. Crear archivo .env con las variables de entorno:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=curso_ofimatica
JWT_SECRET=tu_secreto_seguro_para_jwt
PORT=3000
```

4. Iniciar el servidor:
```bash
npm run dev
```

### Frontend
1. Navegar al directorio frontend:
```bash
cd frontend
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

## Próximas Funcionalidades
- [ ] Gestión de estudiantes (CRUD)
- [ ] Registro de asistencias (sábados y domingos)
- [ ] Reportes y estadísticas
- [ ] Dashboard administrativo

## Tecnologías Utilizadas
- Frontend:
  - Vue 3 (Composition API)
  - Vue Router
  - Axios
  - Vite
- Backend:
  - Node.js
  - Express
  - Sequelize (ORM)
  - MySQL
  - JWT
  - bcrypt
