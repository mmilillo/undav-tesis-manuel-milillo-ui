import { ArrowDownIcon, PencilIcon, PlayIcon, PlusIcon, StopIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { upLab, downLab } from '@/app/lib/actions';

export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Invoice</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpLab({ id }: { id: string }) {
  const upLabWithId = upLab.bind(null, id);
  return (
    <form action={upLabWithId}>
    <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
      <span className="sr-only">start</span>
      <PlayIcon className="w-4" />
    </button>
  </form>
  );
}

export function DownLab({ id }: { id: string }) {
  const downLabWithId = downLab.bind(null, id);
  return (
    <form action={downLabWithId}>
    <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
      <span className="sr-only">start</span>
      <StopIcon className="w-4" />
    </button>
  </form>
  )
}

export function DownloadLab({ id }: { id: string }) {
  const downLabWithId = downLab.bind(null, id);
  return (
    <form action={downLabWithId}>
    <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
      <span className="sr-only">start</span>
      <ArrowDownIcon className="w-4" />
    </button>
  </form>
  )
}
