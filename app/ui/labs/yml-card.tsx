import {
    BanknotesIcon,
    ClockIcon,
    UserGroupIcon,
    InboxIcon,
    LinkIcon,
  } from '@heroicons/react/24/outline';
  import { lusitana } from '@/app/ui/fonts';
import { DownloadLab } from './buttons';
import Link from 'next/link';
import clsx from 'clsx';
  
  const iconMap = {
    collected: BanknotesIcon,
    customers: UserGroupIcon,
    pending: ClockIcon,
    invoices: InboxIcon,
  };
  
  export default async function CardWrapper() {
    return (
      <>
        {/* NOTE: Uncomment this code in Chapter 9 */}
  
        {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
      </>
    );
  }
  
  export function YmlCard({
    title,
    laboratoryName,
    type,
  }: {
    title: string;
    laboratoryName: string;
    type: 'invoices' | 'customers' | 'pending' | 'collected';
  }) {
    const Icon = iconMap[type];
  
    return (
      <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
        <div className="flex p-4">
          {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
          <h3 className="ml-2 text-sm font-medium">{title ? title : "No disponible"}</h3>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/*<p>Descargar YML</p>*/}
            {/*<DownloadLab id={laboratoryName} />*/}
            <Link
                  key={laboratoryName}
                  href={'/labs/yml?laboratory-name=' + laboratoryName}
                  className={clsx(
                    'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                  )}>
                  <LinkIcon className="w-6" />
                  <p className="hidden md:block">{"Investigar"}</p>
                </Link>
        </div>
      </div>
    );
  }
  