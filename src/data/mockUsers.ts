import { User } from "../types";

const mockUsers = [
    {
      name: 'Alice Johnson',
      id: '001',
      incorporatedOn: '2022-01-15',
      image: '/assets/user.jpeg',
      jobDesk: 'Answering guest inquiries, directing phone calls, coordinating travel plans, and more.',
      schedule: 'Monday, Wednesday',
      phone: '555-1234',
      status: 'Active',
    },
    {
      name: 'Bob Smith',
      id: '002',
      incorporatedOn: '2022-02-20',
      image: '/assets/user.jpeg',
      jobDesk: 'Managing front desk operations, overseeing staff, and ensuring guest satisfaction.',
      schedule: 'Tuesday, Thursday',
      phone: '555-5678',
      status: 'Inactive',
    },
    {
      name: 'Charlie Davis',
      id: '003',
      incorporatedOn: '2022-03-25',
      image: '/assets/user.jpeg',
      jobDesk: 'Coordinating housekeeping activities, managing laundry services, and maintaining cleanliness.',
      schedule: 'Wednesday, Friday',
      phone: '555-8765',
      status: 'Active',
    },
    {
      name: 'Edward Wilson',
      id: '005',
      incorporatedOn: '2022-05-05',
      image: '/assets/user.jpeg',
      jobDesk: 'Managing restaurant operations, overseeing food and beverage services, and ensuring guest satisfaction.',
      schedule: 'Friday, Sunday',
      phone: '555-7890',
      status: 'Active',
    },
    {
      name: 'Diana Evans',
      id: '004',
      incorporatedOn: '2022-04-30',
      image: '/assets/user.jpeg',
      jobDesk: 'Organizing events, handling guest reservations, and providing concierge services.',
      schedule: 'Thursday, Saturday',
      phone: '555-4321',
      status: 'Inactive',
    },
  ];

export default mockUsers;