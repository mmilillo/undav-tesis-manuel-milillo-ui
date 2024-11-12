import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function InvoiceStatus({ containerId }: { containerId: string }) {
  return (
    <div>
        <h1>
        {'Id del contenedor es ' + containerId}
        </h1>
        <br></br>
        <h1>
            Para conectarse al servidor debe ejecutar la siguiente linea en una terminal
        </h1>
        <br></br>
        <h1>
        {'podman exec -it  ' + containerId + ' /bin/bash'}
        </h1>
        <br></br>
        <br></br>
        <h1>Principales 10 Comandos de Linux</h1>
        <br></br>
        <br></br>
        <ol style={{ lineHeight: '1.6' }}>
        <li>
            <strong>ls</strong><br />
            Muestra el contenido de un directorio.
            <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', border: '1px solid #ddd', overflowX: 'auto' }}>
{`ls         # Lista archivos en el directorio actual
ls -l      # Lista con detalles (permisos, propietario, tamaño, fecha)
ls -a      # Lista todos los archivos, incluidos los ocultos`}
            </pre>
        </li>
        <li>
            <strong>cd</strong><br />
            Cambia el directorio actual.
            <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', border: '1px solid #ddd', overflowX: 'auto' }}>
{`cd /ruta/al/directorio    # Cambia al directorio especificado
cd ..                      # Sube un nivel en el árbol de directorios
cd ~                       # Cambia al directorio home del usuario`}
            </pre>
        </li>
        <li>
            <strong>pwd</strong><br />
            Muestra el directorio de trabajo actual.
            <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', border: '1px solid #ddd', overflowX: 'auto' }}>
{`pwd  # Imprime la ruta completa del directorio actual`}
            </pre>
        </li>
        <li>
            <strong>cp</strong><br />
            Copia archivos y directorios.
            <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', border: '1px solid #ddd', overflowX: 'auto' }}>
{`cp archivo.txt /ruta/destino/          # Copia un archivo
cp -r directorio/ /ruta/destino/       # Copia un directorio recursivamente`}
            </pre>
        </li>
        <li>
            <strong>mv</strong><br />
            Mueve o renombra archivos y directorios.
            <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', border: '1px solid #ddd', overflowX: 'auto' }}>
{`mv archivo.txt /ruta/nueva/            # Mueve un archivo
mv archivo.txt nuevo_nombre.txt         # Renombra un archivo`}
            </pre>
        </li>
        <li>
            <strong>rm</strong><br />
            Elimina archivos y directorios.
            <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', border: '1px solid #ddd', overflowX: 'auto' }}>
{`rm archivo.txt           # Elimina un archivo
rm -r directorio/        # Elimina un directorio y su contenido de forma recursiva
rm -f archivo.txt        # Fuerza la eliminación sin confirmación`}
            </pre>
        </li>
        <li>
            <strong>mkdir</strong><br />
            Crea un nuevo directorio.
            <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', border: '1px solid #ddd', overflowX: 'auto' }}>
{`mkdir nuevo_directorio   # Crea un nuevo directorio`}
            </pre>
        </li>
        <li>
            <strong>rmdir</strong><br />
            Elimina un directorio vacío.
            <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', border: '1px solid #ddd', overflowX: 'auto' }}>
{`rmdir directorio         # Elimina un directorio solo si está vacío`}
            </pre>
        </li>
        <li>
            <strong>chmod</strong><br />
            Cambia los permisos de archivos y directorios.
            <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', border: '1px solid #ddd', overflowX: 'auto' }}>
{`chmod 755 archivo.txt     # Cambia los permisos de un archivo
chmod -R 700 directorio/   # Cambia los permisos de un directorio y su contenido de forma recursiva`}
            </pre>
        </li>
        <li>
            <strong>man</strong><br />
            Muestra el manual de otros comandos.
            <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', border: '1px solid #ddd', overflowX: 'auto' }}>
{`man comando          # Muestra la página de manual del comando especificado
man ls               # Muestra la documentación del comando \`ls\``}
            </pre>
        </li>
    </ol>

    </div>

    
  );
}
