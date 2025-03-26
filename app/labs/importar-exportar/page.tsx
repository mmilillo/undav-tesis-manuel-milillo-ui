import { lusitana } from '@/app/ui/fonts';
import { fetchCustomersMock, fetchDataBases, fetchYamlLabs, fetchLabsMock, fetchOperatingSystems } from '@/app/lib/data';
import Labs from '@/app/ui/labs/available-laboratories';

// PAGINA PRINCIPAL DE LABORATORIOS IMPORTADOS



import Form from '@/app/ui/labs/import-form';
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
          { label: 'Laboratorios', href: '/labs' },
          {
            label: 'Importar Laboratorio',
            href: '/labs/importar-exportar',
            active: true,
          },
        ]}
      />

      {/* formulario para altas */}
      <Form />

    </main>
  );
}
  