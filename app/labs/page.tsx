import { lusitana } from '@/app/ui/fonts';
import { fetchLabs, fetchLabsMock, fetchRuningLabs } from '@/app/lib/data';
import Labs from '@/app/ui/labs/available-laboratories';
import RunningLaboratories from '../ui/labs/running-laboratories';


// PAGINA PRINCIPAL DE LABORATORIOS
// consulta labs ejecutandose
export default async function Page() {
  const labsReales = await fetchRuningLabs();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
      Available laboratories, consulta labs ejecutandose
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* <Card title="Collected" value={totalPaidInvoices} type="collected" /> */}
        {/* <Card title="Pending" value={totalPendingInvoices} type="pending" /> */}
        {/* <Card title="Total Invoices" value={numberOfInvoices} type="invoices" /> */}
        {/* <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* <RevenueChart revenue={revenue}  /> */}
        {/* <Labs labsProperty={labs} /> */}
        { <RunningLaboratories labsProperty={labsReales} />}
      </div>
    </main>
  );
}