const mockBookings = [
    {
      identification: {
        name: 'John Doe',
        id: '#1234'
      },
      orderDate: '2024-06-01',
      checkInDate: '2024-06-15',
      checkOutDate: '2024-06-17',
      specialRequest: true,
      roomType: 'Double Room',
      status: 'booked'
    },
    {
      identification: {
        name: 'Jane Smith',
        id: '#3456'
      },
      orderDate: '2024-06-02',
      checkInDate: '2024-06-18',
      checkOutDate: '2024-06-25',
      specialRequest: false,
      roomType: 'Single Room',
      status: 'pending'
    },
    {
      identification: {
        name: 'Michael Johnson',
        id: '#7890'
      },
      orderDate: '2024-06-05',
      checkInDate: '2024-06-20',
      checkOutDate: '2024-06-23',
      specialRequest: true,
      roomType: 'Suite',
      status: 'cancelled'
    },
    {
      identification: {
        name: 'Emily Davis',
        id: '#7891'
      },
      orderDate: '2024-06-08',
      checkInDate: '2024-06-25',
      checkOutDate: '2024-06-28',
      specialRequest: false,
      roomType: 'Double Room',
      status: 'booked'
    },
    {
      identification: {
        name: 'Daniel Wilson',
        id: '#7892'
      },
      orderDate: '2024-06-10',
      checkInDate: '2024-06-22',
      checkOutDate: '2024-06-27',
      specialRequest: true,
      roomType: 'Single Room',
      status: 'pending'
    }
  ];

  export default mockBookings;