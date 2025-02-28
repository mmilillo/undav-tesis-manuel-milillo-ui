'use client';

import { Suspense } from 'react';
import { lusitana } from '@/app/ui/fonts';
import { useSearchParams } from 'next/navigation';
import TutorialOS from '@/app/ui/labs/tutorial-os';
import TutorialDB from '@/app/ui/labs/tutorial-db';

// INFO PARA CONNECTARSE A UN CONTENEDOR
function Content() {
  // Client side parameters
  const searchParams = useSearchParams();
  const laboratoryName = searchParams.get('laboratory-name');
  const systemType = searchParams.get('system-type');
  const systemName = searchParams.get('system-name');
  const containerId = searchParams.get('container-id');

  console.log('laboratorio es: ' + laboratoryName);

  if (!laboratoryName) {
    return <h1>404 - Page Not Found</h1>;
  }

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        {laboratoryName}
      </h1>
      <br />
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        {'Instructivo para conectarse ' +
          (systemType === 'OS' ? ' al sistema operativo ' : 'a la base de datos ') +
          systemName}
      </h2>
      <br />
      {systemType === 'OS' ? (
        <TutorialOS containerId={containerId || ''} />
      ) : (
        <TutorialDB containerId={containerId || ''} />
      )}
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<p>Cargando contenido...</p>}>
      <Content />
    </Suspense>
  );
}
