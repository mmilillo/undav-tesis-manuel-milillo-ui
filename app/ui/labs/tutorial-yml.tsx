
import { fetchYamlFileByName, fetchYamlFileByNameSync } from '@/app/lib/data';
import { useEffect, useState } from 'react';

export default function ymlTutorial({ laboratoryName }: { laboratoryName: string}) {
  const [laboratoryYml, setLaboratoryYml] = useState('Cargando...');
  useEffect(() => {
    // Llamada a la función de manera asíncrona usando promesas
    fetchYamlFileByName(laboratoryName)
      .then((res) => {
        // Convertimos el objeto a string si es necesario
        const ymlContent = typeof res === 'string' ? res : JSON.stringify(res, null, 2);
        setLaboratoryYml(ymlContent);
      })
      .catch(() => setLaboratoryYml('Error al cargar el archivo YAML'));
  }, [laboratoryName]);
  console.log(laboratoryYml)
    

  return (
   
    <div>

    <p>
        Un archivo YAML (con extensión <code>.yml</code> o <code>.yaml</code>) es un formato de archivo de texto plano que se utiliza para almacenar datos estructurados de forma sencilla y legible. "YAML" significa "YAML Ain't Markup Language", indicando que no es un lenguaje de marcado como HTML, sino un formato para la serialización de datos.
    </p>

    <br></br>
    <h1>
        <strong> Características Principales de YAML</strong> 
    </h1>
    <br></br>
    <ol >
        <li>
        <strong>Legibilidad</strong><br />
        Está diseñado para ser fácil de leer y escribir, con una sintaxis intuitiva basada en la indentación. Esto lo hace ideal para la configuración y estructuración de datos.
        </li>
        <li>
        <br></br>
        <strong>Sintaxis de Indentación</strong><br />
        YAML utiliza espacios y tabulaciones para definir la jerarquía y estructura de los datos, permitiendo agrupar información sin el uso de llaves <code>{}</code> ni corchetes <code>[]</code>, como en JSON o XML.
        </li>
        <li>
        <br></br>
        <strong>Compatibilidad con JSON</strong><br />
        YAML es un superconjunto de JSON, lo que significa que cualquier archivo JSON es también un archivo YAML válido.
        </li>
        <li>
        <br></br>
        <strong>Uso en Configuración</strong><br />
        YAML es muy popular para archivos de configuración en diversas aplicaciones y servicios, como Kubernetes (<code>k8s</code>), Docker Compose, y también en frameworks de desarrollo como Rails o Django.
        </li>
    </ol>
    <br></br>
    <h2 >Ejemplo de YAML</h2>
    <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', border: '1px solid #ddd', overflowX: 'auto' }}>
    {`
        version: "3"
        services:
        web:
            image: "nginx:latest"
            ports:
            - "80:80"
        database:
            image: "postgres:latest"
            environment:
            POSTGRES_USER: "admin"
            POSTGRES_PASSWORD: "password"
    `}

    </pre>
    <br></br>
    <h1 > <strong> Estructura de Datos </strong></h1>
    <br></br>
    <ol >
        <li>
        <strong>Clave-Valor</strong><br />
        Los datos suelen estar en formato de clave-valor (<code>clave: valor</code>).
        </li>
        <li>
        <br></br>
        <strong>Listas</strong><br />
        Las listas se indican con un guion (<code>- item</code>).
        </li>
        <li>
        <br></br>
        <strong>Jerarquía</strong><br />
        La jerarquía se indica mediante la indentación, donde los niveles más bajos están más indentados.
        </li>
    </ol>

    <br></br>
    <h1 > <strong> Uso Común de Archivos YAML </strong></h1>
    <br></br>
    <ul >
        <li>Configurar servicios y aplicaciones (como Docker Compose, Podman Compose o  Kubernetes).</li>
        <li>Definir pipelines en integración continua (como GitLab CI/CD).</li>
        <li>Guardar configuraciones de aplicaciones y plantillas de datos estructurados.</li>
    </ul>
    <p >
        Gracias a su simplicidad y flexibilidad, YAML se ha convertido en un estándar para muchas herramientas y frameworks.
    </p>

    <br></br>
    <h1 > <strong> YAML utilizado para configurar este laboratorio </strong></h1>
    <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', border: '1px solid #ddd', overflowX: 'auto' }}>
    {`
        ${laboratoryYml.toString()}
    `}

    </pre>
  </div>

    
  );
}
