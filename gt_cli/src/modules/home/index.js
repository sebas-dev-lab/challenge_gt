import React from "react";

function Welcome() {
  return (
    <div>
      <h3>
        Challenge - <b>ToDo List</b>
      </h3>
      <p>
        Se integran procesos de autenticación basica y CRUD de tareas - Full
        Stack
      </p>
      <p>
        Las tareas obtenidas desde https://jsonplaceholder.typicode.com/todos,
        es agregado al contexto del usuario demo creado durante el test de API
        al iniciar la misma. 
      </p>
      <p>Puede agregar nuevos usuarios y cada uno trabaja dentro del contexto de la API correspondiente. Vea mas en ...</p>
      <p>Documentación de API al siguiente link</p>
      <h4>Consideraciones previas</h4>
      <p>Instalar NodeJs</p>
      <h4>Instalación</h4>
      <p>En raiz del proyecto ejecutar ``npm run dev:install``</p>
      <p>O bien ejecutar en API y CLI ``npm install``</p>
      <h4>Ejecutar API</h4>
      <p>Ejecutando en cada proyecto de forma individual: </p>
      <p>API: src/gt_api: ```npm run start:local```</p>
      <p>CLI: src/gt_cli: ```npm run start:local```</p>
      <p>
        Ejecutando de forma concurrente desde la raiz del proyecto general:{" "}
      </p>
      <p>```npm run dev```</p>
      <h4>Terminar procesos</h4>
      <p>
        Si se ejecuta este último método al terminar los procesos en Poweshell
        de Windows se debería ejeuctar:{" "}
      </p>
      <p>```netstat -ano | findstr :PORT``` API_PORT=4000, CLI_PORT=3000</p>
      <p>```taskkill /PID 'PID' /F```</p>
      <h4>Reporte de testing</h4>
      <p>
        Reporte de testing (newman) al siguiente link{" "}
        <a href="http://localhost:4000/api/test_view" target="_blank">
          test_view
        </a>
      </p>
    </div>
  );
}
export default Welcome;
