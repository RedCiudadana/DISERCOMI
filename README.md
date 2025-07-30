# DISERCOMI - Plataforma de Gestión de Trámites Exportadores

## 📋 Descripción

DISERCOMI es una plataforma web moderna desarrollada en React y TypeScript que permite la gestión digital de trámites de exportación. La aplicación facilita a las empresas guatemaltecas realizar sus trámites de comercio exterior de manera eficiente y transparente.

## 🚀 Funcionalidades Principales

### 👤 Gestión de Usuarios
- **Registro y Autenticación**: Sistema de registro e inicio de sesión seguro
- **Perfiles de Usuario**: Gestión de perfiles con diferentes roles (usuario, administrador)
- **Rutas Protegidas**: Acceso controlado basado en roles de usuario

### 📝 Gestión de Trámites
- **Solicitud Digital**: Formularios en línea para diferentes tipos de trámites
- **Seguimiento en Tiempo Real**: Consulta del estado de trámites las 24 horas
- **Validación Automática**: Verificación con instituciones públicas (SAT, RENAP, Registro Mercantil)
- **Filtros y Búsqueda**: Búsqueda avanzada por tipo de trámite y estado

### 🏢 Tipos de Trámites Disponibles
- **Inscripción como Exportador**: Registro de empresas como exportadoras
- **Certificado de Origen**: Certificados para bienes exportados bajo acuerdos comerciales
- **Licencia de Exportación**: Licencias para productos regulados

### 📊 Panel de Administración
- **Dashboard Administrativo**: Vista general de trámites y estadísticas
- **Bitácora de Logs**: Registro detallado de actividades del sistema
- **Gestión de Expedientes**: Administración completa de expedientes de trámites

### 🛠️ Herramientas de Soporte
- **Chatbot Integrado**: Asistencia automática para usuarios
- **Centro de Documentación**: Documentación completa de procesos
- **Centro de Soporte**: Sistema de ayuda y soporte técnico
- **Botón de Feedback**: Recopilación de comentarios de usuarios

### 📱 Características Técnicas
- **Interfaz Responsiva**: Diseño adaptativo para todos los dispositivos
- **Navegación Intuitiva**: Interfaz moderna con Tailwind CSS
- **Carga Virtualizada**: Optimización para grandes listas de datos
- **Exportación de Datos**: Funcionalidad para exportar información en Excel

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18**: Biblioteca de interfaz de usuario
- **TypeScript**: Tipado estático para mayor robustez
- **Vite**: Herramienta de construcción rápida
- **React Router**: Navegación entre páginas
- **Tailwind CSS**: Framework de estilos utilitarios
- **Lucide React**: Iconografía moderna

### Backend y Base de Datos
- **API propia o servicios externos**

### Herramientas de Desarrollo
- **ESLint**: Linting de código JavaScript/TypeScript
- **PostCSS**: Procesamiento de CSS
- **Autoprefixer**: Compatibilidad de navegadores

## 📦 Instalación

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn
- Git

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/DISERCOMI.git
   cd DISERCOMI
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configurar variables de entorno**
   Si es necesario, crea un archivo `.env.local` y agrégalas según tus necesidades.

4. **Ejecutar el proyecto en modo desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

## 🚀 Comandos Disponibles

### Desarrollo
```bash
# Ejecutar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de la construcción
npm run preview

# Ejecutar linter
npm run lint
```

### Construcción y Despliegue
```bash
# Construir la aplicación
npm run build

# Vista previa de la construcción local
npm run preview
```

## 📁 Estructura del Proyecto

```
DISERCOMI/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── auth/           # Componentes de autenticación
│   │   ├── layout/         # Componentes de layout
│   │   ├── ui/             # Componentes de interfaz
│   │   └── expediente/     # Componentes específicos
│   ├── context/            # Contextos de React
│   ├── pages/              # Páginas de la aplicación
│   │   ├── admin/          # Páginas administrativas
│   │   ├── auth/           # Páginas de autenticación
│   │   ├── procedures/     # Páginas de trámites
│   │   ├── docs/           # Páginas de documentación
│   │   └── legal/          # Páginas legales
│   ├── services/           # Servicios de API
│   └── types/              # Definiciones de TypeScript
└── public/                 # Archivos estáticos
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o preguntas sobre el proyecto:
- 📧 Email: soporte@disercomi.gt
- 📱 Teléfono: +502 XXXX-XXXX
- 🌐 Sitio web: https://disercomi.gt

## 🚀 Despliegue

### Producción
```bash
# Construir para producción
npm run build

# Los archivos generados estarán en dist/
```

---

**Desarrollado con ❤️ para DISERCOMI**
