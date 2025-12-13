# Proyecto Banco de Sangre

Este proyecto corresponde a un **sistema de gestión para un Banco de Sangre**, desarrollado con una arquitectura separada de **Front-end** y **Back-end**, con el objetivo de facilitar la administración de la información relacionada con donantes, donaciones e inventario de sangre.

---

##  Descripción General

El sistema está diseñado como una **aplicación de escritorio**, pensada para ser utilizada por el personal del banco de sangre. Permite registrar, consultar y administrar los datos de manera segura y organizada.

La aplicación se divide en dos partes principales:

* **Front-end:** interfaz gráfica con la que interactúa el usuario.
* **Back-end:** lógica del sistema y gestión de la base de datos.

---

##  Front-end (Electron + React)

El **Front-end** fue desarrollado utilizando **React** junto con **Electron**, lo que permite que la aplicación funcione como un programa de escritorio multiplataforma.

Sus principales características son:

* Interfaz moderna e intuitiva.
* Navegación sencilla entre pantallas.
* Formularios para el registro de información.
* Consumo de datos provenientes del Back-end mediante servicios.

Electron se encarga de convertir la aplicación web en una aplicación de escritorio, mientras que React gestiona la estructura, los componentes y la lógica visual.

---

##  Back-end (C# .NET)

El **Back-end** está desarrollado en **C# utilizando .NET**, siguiendo el modelo de **API REST**.

Se encarga de:

* Procesar las solicitudes del Front-end.
* Aplicar la lógica del negocio.
* Validar los datos ingresados.
* Conectarse a la base de datos.
* Garantizar la seguridad y consistencia de la información.

La API actúa como intermediaria entre la aplicación y la base de datos.

---

##  Base de Datos

La base de datos almacena toda la información del sistema, incluyendo:

* Donantes
* Donaciones
* Tipos de sangre
* Inventario de unidades disponibles
* Usuarios del sistema

El Back-end es el único componente que tiene acceso directo a la base de datos, asegurando mayor control y seguridad.

---

##  Comunicación entre Front-end y Back-end

La comunicación entre el Front-end y el Back-end se realiza mediante **peticiones HTTP**. El Front-end solicita información y el Back-end responde con los datos necesarios.

Este modelo permite una separación clara de responsabilidades y facilita el mantenimiento del sistema.

---

##  Funcionalidades del Sistema

Entre las principales funcionalidades del sistema se encuentran:

* Registro y gestión de donantes.
* Control de donaciones realizadas.
* Administración del inventario de sangre.
* Clasificación por tipo de sangre.
* Gestión de usuarios del sistema.
* Generación de consultas y reportes básicos.

---

##  Seguridad

El sistema implementa medidas de seguridad para proteger la información, tales como:

* Validación de datos.
* Control de acceso a las funciones del sistema.
* Protección de la información almacenada.

---

##  Objetivo del Proyecto

El objetivo principal del proyecto es **mejorar la gestión y el control de un Banco de Sangre**, optimizando los procesos y reduciendo errores en el manejo de la información.

---

##  Notas Finales

Este proyecto fue desarrollado con fines **académicos **, y puede ser ampliado o adaptado según las necesidades del entorno donde se implemente.
