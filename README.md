# 🎧 Clon de Spotify

Este proyecto es una implementación de un clon de Spotify, desarrollado como parte de un proyecto guiado. Utilizando Angular en el frontend y Node.js en el backend, el objetivo fue recrear una interfaz similar a la de Spotify con funcionalidades esenciales como reproducción de canciones, control de volumen y gestión de listas de reproducción.

## 🚀 Características

- **Reproducción de música**: Escucha canciones en tiempo real.
- **Control de volumen**: Ajusta el volumen durante la reproducción.
- **Gestión de playlists**: Crea, edita y elimina listas de reproducción personalizadas.
- **Búsqueda de canciones**: Encuentra tus canciones favoritas fácilmente.
- **Autenticación de usuarios**: Regístrate e inicia sesión para una experiencia personalizada.

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Angular, HTML5, CSS3, TypeScript
- **Backend**: Node.js, Express.js
- **Base de Datos**: MongoDB
- **Control de Versiones**: Git

## 📥 Instalación

### 1. Clonar el repositorio

   ```bash
   git clone https://github.com/JavierSanApa/Spotify.git
   cd Spotify
  ```

### 2. Instalar dependencias
- **Backend**
```bash
  cd node-api-tracks-master
  npm install
```
- **Frontend**
```bash
  cd ../spotify
  npm install
```

### 3. Configurar variables de entorno
En la carpeta node-api-tracks-master, crea un archivo .env con las siguientes variables:
```bash
  PORT=3000
  DB_URI=mongodb://localhost:27017/spotify-clone
  JWT_SECRET=tu_secreto_jwt
```

### 4. Iniciar el servidor backend
```bash
  cd node-api-tracks-master
  npm start
```

### 5. Iniciar la aplicación frontend
```bash
  cd ../spotify
  ng serve
```

📝 Documentación
Para más detalles sobre la arquitectura y funcionalidades del proyecto, consulta el archivo Documentación Spotify.pdf incluido en este repositorio.

## 📌 Estado del proyecto
Actualmente, el proyecto está en fase de desarrollo/mejoras. Se planea agregar nuevas funcionalidades en el futuro.

## 📜 Licencia
Este proyecto es de código abierto bajo la licencia MIT.

## 🤝 Contacto
Si tienes preguntas o sugerencias, puedes contactarme en javisncz2000@gmail.com
