import PageHeader from "../components/PageHeader";

// Generate 30 Data Customer
const customersData = [
  { customerId: "CUST-001", customerName: "Andi Saputra", email: "andi@example.com", phone: "081234567801", loyalty: "Gold" },
  { customerId: "CUST-002", customerName: "Budi Santoso", email: "budi@example.com", phone: "081234567802", loyalty: "Silver" },
  { customerId: "CUST-003", customerName: "Citra Lestari", email: "citra@example.com", phone: "081234567803", loyalty: "Bronze" },
  { customerId: "CUST-004", customerName: "Dewi Anggraini", email: "dewi@example.com", phone: "081234567804", loyalty: "Gold" },
  { customerId: "CUST-005", customerName: "Eko Prasetyo", email: "eko@example.com", phone: "081234567805", loyalty: "Silver" },
  { customerId: "CUST-006", customerName: "Fina Melati", email: "fina@example.com", phone: "081234567806", loyalty: "Bronze" },
  { customerId: "CUST-007", customerName: "Gilang Ramadhan", email: "gilang@example.com", phone: "081234567807", loyalty: "Silver" },
  { customerId: "CUST-008", customerName: "Hani Safitri", email: "hani@example.com", phone: "081234567808", loyalty: "Gold" },
  { customerId: "CUST-009", customerName: "Indra Wijaya", email: "indra@example.com", phone: "081234567809", loyalty: "Bronze" },
  { customerId: "CUST-010", customerName: "Joko Anwar", email: "joko@example.com", phone: "081234567810", loyalty: "Silver" },
  { customerId: "CUST-011", customerName: "Kartika Sari", email: "kartika@example.com", phone: "081234567811", loyalty: "Gold" },
  { customerId: "CUST-012", customerName: "Lukman Hakim", email: "lukman@example.com", phone: "081234567812", loyalty: "Bronze" },
  { customerId: "CUST-013", customerName: "Maya Putri", email: "maya@example.com", phone: "081234567813", loyalty: "Silver" },
  { customerId: "CUST-014", customerName: "Nanda Syahputra", email: "nanda@example.com", phone: "081234567814", loyalty: "Gold" },
  { customerId: "CUST-015", customerName: "Oka Antara", email: "oka@example.com", phone: "081234567815", loyalty: "Bronze" },
  { customerId: "CUST-016", customerName: "Putri Rahma", email: "putri@example.com", phone: "081234567816", loyalty: "Silver" },
  { customerId: "CUST-017", customerName: "Qori Amelia", email: "qori@example.com", phone: "081234567817", loyalty: "Gold" },
  { customerId: "CUST-018", customerName: "Rizky Febian", email: "rizky@example.com", phone: "081234567818", loyalty: "Bronze" },
  { customerId: "CUST-019", customerName: "Sari Indah", email: "sari@example.com", phone: "081234567819", loyalty: "Silver" },
  { customerId: "CUST-020", customerName: "Taufik Hidayat", email: "taufik@example.com", phone: "081234567820", loyalty: "Gold" },
  { customerId: "CUST-021", customerName: "Umar Bakri", email: "umar@example.com", phone: "081234567821", loyalty: "Bronze" },
  { customerId: "CUST-022", customerName: "Vina Panduwinata", email: "vina@example.com", phone: "081234567822", loyalty: "Silver" },
  { customerId: "CUST-023", customerName: "Wawan Hermawan", email: "wawan@example.com", phone: "081234567823", loyalty: "Gold" },
  { customerId: "CUST-024", customerName: "Xena Larasati", email: "xena@example.com", phone: "081234567824", loyalty: "Bronze" },
  { customerId: "CUST-025", customerName: "Yudi Ardiansyah", email: "yudi@example.com", phone: "081234567825", loyalty: "Silver" },
  { customerId: "CUST-026", customerName: "Zahra Nurul", email: "zahra@example.com", phone: "081234567826", loyalty: "Gold" },
  { customerId: "CUST-027", customerName: "Ahmad Dhani", email: "ahmad@example.com", phone: "081234567827", loyalty: "Bronze" },
  { customerId: "CUST-028", customerName: "Bella Safira", email: "bella@example.com", phone: "081234567828", loyalty: "Silver" },
  { customerId: "CUST-029", customerName: "Candra Wijaya", email: "candra@example.com", phone: "081234567829", loyalty: "Gold" },
  { customerId: "CUST-030", customerName: "Dinda Hauw", email: "dinda@example.com", phone: "081234567830", loyalty: "Bronze" }
];

export default function Customers() {
    return (
        <div style={{ padding: '20px' }}>
            <PageHeader 
                title="Customers" 
                breadcrumb={["Dashboard", "Customers"]} 
                actionLabel="Add Customer" 
                actionLink="/add-customer" 
            />
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
                        <tr>
                            <th>Customer ID</th>
                            <th>Customer Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Loyalty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customersData.map((customer, index) => (
                            <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                                <td>{customer.customerId}</td>
                                <td>{customer.customerName}</td>
                                <td>{customer.email}</td>
                                <td>{customer.phone}</td>
                                <td>{customer.loyalty}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}