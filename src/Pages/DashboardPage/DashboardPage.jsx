import { Navigate, useNavigate } from "react-router-dom";
import SideBarComponent from "../../Components/SideBarComponent/SideBarComponent";
import styled from "styled-components";
import { FaHotel } from "react-icons/fa";
import { LuBedDouble, LuCalendarCheck2 } from "react-icons/lu";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import Header from "../../Components/Header";
import BookingSummary from "../../Components/BookingSummary";


const mockData = [
    {"month":1,"bookings":8023,"occupation":802,"check-ins":152,"check-outs":257},
{"month":2,"bookings":6304,"occupation":736,"check-ins":216,"check-outs":657},
{"month":3,"bookings":2074,"occupation":231,"check-ins":175,"check-outs":987},
{"month":4,"bookings":7985,"occupation":576,"check-ins":400,"check-outs":107}
]

const Dashboard = styled.div`
    background-color: #F8F8F8;
    .page-container {
        display: flex;
        overflow: hidden;
    }

    .calendar-graph-container {
        display: flex;
        justify-content: space-between;
        margin: 0 50px;
        .calendar, .graph {
            width: 500px;
            height: 400px;
            background-color: white;
        }
    }
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

const IconContainer = styled.div`
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

const DashboardPage = () => {

    let isLoggedIn = localStorage.getItem('token');

    const navigate = useNavigate();
    const logoutHandler = () => {
        localStorage.setItem('token', 'false');
        navigate('login');
    }

    return (
        <>
            {
            isLoggedIn && isLoggedIn !== 'false' ? 
            <>
                <Dashboard>
                    <div className="page-container">
                        <SideBarComponent/>
                        <div className="main-content">
                            <Header/>
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
                            <div className="calendar-graph-container">
                                <div className="calendar"></div>
                                <div className="graph"></div>
                            </div>
                            <BookingSummary/>
                        </div>
                    </div>
                </Dashboard>
            </>
            :
            <Navigate to="/login"/>
            }
        </>
    )
}

export default DashboardPage;