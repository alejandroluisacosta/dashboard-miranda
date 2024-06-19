import styled from "styled-components";

const MainContainer = styled.div`
    display: flex;
    margin: 0 50px 40px;
    padding: 30px;
    background-color: white;
    img {
        width: 192px;
        height: 92px;
        // height: 0px;
        // padding-bottom: 5%;
        background-image: url('/assets/HotelRoom3.jpeg');
        // background-size: cover;
        // background-position: center;
        // background-repeat: no-repeat;
        margin-right: 20px;
        border-radius: 8px;
    }
`; 

const InfoContainer = styled.div`
    p {
        font-size: 20px;
        margin-bottom: 15px;
    }
    div {
        display: flex;
        align-items: center;
        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
        p {
            margin: 0;
            font-size: 14px;
        }
        p:nth-child(2) {
            margin-right: 20px;
        }
        p:nth-child(3) {
            color: var(--gray);
        }
    }
`;

const NumberContainer = styled.div`
`;



const BookingSummary = () => {
    return (
        <MainContainer>
                <img src="/assets/HotelRoom3.jpeg" alt="Room"/>
                <InfoContainer>
                    <p>Queen Bed A-12234</p>
                    <div>
                        <img src="/assets/user.jpeg" alt="Client"/>
                        <p>James Sukardi</p>
                        <p>10 min ago</p>
                    </div>
                </InfoContainer>
                <NumberContainer>
                    <p>5</p>
                </NumberContainer>
        </MainContainer>
    )
}

export default BookingSummary;