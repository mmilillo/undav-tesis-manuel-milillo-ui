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
            Para probar la conectividad con el servidor de base de datos
        </h1>
        <br></br>
        <h1>
        Asegurese de tener instalada la herramienta ping
        </h1>
        <br></br>
        <h1>
        apt install inetutils-ping
        </h1>
        <br></br>
        <h1>
        Ejecute la siguente linea de codigo
        </h1>
        <h1>
        {'ping  ' + containerId + ' 5432'}
        </h1>
        <br></br>
        <br></br>
    </div>
  );
}
