import styled from "styled-components";

const StyledInput = styled.input`
    height: 100%;
    padding-left: 5px;
`;

const FilterInput = ({ filterByName }) => {
    return (
        <StyledInput placeholder="Filter by name" onChange={filterByName} type="text"/>
    )
}

export default FilterInput;