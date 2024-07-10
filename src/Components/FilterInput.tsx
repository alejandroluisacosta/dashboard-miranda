import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
    height: 100%;
    padding-left: 5px;
`;

interface FilterInputProps {
    filterByName: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterInput: React.FC<FilterInputProps> = ({ filterByName }) => {
    return (
        <StyledInput placeholder="Filter by name" onChange={filterByName} type="text"/>
    )
}

export default FilterInput;