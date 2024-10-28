'use client'

import { lusitana } from '@/app/ui/fonts';
import { fetchLabByName, fetchYamlLabs, fetchLabsMock, fetchYamlLabByName } from '@/app/lib/data';
import Labs from '@/app/ui/labs/available-laboratories';
import { Card } from '@/app/ui/dashboard/cards';
import { usePathname, useSearchParams } from 'next/navigation';
import { type NextRequest } from 'next/server'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import LabDetails from '@/app/ui/labs/lab-details';
import YamlDetails from '@/app/ui/labs/yaml-details';




// INFO DE UN LABORATORIO
export default async function Page() {

  // client side parameters
  const searchParams = useSearchParams()
  const laboratoryName = searchParams.get('laboratory-name') // returns 'bar' when ?foo=bar


  console.log('laboratorio es: ' + laboratoryName);

  if(!laboratoryName){
    return <h1>404 - Page Not Found</h1>;
  }

  let lab = await fetchLabByName(laboratoryName);
  let yamlLab = await fetchYamlLabByName(laboratoryName);

  if(lab){
    return (
      <main>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          { <Card title="Status" value={lab.status} type="pending" /> }
          { <Card title="Servidor" value={lab.containers[0].systemName} type="invoices" /> }
          { <Card title="Base de datos" value={lab.containers[1] ? lab.containers[1].systemName : 'No disponible'} type="invoices" /> }
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
          { <Card title="Status" value={'detenido'} type="pending" /> }
          { <Card title="Servidor" value={'-'} type="invoices" /> }
          { <Card title="Base de datos" value={'-'} type="invoices" /> }
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
          {/* <RevenueChart revenue={revenue}  /> */}
        </div>
        { <YamlDetails yamlProperty={yamlLab} />}
      </main>
    )
  }

  
  
}