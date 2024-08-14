import { Booking, Room } from '../types';

const mockBookings: Booking[] = [
    {
      name: 'John Doe',
      _id: '1234',
      orderDate: '2024-06-01',
      checkInDate: '2024-06-15',
      checkOutDate: '2024-06-17',
      specialRequest: "Could you please arrange for a quiet room overlooking the garden? We prefer a non-smoking room and would appreciate extra towels. Additionally, if possible, could we have a room on a higher floor? Thank you so much for your assistance and attention to these details!",
      roomType: 'Double Room',
      status: 'Check-In',
      roomId: '123',
    },
    {
      name: 'Jane Smith',
      _id: '3456',
      orderDate: '2024-06-02',
      checkInDate: '2024-06-18',
      checkOutDate: '2024-06-25',
      specialRequest: "",
      roomType: 'Single Room',
      status: 'Check-In',
      roomId: '123',

    },
    {
      name: 'Michael Johnson',
      _id: '7890',
      orderDate: '2024-06-05',
      checkInDate: '2024-06-20',
      checkOutDate: '2024-06-23',
      specialRequest: "Hello",
      roomType: 'Suite',
      status: 'Check-Out',
      roomId: '123',

    },
    {
      name: 'Emily Davis',
      _id: '7891',
      orderDate: '2024-06-08',
      checkInDate: '2024-06-25',
      checkOutDate: '2024-06-28',
      specialRequest: "",
      roomType: 'Double Room',
      status: 'Check-Out',
      roomId: '123',

    },
    {
      name: 'Daniel Wilson',
      _id: '7892',
      orderDate: '2024-06-10',
      checkInDate: '2024-06-22',
      checkOutDate: '2024-06-27',
      specialRequest: "Hello again",
      roomType: 'Single Room',
      status: 'Check-In',
      roomId: '123',

    }
  ];

  export default mockBookings;