import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LaboratoryDTO,
  LatestInvoiceRaw,
  Revenue,
  RunLabDTO,
} from './definitions';
import { formatCurrency } from './utils';

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));

    
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchLatestInvoicesMock() {
  return [
    {
      id: "1",
      name: "John Doe",
      image_url: "/customers/amy-burns.png",
      email: "john@example.com",
      amount: "100.00"
    },
    {
      id: "2",
      name: "Jane Smith",
      image_url: "/customers/amy-burns.png",
      email: "jane@example.com",
      amount: "150.00"
    },
    {
      id: "3",
      name: "Alice Johnson",
      image_url: "/customers/amy-burns.png",
      email: "alice@example.com",
      amount: "200.00"
    },
    {
      id: "4",
      name: "Bob Brown",
      image_url: "/customers/amy-burns.png",
      email: "bob@example.com",
      amount: "250.00"
    },
    {
      id: "5",
      name: "Charlie Davis",
      image_url: "/customers/amy-burns.png",
      email: "charlie@example.com",
      amount: "300.00"
    }
  ];
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchCustomersMock() {
  return [
    {
      id: "1",
      name: "John Doe"
    },
    {
      id: "2",
      name: "Jane Smith",
      image_url: "/customers/amy-burns.png"
    },
    {
      id: "3",
      name: "Alice Johnson",
      image_url: "/customers/amy-burns.png"
    },
    {
      id: "4",
      name: "Bob Brown",
      image_url: "/customers/amy-burns.png"
    },
    {
      id: "5",
      name: "Charlie Davis",
      image_url: "/customers/amy-burns.png"
    }
  ]; 
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function fetchLabsMock() {
  return [
    {
      id: "abcd123456",
      name: "Un Lab ubuntu",
      image_url: "/labs/ubuntu.png",
      email: "john@example.com",
      amount: "100.00"
    },
    {
      id: "abcd123456",
      name: "otro lab ubuntu",
      image_url: "/labs/ubuntu.png",
      email: "jane@example.com",
      amount: "150.00"
    },
    {
      id: "abcd123456",
      name: "uno mas ubuntu",
      image_url: "/labs/ubuntu.png",
      email: "alice@example.com",
      amount: "200.00"
    },
  ];
}


export async function fetchLabss() {



  return [
    {
      id: "abcd123456",
      name: "Un Lab ubuntu",
      image_url: "/labs/navegador.png",
      email: "john@example.com",
      amount: "100.00"
    },
    {
      id: "abcd123456",
      name: "otro lab ubuntu",
      image_url: "/labs/ubuntu.png",
      email: "jane@example.com",
      amount: "150.00"
    },
    {
      id: "abcd123456",
      name: "uno mas ubuntu",
      image_url: "/labs/ubuntu.png",
      email: "alice@example.com",
      amount: "200.00"
    },
  ];
}


export async function fetchYamlLabs() {
  try {
    const response = await fetch("http://localhost:3001/yaml-generator", {
      method: "GET", // Puedes usar "POST", "PUT", etc., según lo que necesites
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
        // Agrega cualquier otro header necesario como Authorization, etc.
      },
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }

    
    const data = await response.json();
    console.log(data);
    return data; // Aquí puedes retornar los datos para usarlos en tu componente
  } catch (error) {
    console.error("Error al llamar a la API:", error);
    throw error; // Lanza el error para manejarlo en otro lugar si es necesario
  }
};


export async function fetchYamlLabByName(laboratoryName : string) {
  try {
    const response = await fetch(`http://localhost:3001/yaml-generator/${laboratoryName}`, {
      method: "GET", // Puedes usar "POST", "PUT", etc., según lo que necesites
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
        // Agrega cualquier otro header necesario como Authorization, etc.
      },
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }

    
    const data = await response.json();
    console.log(data);
    return data; // Aquí puedes retornar los datos para usarlos en tu componente
  } catch (error) {
    console.error("Error al llamar a la API:", error);
    throw error; // Lanza el error para manejarlo en otro lugar si es necesario
  }
};

export async function createLab(laboratoryDTO: LaboratoryDTO) {
  try {

    console.log('dentro de data: ' + JSON.stringify(laboratoryDTO))
    const response = await fetch("http://localhost:3001/yaml-generator", {
      method: "PUT", // Puedes usar "POST", "PUT", etc., según lo que necesites
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
        // Agrega cualquier otro header necesario como Authorization, etc.
      },
      body: JSON.stringify({
        laboratoryName: laboratoryDTO.laboratoryName,
        os: laboratoryDTO.os,
        db: laboratoryDTO.db
      })
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }

    
    const data = await response.json();
    console.log(data);
    return data; // Aquí puedes retornar los datos para usarlos en tu componente
  } catch (error) {
    console.error("Error al llamar a la API:", error);
    throw error; // Lanza el error para manejarlo en otro lugar si es necesario
  }
};

export async function fetchRuningLabs() {
  try {
    const response = await fetch(`http://localhost:3001/command/`, {
      method: "GET", // Puedes usar "POST", "PUT", etc., según lo que necesites
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
        // Agrega cualquier otro header necesario como Authorization, etc.
      },
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }

    
    const data = await response.json();
    console.log(data);
    return data; // Aquí puedes retornar los datos para usarlos en tu componente
  } catch (error) {
    console.error("Error al llamar a la API:", error);
    throw error; // Lanza el error para manejarlo en otro lugar si es necesario
  }
};

export async function fetchLabByName(name : string) {
  try {
    const response = await fetch(`http://localhost:3001/command/${name}`, {
      method: "GET", // Puedes usar "POST", "PUT", etc., según lo que necesites
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
        // Agrega cualquier otro header necesario como Authorization, etc.
      },
    });

    if (!response.ok) {
      return null;
      //throw new Error("Error en la solicitud");
    }

    
    const data = await response.json();
    console.log(data);
    return data; // Aquí puedes retornar los datos para usarlos en tu componente
  } catch (error) {
    console.error("Error al llamar a la API:", error);
    throw error; // Lanza el error para manejarlo en otro lugar si es necesario
  }
};

export async function runLabByName(lab : RunLabDTO) {
  try {
    const response = await fetch(`http://localhost:3001/command/`, {
      method: "POST", // Puedes usar "POST", "PUT", etc., según lo que necesites
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
        // Agrega cualquier otro header necesario como Authorization, etc.
      },
      body: JSON.stringify(lab)
    });

    if (!response.ok) {
      return null;
      //throw new Error("Error en la solicitud");
    }

    
    const data = await response.json();
    console.log(data);
    return data; // Aquí puedes retornar los datos para usarlos en tu componente
  } catch (error) {
    console.error("Error al llamar a la API:", error);
    throw error; // Lanza el error para manejarlo en otro lugar si es necesario
  }
};



export async function fetchOperatingSystems() {
  return [
    {
      id: "ubuntu",
      name: "Ubuntu"
    },
    {
      id: "windows_server",
      name: "Windows Server"
    },
    {
      id: "centOS",
      name: "CentOS"
    },
  ]; 
}

export async function fetchDataBases() {
  return [
    {
      id: "postgres",
      name: "Postgres"
    },
    {
      id: "mysql",
      name: "MySql"
    },
    {
      id: "sqlserver",
      name: "SQLServer"
    },
  ]; 
}