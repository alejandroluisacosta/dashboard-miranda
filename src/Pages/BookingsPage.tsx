import styled from "styled-components";
import Header from "../Components/Header";
import FilterTabs from "../Components/FilterTabs";
import React, { useEffect, useState } from "react";
import FilterInput from "../Components/FilterInput";
import { GetBookingsThunk, RemoveBookingThunk } from "../Features/Bookings";
import { Link } from "react-router-dom";
import Table from "../Components/Table";
import SideBar from "../Components/SideBar";
import { Booking, Column } from "../types";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { toast } from "react-toastify";

const StyledBookings = styled.div`
    background-color: var(--light-gray);
    .filter-container {
      display: flex;
      align-items: center;
      margin: 50px 50px 30px;
    }
    .add-button {
        padding: 10px 18px;
        background-color: var(--dark-green);
        border-radius: 12px;
        color: white;
        font-size: 14px;
        margin-left: 50px;
    }
`;

const StyledStatus = styled.div`
    position: relative;
    border-bottom: 0 !important;
    span {
      position: absolute;
      right: 0;
      top: 50%;
    }
`;

const StyledGuestColumn = styled.div`
  border-bottom: 0 !important;
  div {
    border-bottom: 0 !important;
  }
  a {
      text-decoration: none;
      color: inherit; 
  }
`;

const BookingsPage = () => {

    const columns: Column<Booking>[] = [
      {
      label: 'Guest',
      display: (row: Booking) => (
        <StyledGuestColumn>
            <Link to={row._id}>
              <p>{row.name}</p>
              <p>{`#${row._id}`}</p>
            </Link>
          </StyledGuestColumn>
        )
      },
      {
        label: 'Order Date',
        property: 'orderDate'
      },
      {
        label: 'Check In',
        property: 'checkInDate'
      },
      {
        label: 'Check Out',
        property: 'checkOutDate'
      },
      {
        label: 'Special Request',
        display: (row: Booking) => (
          row.specialRequest ? <button>View Notes</button> : <button disabled>View Notes</button>
        )
      },
      {
        label: 'Room Type',
        property: 'roomType'
      },
      {
        label: 'Status',
        display: (row: Booking) => (
          <StyledStatus>
            <p>{row.status}</p>
            <span className="material-symbols-outlined" onClick={() => dispatch(RemoveBookingThunk(row._id))}>delete</span>
          </StyledStatus>
        )
      },
    ];

    const [renderedBookings, setRenderedBookigs] = useState<Booking[]>([]);
    const [fetched, setFetched] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const bookings: Booking[] = useAppSelector(state => state.Bookings.items);

    const sortBookingsHandler = (value: string): void => {
      const allBookings = [...bookings];
      if (value === 'inProgress') { 
        const today = new Date();
        const filteredBookings: Booking[] = renderedBookings.filter(booking => new Date(booking.checkInDate) < today && new Date(booking.checkOutDate) > today);
        setRenderedBookigs(filteredBookings);
      } else {
        const sortedBookings: Booking[] = allBookings.sort((a, b) => (new Date(a[value as keyof Booking] as string).getTime() as number) - (new Date(b[value as keyof Booking] as string).getTime() as number));
        setRenderedBookigs(sortedBookings);
      }
    }

    const filterByNameHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const allBookings = [...renderedBookings]; 
      if (!event.target.value)
        setRenderedBookigs(bookings);
      else { 
        const bookingsFilteredByName = allBookings.filter(booking => booking.name.toLowerCase().includes(event.target.value.toLowerCase()));
        setRenderedBookigs(bookingsFilteredByName);
      }
    };

    const initialFetch = async () => {
      try {
        await dispatch(GetBookingsThunk()).unwrap();
        setFetched(true);
      } catch (error) {
        toast.error('Failed to fetch bookings');
      }
  }

    useEffect((): void => {
      if (!fetched)
        initialFetch();
      else 
        setRenderedBookigs(bookings);
    }, [fetched, bookings])

    return (
        <>
          <StyledBookings>
              <div className="page-container">
                  <SideBar/>
                  <div className="main-content">
                    <Header/>
                    <div className="filter-container">
                      <FilterTabs 
                        sortHandler={sortBookingsHandler}
                        fields={{
                          'All Bookings': 'orderDate',
                          'Check In': 'checkInDate',
                          'Check Out': 'checkOutDate',
                          'In Progress': 'inProgress',
                        }}
                      />
                      <FilterInput filterByName={filterByNameHandler}/>
                      <Link to='add'><button className="add-button">Add Booking</button></Link>
                    </div>
                    <Table data={renderedBookings} columns={columns}/>
                  </div>
              </div>
          </StyledBookings>
        </>
    )
}

export default BookingsPage;