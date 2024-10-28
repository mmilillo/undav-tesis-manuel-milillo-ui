'use server';

import { createLab, runLabByName } from "./data";
import { LaboratoryDTO, RunLabDTO } from "./definitions";
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from "next/navigation";

const FormSchema = z.object({
  laboratoryName: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }).regex(/^\S*$/, {
    message: "The string must not contain spaces.",
  }),
  os: z.string(),
  db: z.string(),
  //dataBaseName: z.coerce.number(),
  //status: z.enum(['pending', 'paid']),
  //date: z.string(),
});
 
const CreateInvoice = FormSchema; 


export async function createInvoice(formData: FormData) {
    const laboratoryDTO = CreateInvoice.parse({
      laboratoryName: formData.get('laboratoryName'),
      os: formData.get('operatingSystemName'),
      db: formData.get('dataBaseName'),
    });

    // Test it out:
    console.log(laboratoryDTO);

    const labsReales = await createLab(laboratoryDTO);

    revalidatePath('/labs/create');
}


export async function upLab(id: string) {

 console.log('el id es: ' + id)

 const runLabDTO : RunLabDTO = {
  laboratoryName: id,
  operation: 'up'
 }

 const labsReales = await runLabByName(runLabDTO);

  revalidatePath('/labs/lab?laboratory-name=' + id);
  redirect('/labs/lab?laboratory-name=' + id);
}


export async function downLab(id: string) {

  console.log('el id es: ' + id)
 
  const runLabDTO : RunLabDTO = {
   laboratoryName: id,
   operation: 'down'
  }
 
  const labsReales = await runLabByName(runLabDTO);
 
   revalidatePath('/labs/lab?laboratory-name=' + id);
   redirect('/labs/lab?laboratory-name=' + id);
 }