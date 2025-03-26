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
import { createInvoice, importLaboratory } from '@/app/lib/actions';

export default function Form() {
  return (
    <form action={importLaboratory}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

      {/* ruta del laboratorio */}
      <div className="mb-4">
          <label htmlFor="laboratoryPath" className="mb-2 block text-sm font-medium">
            Ingresar ruta del laboratorio
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="laboratoryPath"
                name="laboratoryPath"
                type="string"
                placeholder="Ruta del laboratorio"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

      {/* nombre del archivo */}
      <div className="mb-4">
          <label htmlFor="fileName" className="mb-2 block text-sm font-medium">
            Ingresar ruta del laboratorio
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="fileName"
                name="fileName"
                type="string"
                placeholder="Nombre del archivo"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* File selector */}
        {/*<div className="mb-4">
          <label htmlFor="fileName" className="mb-2 block text-sm font-medium">
            Seleccionar archivo del laboratorio
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="fileName"
              name="labFile"
              type="file"
              className="block w-full text-sm text-gray-500
                        file:mr-4 file:rounded-md file:border-0
                        file:bg-blue-50 file:px-4 file:py-2
                        file:text-sm file:font-semibold
                        file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>*/}



      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/labs/importar-exportar"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Crear laboratorio</Button>
      </div>
    </form>
  );
}
