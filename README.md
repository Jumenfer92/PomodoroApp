README.txt

==============================
Pomodoro Timer - React + Vite
==============================

Descripción:
-------------
Esta aplicación es un temporizador Pomodoro desarrollado con React y Vite. Permite alternar automáticamente entre ciclos de trabajo y descanso. El tiempo por defecto es de 25 minutos para trabajo y 5 minutos para descanso, con notificación sonora al cambiar de fase.

Características:
----------------
- Temporizador de cuenta regresiva con formato MM:SS.
- Inicio, pausa y reinicio del temporizador.
- Cambio manual entre fase de trabajo y descanso.
- Sonido de alarma al finalizar cada fase.
- Estilos personalizados con variables CSS.

Estructura del Proyecto:
------------------------
- src/
  └── App.jsx         # Componente principal con toda la lógica del temporizador
  └── index.css       # Estilos globales y variables CSS
- public/
  └── alarm.mp3       # Archivo de sonido reproducido al cambiar de fase

Instalación:
------------
1. Clona este repositorio:
   git clone <url-del-repo>

2. Instala las dependencias:
   npm install

3. Inicia la aplicación en modo desarrollo:
   npm run dev

4. Abre en el navegador:
   http://localhost:5173

Variables CSS esperadas (en index.css):
---------------------------------------
--highlight: color para la fase de trabajo
--accent: color de botones y bordes
--shadow: sombra general
--secondary: fondo del contenedor
--fg: color de la fuente principal

Notas:
------
- Asegúrate de tener un archivo `alarm.mp3` válido en la carpeta `public`.
- Para personalizar los tiempos, modifica `WORK_TIME` y `BREAK_TIME` en segundos.
- El sonido puede no reproducirse automáticamente en navegadores por políticas de autoplay, hasta que el usuario interactúe con la página.
