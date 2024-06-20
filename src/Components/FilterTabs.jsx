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

const FilterTabs = () => {
    return (
        <StyledFilterTabs>
            <StyledButton selected={true}>All Bookings</StyledButton>
            <StyledButton selected={false}>Check In</StyledButton>
            <StyledButton selected={false}>Check Out</StyledButton>
            <StyledButton selected={false}>In Progress</StyledButton>
        </StyledFilterTabs>
    )
}

export default FilterTabs;