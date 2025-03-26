import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { LabDetails } from '@/app/lib/definitions';

import Link from 'next/link';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import { LinkIcon } from '@heroicons/react/20/solid';
import { DeleteImportedLab, DownLoadLab } from './buttons';

export default async function ImportedLabDetails({
  labsProperty, path, error
}: {
  labsProperty: LabDetails;
  path: string | null;
  error: string | null;
}) {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        {'Servidores asociados al pod del laboratorio: ' + labsProperty.laboratoryName}
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {/* NOTE: Uncomment this code in Chapter 7 */}

        { <div className="bg-white px-6">
          {labsProperty.containers.map((container, i) => {
            return (
              <div
                key={container.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <Image
                    src={"/labs/navegador.png"}
                    alt={`${container.containerName}'s container name`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {container.containerName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Image
                    src={"/labs/reloj.png"}
                    alt={`${container.status}'s container status`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {container.status}
                    </p>
                  </div>
                </div>
                <DeleteImportedLab id={container.containerName} />
                <Link
                  key={container.laboratoryName}
                  href={'/labs/connect?laboratory-name=' + container.laboratoryName + '&system-type=' + container.type + '&system-name=' + container.systemName + '&container-id=' + container.id}
                  className={clsx(
                    'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                  )}>
                  <LinkIcon className="w-6" />
                  <p className="hidden md:block">{"¿Cómo acceder?"}</p>
                </Link>
              </div>
            );
          })}
        </div> }
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>

        <div className="bg-white px-6">
          <div className="min-w-0 flex items-center gap-x-8">
            <p className="truncate text-sm font-semibold md:text-base">
              { `Exportar laboratorio: ${labsProperty.laboratoryName}` }
            </p>
            <DownLoadLab id={labsProperty.laboratoryName} />
          {path && (
            <p className="text-green-600 text-sm">{ `El laboratorio fue exportado correctamente. Path: ${path}` }</p>
          )}
          {error && (
             <p className="text-red-600 text-sm">{ `Ocurrió un error al exportar el laboratorio. Error: ${error}`  }</p>
          )}
          </div>
        </div>

      </div>
    </div>
  );
}
