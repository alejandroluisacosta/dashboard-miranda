import styled, { Styled } from "styled-components"

const StyledFilterTabs = styled.div`
    display: flex;
`;

interface StyledButtonProps {
    selected: boolean;
    value: string;
}

const StyledButton = styled.p<StyledButtonProps>`
    padding: 12px 25px;
    text-decoration: none;
    color: ${props => props.selected ? 'var(--ocher-green)' : '#6E6E6E'};
    border-bottom: ${props => props.selected ? '1px solid var(--ocher-green)' : 'none' }
`;

interface FilterTabsProps {
    sortHandler: (arg: string) => void;
    fields: string[];
}

const FilterTabs: React.FC<FilterTabsProps> = ({ sortHandler, fields }) => {
    return (
        <StyledFilterTabs>
            {Object.entries(fields).map(([key, value], index) => (
                <StyledButton value={value} selected={false} onClick={() => sortHandler(value)} key={index}>{key}</StyledButton>
            ))}
        </StyledFilterTabs>
    )
}

export default FilterTabs;