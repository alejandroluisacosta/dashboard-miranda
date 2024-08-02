export type AuthState = {
    userName: string | null;
    email: string | null;
    image: string | null;
    token: string | null,
    isLoggedIn: boolean;
}

export type AuthAction =
    { type: 'LOGIN'; payload: { userName: string; email: string; image: string; token: string, isLoggedIn: true; } }
    | { type: 'LOGOUT'; payload: { userName: null; email: null; image: null; token: null, isLoggedIn: false; } }
    | { type: 'UPDATE_USER'; payload: { userName: string; email: string; image: string; token: string, isLoggedIn: true; } }

export type AuthContextType = {
    authState: AuthState;
    authDispatch: React.Dispatch<AuthAction>;
}

export interface Room {
    id: string;
    image: string;
    name: string;
    roomType: string;
    amenities: string;
    rate: number;
    offer: string
    discount: number;
    description?: string;
    status: 'Available' | 'Booked';
    cancellationPolicies?: string;
  }

export interface BookingInput {
    name: string;
    orderDate: string;
    checkInDate: string;
    checkOutDate: string;
    specialRequest?: string;
    roomType: string;
    status: string;
}

export interface Booking extends BookingInput {
    _id: string;
    roomId: string;
}

export interface UserInput {
    name: string;
    userName: string;
    image: string;
    incorporatedOn: string;
    jobDesk: string;
    schedule?: string;
    phone: string;
    password?: string;
    status: string;
    role?: string;
    email?: string;
}

export interface User extends UserInput {
    _id: string;
}

export interface Column<T> {
    label: string;
    display?: (row: T) => JSX.Element;
    property?: string;
}

  export interface CommentInterface {
    text: string;
    userName: string;
    timestamp: string;
  }