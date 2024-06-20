import styled from "styled-components"

const StyledFilterTabs = styled.div`
    display: flex;
    margin: 50px 50px 35px;
`;

const StyledButton = styled.p`
    padding: 12px 25px;
    text-decoration: none;
    color: ${props => props.selected ? 'var(--ocher-green)' : '#6E6E6E'};
    border-bottom: ${props => props.selected ? '1px solid var(--ocher-green)' : 'none' }
`;

const FilterTabs = ({ sortBookings }) => {
    return (
        <StyledFilterTabs>
            <StyledButton value="orderDate" selected={true} onClick={event => sortBookings(event, 'orderDate')}>All Bookings</StyledButton>
            <StyledButton value="checkInDate" selected={false} onClick={event => sortBookings(event, 'checkInDate')}>Check In</StyledButton>
            <StyledButton value="checkOutDate" selected={false} onClick={event => sortBookings(event, 'checkOutDate')}>Check Out</StyledButton>
            <StyledButton value="inProgress" selected={false} onClick={event => sortBookings(event, 'inProgress')}>In Progress</StyledButton>
        </StyledFilterTabs>
    )
}

export default FilterTabs;