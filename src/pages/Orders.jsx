import PageHeader from "../components/PageHeader";

// Generate 30 Data Orders
const ordersData = [
  { orderId: "ORD-1001", customerName: "Andi Saputra", status: "Completed", totalPrice: 150000, orderDate: "2024-04-01" },
  { orderId: "ORD-1002", customerName: "Budi Santoso", status: "Pending", totalPrice: 250000, orderDate: "2024-04-02" },
  { orderId: "ORD-1003", customerName: "Citra Lestari", status: "Cancelled", totalPrice: 75000, orderDate: "2024-04-03" },
  { orderId: "ORD-1004", customerName: "Dewi Anggraini", status: "Completed", totalPrice: 500000, orderDate: "2024-04-04" },
  { orderId: "ORD-1005", customerName: "Eko Prasetyo", status: "Pending", totalPrice: 120000, orderDate: "2024-04-05" },
  { orderId: "ORD-1006", customerName: "Fina Melati", status: "Completed", totalPrice: 340000, orderDate: "2024-04-06" },
  { orderId: "ORD-1007", customerName: "Gilang Ramadhan", status: "Completed", totalPrice: 90000, orderDate: "2024-04-07" },
  { orderId: "ORD-1008", customerName: "Hani Safitri", status: "Pending", totalPrice: 450000, orderDate: "2024-04-08" },
  { orderId: "ORD-1009", customerName: "Indra Wijaya", status: "Cancelled", totalPrice: 200000, orderDate: "2024-04-09" },
  { orderId: "ORD-1010", customerName: "Joko Anwar", status: "Completed", totalPrice: 175000, orderDate: "2024-04-10" },
  { orderId: "ORD-1011", customerName: "Kartika Sari", status: "Completed", totalPrice: 850000, orderDate: "2024-04-11" },
  { orderId: "ORD-1012", customerName: "Lukman Hakim", status: "Pending", totalPrice: 55000, orderDate: "2024-04-12" },
  { orderId: "ORD-1013", customerName: "Maya Putri", status: "Completed", totalPrice: 320000, orderDate: "2024-04-13" },
  { orderId: "ORD-1014", customerName: "Nanda Syahputra", status: "Cancelled", totalPrice: 110000, orderDate: "2024-04-14" },
  { orderId: "ORD-1015", customerName: "Oka Antara", status: "Completed", totalPrice: 950000, orderDate: "2024-04-15" },
  { orderId: "ORD-1016", customerName: "Putri Rahma", status: "Pending", totalPrice: 210000, orderDate: "2024-04-16" },
  { orderId: "ORD-1017", customerName: "Qori Amelia", status: "Completed", totalPrice: 670000, orderDate: "2024-04-17" },
  { orderId: "ORD-1018", customerName: "Rizky Febian", status: "Completed", totalPrice: 135000, orderDate: "2024-04-18" },
  { orderId: "ORD-1019", customerName: "Sari Indah", status: "Cancelled", totalPrice: 400000, orderDate: "2024-04-19" },
  { orderId: "ORD-1020", customerName: "Taufik Hidayat", status: "Pending", totalPrice: 280000, orderDate: "2024-04-20" },
  { orderId: "ORD-1021", customerName: "Umar Bakri", status: "Completed", totalPrice: 590000, orderDate: "2024-04-21" },
  { orderId: "ORD-1022", customerName: "Vina Panduwinata", status: "Completed", totalPrice: 145000, orderDate: "2024-04-22" },
  { orderId: "ORD-1023", customerName: "Wawan Hermawan", status: "Pending", totalPrice: 880000, orderDate: "2024-04-23" },
  { orderId: "ORD-1024", customerName: "Xena Larasati", status: "Completed", totalPrice: 310000, orderDate: "2024-04-24" },
  { orderId: "ORD-1025", customerName: "Yudi Ardiansyah", status: "Cancelled", totalPrice: 620000, orderDate: "2024-04-25" },
  { orderId: "ORD-1026", customerName: "Zahra Nurul", status: "Completed", totalPrice: 195000, orderDate: "2024-04-26" },
  { orderId: "ORD-1027", customerName: "Ahmad Dhani", status: "Pending", totalPrice: 730000, orderDate: "2024-04-27" },
  { orderId: "ORD-1028", customerName: "Bella Safira", status: "Completed", totalPrice: 260000, orderDate: "2024-04-28" },
  { orderId: "ORD-1029", customerName: "Candra Wijaya", status: "Completed", totalPrice: 480000, orderDate: "2024-04-29" },
  { orderId: "ORD-1030", customerName: "Dinda Hauw", status: "Pending", totalPrice: 105000, orderDate: "2024-04-30" }
];

export default function Orders() {
    return (
        <div style={{ padding: '20px' }}>
            <PageHeader 
                title="Orders" 
                breadcrumb={["Dashboard", "Orders"]} 
                actionLabel="Add Order" 
                actionLink="/add-order" 
            />
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer Name</th>
                            <th>Status</th>
                            <th>Total Price (Rp)</th>
                            <th>Order Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordersData.map((order, index) => (
                            <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                                <td>{order.orderId}</td>
                                <td>{order.customerName}</td>
                                <td>
                                    <span style={{ 
                                        color: order.status === 'Completed' ? 'green' : order.status === 'Cancelled' ? 'red' : 'orange',
                                        fontWeight: 'bold'
                                    }}>
                                        {order.status}
                                    </span>
                                </td>
                                <td>{order.totalPrice.toLocaleString('id-ID')}</td>
                                <td>{order.orderDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}