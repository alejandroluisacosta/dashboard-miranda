import styled from "styled-components";
import { LuBedDouble, LuCalendarCheck2 } from "react-icons/lu";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import Header from "../Components/Header";
import { useState } from "react";
import Comment from "../Components/Comment";
import SideBar from "../Components/SideBar";



const mockData = [
{"month":1,"bookings":8023,"occupation":802,"check-ins":152,"check-outs":257},
{"month":2,"bookings":6304,"occupation":736,"check-ins":216,"check-outs":657},
{"month":3,"bookings":2074,"occupation":231,"check-ins":175,"check-outs":987},
{"month":4,"bookings":7985,"occupation":576,"check-ins":400,"check-outs":107}
]

const mockComments = [
    {
      "text": "I loved my visit. Hoping to get some vacations this summer to come back and enjoy it again!",
      "userName": "John Doe",
      "timestamp": "2023-06-15T08:30:00Z"
    },
    {
      "text": "With a well-crafted experience, Miranda was up to the expectations. I'll surely be back next year.",
      "userName": "Alice Lloyd",
      "timestamp": "2024-06-19T15:25:00Z"
    },
    {
      "text": "Nice vacation. A bit overrated.",
      "userName": "Jane Smith",
      "timestamp": "2023-06-13T12:00:00Z"
    }
  ]
  
const Dashboard = styled.div`
    background-color: #F8F8F8;
    display: flex;
    overflow: hidden;
`;

interface MainContentProps {
    visible: boolean;
}

const StyledMainContent = styled.div<MainContentProps>`
    flex-grow: 1;
    transition: margin-left 0.4s ease-in-out;
    margin-left: ${props => props.visible ? '0' : '-345px'};
`;

const KpiContainer = styled.section`
    display: flex;
    justify-content: space-between;
    margin: 50px; 

        .icon {
            width: 28px;
            height: 28px;
        }
    }
`;

const Kpi = styled.div`
    display: flex;
    align-items: center;
    padding: 30px;
    border-radius: 12px;
    background-color: white;
    width: 22.5%;
`;

interface IconContainerProps {
    selected: boolean;
}

const IconContainer = styled.div<IconContainerProps>`
    width: 65px;
    height: 65px;
    background-color: ${props => props.selected ? 'var(--red)' : 'var(--pink)'};
    color: ${props => props.selected ? 'white' : 'var(--red)'};
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 22px;
`;

const BookingSummaryList = styled.div`
    background-color: white;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    // margin: 0 50px 40px;
    border-radius: 20px;
`;

const CommentList = styled.div`
    margin: 0 50px;
    background-color: white;
    border-radius: 20px;
    padding: 30px 30px 70px;
    h3 {
        font-size: 20px;
        margin-bottom: 30px;
        font-weight: 400;
    }
    div {
        display: flex;
        justify-content: space-between;
        gap: 5%;
    }
    `;

const DashboardPage = () => {

    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const getTimeDifference = (timestamp: number): string => {
        const now = new Date().getTime() as number;
        const then = new Date(timestamp).getTime() as number;
        const differenceInMs = now - then;
        const differenceInMinutes = Math.floor(differenceInMs / 60000);
        return `${differenceInMinutes}`;
      };
      

    return (
            <>
                <Dashboard>
                    <SideBar visible={isSidebarVisible}/>
                    <StyledMainContent visible={isSidebarVisible}>
                        <Header toggleSidebar={toggleSidebar}/>
                        <KpiContainer>
                            <Kpi>
                                <IconContainer selected={false}>
                                    <LuBedDouble className="icon"/>
                                </IconContainer>
                                <div className="data">
                                    <p className="value">{mockData[0].bookings}</p>
                                    <p className="description">New booking</p>
                                </div>
                            </Kpi>
                            <Kpi>
                                <IconContainer selected={true}>
                                    <LuCalendarCheck2 className="icon"/>
                                </IconContainer>
                                <div className="data">
                                    <p className="value">{mockData[0].occupation}</p>
                                    <p className="description">New booking</p>
                                </div>
                            </Kpi>
                            <Kpi>
                                <IconContainer selected={false}>
                                    <BiLogIn className="icon"/>
                                </IconContainer>
                                <div className="data">
                                    <p className="value">{mockData[0]["check-ins"]}</p>
                                    <p className="description">New booking</p>
                                </div>
                            </Kpi>
                            <Kpi>
                                <IconContainer selected={false}>
                                    <BiLogOut className="icon"/>
                                </IconContainer>
                                <div className="data">
                                    <p className="value">{mockData[0]["check-outs"]}</p>
                                    <p className="description">New booking</p>
                                </div>
                            </Kpi>
                        </KpiContainer>
                        <CommentList>
                            <h3>Latest Reviews by Customers</h3>
                            <div>
                                {mockComments.map((comment, index) => (
                                    <Comment comment={comment} timeAgo={getTimeDifference(new Date(comment.timestamp).getTime())} key={index}/>
                                ))}
                            </div>    
                        </CommentList>
                    </StyledMainContent>
                </Dashboard>
        </>
    )
}

export default DashboardPage;