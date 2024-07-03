import styled from "styled-components";

const StyledButton = styled.button`
    background-color: ${props => props.$isEditing ? '#EBF1EF' : 'black'} !important;
    position: ${props => props.$isEditing ? 'relative' : 'absolute'} !important;
`;

const Button = ({ content, $isEditing }) => {
    return (
        <StyledButton $isEditing={$isEditing}>{content}</StyledButton>
    )
}

export default Button;