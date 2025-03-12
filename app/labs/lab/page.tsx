'use client'

import { fetchLabByName, fetchYamlLabByName, fetchYamlFileByName } from '@/app/lib/data';
import { Card } from '@/app/ui/dashboard/cards';
import { useSearchParams } from 'next/navigation';
import LabDetails from '@/app/ui/labs/lab-details';
import YamlDetails from '@/app/ui/labs/yaml-details';
import { YmlCard } from '@/app/ui/labs/yml-card';
import { Suspense } from 'react';




// INFO DE UN LABORATORIO
async function Content() {

  // desabilita llamada a apis en momento de compilacion del CI
  if (process.env.CI) {
    return { props: { data: null } };
  }

  // client side parameters
  const searchParams = useSearchParams()
  const laboratoryName = searchParams.get('laboratory-name') // returns 'bar' when ?foo=bar


  console.log('laboratorio es: ' + laboratoryName);

  if(!laboratoryName){
    return <h1>404 - Page Not Found</h1>;
  }

  let lab = await fetchLabByName(laboratoryName);
  let yamlLab = await fetchYamlLabByName(laboratoryName);
  let yamlFile = await fetchYamlFileByName(laboratoryName);

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
        { <LabDetails labsProperty={lab} />}
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