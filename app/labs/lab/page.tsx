'use client'

import { fetchLabByName, fetchYamlLabByName, fetchYamlFileByName } from '@/app/lib/data';
import { Card } from '@/app/ui/dashboard/cards';
import { useSearchParams } from 'next/navigation';
import LabDetails from '@/app/ui/labs/lab-details';
import ImportedLabDetails from '@/app/ui/labs/imported-lab-details';
import YamlDetails from '@/app/ui/labs/yaml-details';
import { YmlCard } from '@/app/ui/labs/yml-card';
import { Suspense } from 'react';




// INFO DE UN LABORATORIO
async function Content() {

  // client side parameters
  const searchParams = useSearchParams()
  let laboratoryName;
  let path = null;
  let error = null;


  if (process.env.CI) {
    const laboratoryName = 'test-ci'
  }
  else{
    laboratoryName = searchParams.get('laboratory-name') // returns 'bar' when ?foo=bar
    path = searchParams.get('path') // returns 'bar' when ?foo=bar
    error = searchParams.get('error')
  }


  console.log('laboratorio es: ' + laboratoryName);

  if(!laboratoryName){
    return <h1>404 - Page Not Found</h1>;
  }

  let lab = await fetchLabByName(laboratoryName);
  let yamlLab = await fetchYamlLabByName(laboratoryName);
  //let yamlFile = await fetchYamlFileByName(laboratoryName);

/// Solo para laboratorios importado, al no disponer del podman-compose se muestra informacion resumida
  if(lab && lab.containers && lab.containers[0] && lab.containers[0].image.includes('localhost')){
    return (
      <main>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          { <Card title="Estado" 
           value={lab.status === "runing" ? "En ejecución" : lab.status}
          type="pending" /> }
          { <Card title="Servidor" value={lab.containers[0].systemName} type="invoices" /> }
          { <Card title="Base de datos" value={lab.containers[1] ? lab.containers[1].systemName : 'No disponible'} type="invoices" /> }
          { <YmlCard title="¿Como funciona?" laboratoryName={laboratoryName} type="invoices" />}
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
          {/* <RevenueChart revenue={revenue}  /> */}
        </div>
        { <ImportedLabDetails labsProperty={lab} path={path}  error={error}/>}
      </main>
    );
  }



  if(lab){
    return (
      <main>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          { <Card title="Estado" 
           value={lab.status === "runing" ? "En ejecución" : lab.status}
          type="pending" /> }
          { <Card title="Servidor" value={lab.containers[0].systemName} type="invoices" /> }
          { <Card title="Base de datos" value={lab.containers[1] ? lab.containers[1].systemName : 'No disponible'} type="invoices" /> }
          { <YmlCard title="¿Como funciona?" laboratoryName={laboratoryName} type="invoices" />}
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
          {/* <RevenueChart revenue={revenue}  /> */}
        </div>
        { <LabDetails labsProperty={lab} path={path} error={error}/>}
      </main>
    );
  }
  else{
    return (
      <main>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          { <Card title="Estado" value={'Detenido'} type="pending" /> }
          { <Card title="Servidor" value={'-'} type="invoices" /> }
          { <Card title="Base de datos" value={'-'} type="invoices" /> }
          { <YmlCard title="¿Como funciona?" laboratoryName={laboratoryName} type="invoices" />}
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
          {/* <RevenueChart revenue={revenue}  /> */}
        </div>
        { <YamlDetails yamlProperty={yamlLab} />}
      </main>
    )
  }
}

// Página que envuelve el componente Content con Suspense
export default function Page() {
  return (
    <Suspense fallback={<p>Cargando contenido...</p>}>
      <Content />
    </Suspense>
  );
}