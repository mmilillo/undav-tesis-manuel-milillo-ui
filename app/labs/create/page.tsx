import { lusitana } from '@/app/ui/fonts';
import { fetchCustomersMock, fetchDataBases, fetchYamlLabs, fetchLabsMock, fetchOperatingSystems } from '@/app/lib/data';
import Labs from '@/app/ui/labs/available-laboratories';

// PAGINA PRINCIPAL DE LABORATORIOS


/*
// LEE YMLS DEL DIRECTORIO
export default async function Page() {
  const labs = await fetchLabsMock();
  const labsReales = await fetchLabs();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
      aca se realiza el up and down
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        { <Labs labsProperty={labsReales} />}
      </div>
    </main>
  );
}

*/


import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
  const operatingSystems = await fetchOperatingSystems();
  const dataBases = await fetchDataBases();
  const labsReales = await fetchYamlLabs();

  return (
    <main>
      {/* Menu horizontal */}
      <Breadcrumbs
        breadcrumbs={[
          { label: 'labs', href: '/labs' },
          {
            label: 'Create Laboratory',
            href: '/labs/create',
            active: true,
          },
        ]}
      />

      {/* formulario para altas */}
      <Form operatingSystems={operatingSystems} dataBases={dataBases} />

      {/* yamls creados */}
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Laboratorios creados
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"></div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        { <Labs labsProperty={labsReales} />}
      </div>

    </main>
  );
}
  