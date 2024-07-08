import styled from "styled-components"

const StyledFilterTabs = styled.div`
    display: flex;
`;

const StyledButton = styled.p`
    padding: 12px 25px;
    text-decoration: none;
    color: ${props => props.selected ? 'var(--ocher-green)' : '#6E6E6E'};
    border-bottom: ${props => props.selected ? '1px solid var(--ocher-green)' : 'none' }
`;

const FilterTabs = ({ sortHandler, fields }) => {
    return (
        <StyledFilterTabs>
            {Object.entries(fields).map(([key, value], index) => (
                <StyledButton value={value} selected={false} onClick={() => sortHandler(value)} key={index}>{key}</StyledButton>
            ))}
        </StyledFilterTabs>
    )
}

export default FilterTabs;