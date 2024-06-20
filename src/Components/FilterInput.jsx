import styled from "styled-components";

const StyledInput = styled.input`
    height: 100%;
    margin-top: 12px;
`;

const FilterInput = ({ filterByName }) => {
    return (
        <StyledInput onChange={filterByName} type="text"/>
    )
}

export default FilterInput;