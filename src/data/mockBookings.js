const mockBookings = [
    {
      name: 'John Doe',
      id: '#1234',
      orderDate: '2024-06-01',
      checkInDate: '2024-06-15',
      checkOutDate: '2024-06-17',
      specialRequest: "Could you please arrange for a quiet room overlooking the garden? We prefer a non-smoking room and would appreciate extra towels. Additionally, if possible, could we have a room on a higher floor? Thank you so much for your assistance and attention to these details!",
      roomType: 'Double Room',
      status: 'booked',
    },
    {
      name: 'Jane Smith',
      id: '#3456',
      orderDate: '2024-06-02',
      checkInDate: '2024-06-18',
      checkOutDate: '2024-06-25',
      specialRequest: false,
      roomType: 'Single Room',
      status: 'pending',
    },
    {
      name: 'Michael Johnson',
      id: '#7890',
      orderDate: '2024-06-05',
      checkInDate: '2024-06-20',
      checkOutDate: '2024-06-23',
      specialRequest: true,
      roomType: 'Suite',
      status: 'cancelled'
    },
    {
      name: 'Emily Davis',
      id: '#7891',
      orderDate: '2024-06-08',
      checkInDate: '2024-06-25',
      checkOutDate: '2024-06-28',
      specialRequest: false,
      roomType: 'Double Room',
      status: 'booked'
    },
    {
      name: 'Daniel Wilson',
      id: '#7892',
      orderDate: '2024-06-10',
      checkInDate: '2024-06-22',
      checkOutDate: '2024-06-27',
      specialRequest: true,
      roomType: 'Single Room',
      status: 'pending'
    }
  ];

  export default mockBookings;