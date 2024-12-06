# undav-tesis-manuel-milillo - Front-end


### Herramienta basada en contenedores con el fin de emular ambientes de trabajo reales destinados a la enseñanza universitaria

 Proyecto de tesis de la carrera Ingeniería informática de la Universidad Nacional de Avellaneda.

## Propuesta

Aprovechar las ventajas de utilizar contenedores y control de versiones en materias de programación dictadas en ingenierías. Con el fin de aprender en un entorno de trabajo similar al real. Utilizando una herramienta, desarrollada como contenido principal de la tesis, que permita abstraerse de estas tecnologías de forma tal que el estudiante no necesite poseer conocimiento de estas tecnologías.


## La herramienta

Se diagramaron las pantallas de la aplicación y su funcionalidad utilizando la herramienta [Excalidraw](https://excalidraw.com). 

![Diagrama](/documentation/images/diagrama-pantallas.svg)

Para ver el diagrama en mas detalle puede importar el archivo `/diagrams/diagrama-pantallas.excalidraw` a [Excalidraw](https://excalidraw.com) o acceder a este [link](https://excalidraw.com/#json=utYk9w-Lt_lDz0vpjlv6j,tRiqt-LgAY7Is0AQR3Wu0w).



## Prerrequisitos

Esta aplicacion funciona junto con su correspondiente [Back-end](https://github.com/mmilillo/undav-tesis-manuel-milillo), este tiene su propia guia de instalacion.

La aplicacion requiere los siguiente prerrequisitos. Estos pueden ser instalados de forma manual en el servidor donde se ejecutará la aplicacion o bien utilizar el script que se presenta en esta seccion. 

* NPM >= 10.8.1 [Link instalación](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* Nodejs >= v20.11.0 - [Link instalación](https://nodejs.org/en/download/package-manager)


Script de instalacion de dependencias (Ubuntu)

```bash
$ sudo ./scripts/install_dependencies.sh
```
Este script instalará o actualizará las dependencias segun sea necesario. 


## Running the app

Para ejecutar este repositorio basta con ejecutar el siguiente comando

```bash
$ npm run deploy
```