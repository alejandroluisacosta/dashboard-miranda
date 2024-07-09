import styled from "styled-components";

interface StyledButtonProps {
    $isEditing: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
    background-color: ${props => props.$isEditing ? 'rgb(0, 0, 0)' : '#EBF1EF'} !important;
    color: ${props => props.$isEditing ? '#EBF1EF' : 'black' } !important;
    right: 30% !important;
`;

interface ButtonProps {
    content: string;
    $isEditing: boolean;
}

const Button: React.FC<ButtonProps> = ({ content, $isEditing }) => {
    return (
        <StyledButton $isEditing={$isEditing}>{content}</StyledButton>
    )
}

export default Button;