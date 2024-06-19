import { FaRegCheckCircle } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import styled from "styled-components";

const CommentContainer = styled.div`
    position: relative;
    background-color: white;
    width: 32%;
    max-width: 420px;
    min-height: 275px;
    border-radius: 20px;
    border: 1px solid #EBEBEB;
    padding: 30px;
    p {
        font-size: 16px;
        color: #4E4E4E;
        max-height: 135px;
        max-width: 
    }
`;

const BottomContainer = styled.div`
    position: absolute;
    bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
`

const UserContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
        width: 56px;
        border-radius: 8px;
        margin-right: 20px;
    }
    div {
        display: block !important;
        p:first-child {
            font-size: 16px;
            font-weight: 600;
        }
        p:last-child {
            font-size: 14px;
            color: var(--ocher-green);
        }
    }
`;

const IconsContainer = styled.div`
    display: flex;
    gap: 15px;
    .icon {
        width: 24px;
        height: 24px;
    }
`;

const Comment = ({ comment, timeAgo }) => {
    return (
        <CommentContainer>
            <p>{comment.text}</p>
            <BottomContainer>
                <UserContainer>
                    <img src="/assets/user.jpeg" alt="User image"/>
                    <div>
                        <p>{comment.userName}</p>
                        <p>{timeAgo > 30 ? '+30' : timeAgo} minutes ago</p>
                    </div>
                </UserContainer>
                <IconsContainer>
                    <FaRegCheckCircle className="icon"/>
                    <GiCancel className="icon"/>
                </IconsContainer>
            </BottomContainer>
        </CommentContainer>
    )
}

export default Comment;