import { CustomerField, DataBaseField, OperatingSystemField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createInvoice } from '@/app/lib/actions';

export default function Form({ operatingSystems, dataBases }: { operatingSystems: OperatingSystemField[], dataBases: DataBaseField[] }) {
  return (
    <form action={createInvoice}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

      {/* Laboratory name */}
      <div className="mb-4">
          <label htmlFor="laboratoryName" className="mb-2 block text-sm font-medium">
            Ingresar nombre del laboratorio
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="laboratoryName"
                name="laboratoryName"
                type="string"
                placeholder="Nombre del laboratorio"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>





        {/* Operating System */}
        <div className="mb-4">
          <label htmlFor="OperatingSystem" className="mb-2 block text-sm font-medium">
            Seleccionar sistema operativo
          </label>
          <div className="relative">
            <select
              id="operatingSystemId"
              name="operatingSystemName"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Sistema operativo
              </option>
              {operatingSystems.map((os) => (
                <option key={os.id} value={os.id}>
                  {os.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Data Base */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Seleccionar motor de base de datos
          </label>
          <div className="relative">
            <select
              id="dataBaseId"
              name="dataBaseName"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="">
                Sin base de datos
              </option>
              {dataBases.map((db) => (
                <option key={db.id} value={db.id}>
                  {db.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/labs/create"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Crear laboratorio</Button>
      </div>
    </form>
  );
}
