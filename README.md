# BoletasFront

## Frontend Angular de Proyecto de Prueba tecnica de Gestion de Reserva de Boletas

## Instalación

Para instalar el proyecto en su maquina local debe descargar o clonar el mismo. Luego correr el comando `npm install` para descargar todas las dependencias.

## Configuración

Antes de iniciar el proyecto es necesario hacer la configuración de la url. Esto se debe hacer accediendo al archivo /src/environment.ts y agregando la siguiente clave al objeto de configuración: `url: 'http://127.0.0.1:8000/api'` en la ip se debe cambiar por el nombre o ip del host local.

El objeto debe quedar asi:

`
export const environment = {
  production: false,
  url: 'http://127.0.0.1:8000/api'
};
`
## Iniciar el proyecto

Una vez realizado todos los pasos anteriores se puede iniciar el proyecto con el comando `ng serve` y luego acceder desde el navegador a traves de `http://localhost:4200/`. En caso de ser necesario cambiar localhost por el nombre o ip del host local.
