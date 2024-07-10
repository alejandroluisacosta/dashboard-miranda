export type AuthState = {
    userName: string | null;
    userEmail: string | null;
    isLoggedIn: boolean;
}

export type AuthAction =
    { type: 'LOGIN'; payload: { userName: string; userEmail: string; isLoggedIn: true; } }
    | { type: 'LOGOUT'; payload: { userName: null; userEmail: null; isLoggedIn: false; } }
    | { type: 'UPDATE_USER'; payload: { userName: string; userEmail: string; isLoggedIn: true; } }

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
    offer: string;
    status: 'Available' | 'Booked';
  }

export interface Booking {
    name: string;
    id: string;
    orderDate: string;
    checkInDate: string;
    checkOutDate: string;
    specialRequest: string;
    roomType: string;
    status: string;
    room: Room;
  }

export interface Columns {
    label: string;
    display?: ((arg: Booking) => JSX.Element) | ((arg: Room) => JSX.Element) | ((arg: string) => JSX.Element);
    property?: string;
}

  export interface CommentInterface {
    text: string;
    userName: string;
    timestamp: string;
  }