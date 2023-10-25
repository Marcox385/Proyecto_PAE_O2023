# Proyecto PAE O2023 - Bugs Creators
IS735003 - Cristian Ochoa Navarrete  
IS727272 - Marco Ricardo Cordero Hernández

## Descripción
Código fuente para el proyecto de Programación de Aplicaciones Web (O2023).

Este proyecto consta de dos partes:
- Backend (API)
- Frontend

A medida que nuevas funcionalidades son integradas, el repositorio actual se va actualizando para demostrar el avance realizado hasta el momento, el cual ha sido definido mediante el documento de descripción del proyecto.

## Backend - API
Siguiendo una arquitectura del tipo MVC, se propone la estructura que dará soporte a la comunicación con los datos de la aplicación, es decir, el backend. Para ello, se ha desarrollado una API que atiende a los métodos de las siguientes entidades:
- Usuario
- Publicación
- Comentario
- Respuesta de GPT

Las funciones puntuales pueden ser revisadas [aquí](./src/controllers/) y las rutas definidas junto con su documentación original pueden ser exploradas [aquí](./src/routes/).

## Documentación
Dependiendo del puerto donde se monte la aplicación, la documentación de la API puede ser accedida a través del siguiente enpoint:  
> <localhost:{puerto}/api/documentation>

## Milestones
- [ ] Crear pantallas para la interfaz
- [x] Integrar autenticaciones
- [ ] Integrar pruebas para las autenticaciones
- [ ] Habilitar funcionalidad de registro de usuarios
- [x] Creación de CRUD's
- [ ] Integración de CRUD's
- [ ] Pruebas integrales
- [ ] Despliegue
