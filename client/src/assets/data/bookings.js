const bookings = [
  {
    id: "B001",
    listing: {
      id: "L001",
      price: 20000000,
    },
    buyer: {
      id: "U001",
      name: "Alice Smith",
    },
    seller: {
      id: "U021",
      name: "John Doe",
    },
    dateBooked: "2025-01-15",
    paymentStatus: "paid",
  },
  {
    id: "B002",
    listing: {
      id: "L002",
      price: 15000000,
    },
    buyer: {
      id: "U002",
      name: "Bob Johnson",
    },
    seller: {
      id: "U022",
      name: "Jane Roe",
    },
    dateBooked: "2025-01-14",
    paymentStatus: "pending",
  },
  {
    id: "B003",
    listing: {
      id: "L003",
      price: 10000000,
    },
    buyer: {
      id: "U003",
      name: "Carol Lee",
    },
    seller: {
      id: "U023",
      name: "Emily Stone",
    },
    dateBooked: "2025-01-13",
    paymentStatus: "cancelled",
  },
  {
    id: "B004",
    listing: {
      id: "L004",
      price: 25000000,
    },
    buyer: {
      id: "U004",
      name: "David Brown",
    },
    seller: {
      id: "U024",
      name: "Tom Baker",
    },
    dateBooked: "2025-01-12",
    paymentStatus: "paid",
  },
  {
    id: "B005",
    listing: {
      id: "L005",
      price: 18000000,
    },
    buyer: {
      id: "U005",
      name: "Emma Wilson",
    },
    seller: {
      id: "U025",
      name: "Olivia Harper",
    },
    dateBooked: "2025-01-11",
    paymentStatus: "pending",
  },
  {
    id: "B006",
    listing: {
      id: "L006",
      price: 30000000,
    },
    buyer: {
      id: "U006",
      name: "Frank Harris",
    },
    seller: {
      id: "U026",
      name: "Michael Green",
    },
    dateBooked: "2025-01-10",
    paymentStatus: "cancelled",
  },
  {
    id: "B007",
    listing: {
      id: "L007",
      price: 12000000,
    },
    buyer: {
      id: "U007",
      name: "Grace Moore",
    },
    seller: {
      id: "U027",
      name: "Sophia Davis",
    },
    dateBooked: "2025-01-09",
    paymentStatus: "paid",
  },
  {
    id: "B008",
    listing: {
      id: "L008",
      price: 22000000,
    },
    buyer: {
      id: "U008",
      name: "Henry Clark",
    },
    seller: {
      id: "U028",
      name: "Liam Scott",
    },
    dateBooked: "2025-01-08",
    paymentStatus: "paid",
  },
  {
    id: "B009",
    listing: {
      id: "L009",
      price: 16000000,
    },
    buyer: {
      id: "U009",
      name: "Ivy Miller",
    },
    seller: {
      id: "U029",
      name: "Ella Brooks",
    },
    dateBooked: "2025-01-07",
    paymentStatus: "pending",
  },
  {
    id: "B010",
    listing: {
      id: "L010",
      price: 14000000,
    },
    buyer: {
      id: "U010",
      name: "Jack Taylor",
    },
    seller: {
      id: "U030",
      name: "Lucas Adams",
    },
    dateBooked: "2025-01-06",
    paymentStatus: "cancelled",
  },
  {
    id: "B011",
    listing: {
      id: "L011",
      price: 19000000,
    },
    buyer: {
      id: "U011",
      name: "Kate Hall",
    },
    seller: {
      id: "U031",
      name: "Mason Young",
    },
    dateBooked: "2025-01-05",
    paymentStatus: "paid",
  },
  {
    id: "B012",
    listing: {
      id: "L012",
      price: 21000000,
    },
    buyer: {
      id: "U012",
      name: "Liam Carter",
    },
    seller: {
      id: "U032",
      name: "James Bennett",
    },
    dateBooked: "2025-01-04",
    paymentStatus: "pending",
  },
  {
    id: "B013",
    listing: {
      id: "L013",
      price: 23000000,
    },
    buyer: {
      id: "U013",
      name: "Mia Turner",
    },
    seller: {
      id: "U033",
      name: "Noah Roberts",
    },
    dateBooked: "2025-01-03",
    paymentStatus: "cancelled",
  },
  {
    id: "B014",
    listing: {
      id: "L014",
      price: 24000000,
    },
    buyer: {
      id: "U014",
      name: "Nathan Walker",
    },
    seller: {
      id: "U034",
      name: "Emma Lewis",
    },
    dateBooked: "2025-01-02",
    paymentStatus: "paid",
  },
  {
    id: "B015",
    listing: {
      id: "L015",
      price: 28000000,
    },
    buyer: {
      id: "U015",
      name: "Olivia Johnson",
    },
    seller: {
      id: "U035",
      name: "Harper Lee",
    },
    dateBooked: "2025-01-01",
    paymentStatus: "pending",
  },
  {
    id: "B016",
    listing: {
      id: "L016",
      price: 17500000,
    },
    buyer: {
      id: "U016",
      name: "Paul Martinez",
    },
    seller: {
      id: "U036",
      name: "William Perez",
    },
    dateBooked: "2024-12-31",
    paymentStatus: "cancelled",
  },
  {
    id: "B017",
    listing: {
      id: "L017",
      price: 19500000,
    },
    buyer: {
      id: "U017",
      name: "Quincy Evans",
    },
    seller: {
      id: "U037",
      name: "Sophia Brown",
    },
    dateBooked: "2024-12-30",
    paymentStatus: "paid",
  },
  {
    id: "B018",
    listing: {
      id: "L018",
      price: 20500000,
    },
    buyer: {
      id: "U018",
      name: "Rose Garcia",
    },
    seller: {
      id: "U038",
      name: "Logan Miller",
    },
    dateBooked: "2024-12-29",
    paymentStatus: "paid",
  },
  {
    id: "B019",
    listing: {
      id: "L019",
      price: 18500000,
    },
    buyer: {
      id: "U019",
      name: "Sam Parker",
    },
    seller: {
      id: "U039",
      name: "Ava Murphy",
    },
    dateBooked: "2024-12-28",
    paymentStatus: "pending",
  },
  {
    id: "B020",
    listing: {
      id: "L020",
      price: 26000000,
    },
    buyer: {
      id: "U020",
      name: "Tina White",
    },
    seller: {
      id: "U040",
      name: "Ethan Martinez",
    },
    dateBooked: "2024-12-27",
    paymentStatus: "cancelled",
  },
];

export default bookings;
