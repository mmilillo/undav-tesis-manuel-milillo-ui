'use client'

import { lusitana } from '@/app/ui/fonts';
import { useSearchParams } from 'next/navigation';
import TutorialOS from '@/app/ui/labs/tutorial-os';
import TutorialYml from '@/app/ui/labs/tutorial-yml';
import TutorialDB from '@/app/ui/labs/tutorial-db';
import { fetchYamlFileByName, fetchYamlFileByNameSync } from '@/app/lib/data';
import React, { Suspense, useEffect, useState } from 'react';

// INFO PARA CONNECTARSE A UN CONTENEDOR
function Content() {

  // desabilita llamada a apis en momento de compilacion del CI
  if (process.env.CI) {
    return { props: { data: null } };
  }

  // client side parameters
  const searchParams = useSearchParams()
  let laboratoryName = searchParams.get('laboratory-name') // returns 'bar' when ?foo=bar

  console.log('laboratorio es: ' + laboratoryName);

  if(!laboratoryName){
    return <h1>404 - Page Not Found</h1>;
  }

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        {"Configuracion del laboratorio " +  laboratoryName}
      </h1>
      <br></br>
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        {'¿Que es un archivo YML? '}
      </h2>
      <br></br>
      { <TutorialYml laboratoryName = {laboratoryName} />}
    </main>
  );
  
}

  // Página que envuelve el componente Content con Suspense
  export default function Page() {
    return (
      <Suspense fallback={<p>Cargando contenido...</p>}>
        <Content />
      </Suspense>
    );
  }