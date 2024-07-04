import styled from "styled-components";

const StyledButton = styled.button`
    background-color: ${props => props.$isEditing ? 'rgb(0, 0, 0)' : '#EBF1EF'} !important;
    color: ${props => props.$isEditing ? '#EBF1EF' : 'black' } !important;
    right: 30% !important;
`;

const Button = ({ content, $isEditing }) => {
    return (
        <StyledButton $isEditing={$isEditing}>{content}</StyledButton>
    )
}

export default Button;