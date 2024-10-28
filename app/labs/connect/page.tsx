'use client'

import { lusitana } from '@/app/ui/fonts';
import { useSearchParams } from 'next/navigation';
import TutorialOS from '@/app/ui/labs/tutorial-os';
import TutorialDB from '@/app/ui/labs/tutorial-db';

// INFO PARA CONNECTARSE A UN CONTENEDOR
export default async function Page() {

  // client side parameters
  const searchParams = useSearchParams()
  const laboratoryName = searchParams.get('laboratory-name') // returns 'bar' when ?foo=bar
  const systemType = searchParams.get('system-type') // returns 'bar' when ?foo=bar
  const systemName = searchParams.get('system-name') // returns 'bar' when ?foo=bar
  const containerId = searchParams.get('container-id') // returns 'bar' when ?foo=bar


  console.log('laboratorio es: ' + laboratoryName);

  if(!laboratoryName){
    return <h1>404 - Page Not Found</h1>;
  }


  if(systemType === 'OS'){
    return (
      <main>
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          {laboratoryName}
        </h1>
        <br></br>
        <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          {'Instructivo para conectarse ' + (systemType == 'OS' ? ' al sistema operativo ' : 'a la base de datos ') + systemName}
        </h2>
        <br></br>
        { <TutorialOS containerId= {containerId ? containerId : ''} />}
      </main>
    );
  }
  else{
    return (
      <main>
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          {laboratoryName}
        </h1>
        <br></br>
        <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          {'Instructivo para conectarse ' + (systemType == 'OS' ? ' al sistema operativo ' : 'a la base de datos ') + systemName}
        </h2>
        <br></br>
        { <TutorialDB containerId= {containerId ? containerId : ''} />}
      </main>
    );
  }
  
}