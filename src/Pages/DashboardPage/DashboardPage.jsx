import { Navigate, useNavigate } from "react-router-dom";
import SideBarComponent from "../../Components/SideBarComponent/SideBarComponent";
import styled from "styled-components";
import { FaHotel } from "react-icons/fa";


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
    }

    .kpi-container {
        display: flex;
        justify-content: space-around;
        .kpi {
            display: flex;
            align-items: center;
            .icon {
                margin-right: 22px;
            }
        }
    }
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
                        <h1>Dashboard Page</h1>
                        <button onClick={logoutHandler}>Logout</button>
                            <section className="kpi-container">
                                <div className="kpi">
                                    <FaHotel className="icon"/>
                                    <div className="data">
                                        <p className="value">{mockData[0].bookings}</p>
                                        <p className="description">New booking</p>
                                    </div>
                                </div>
                                <div className="kpi">
                                    <FaHotel className="icon"/>
                                    <div className="data">
                                        <p className="value">{mockData[0].occupation}</p>
                                        <p className="description">New booking</p>
                                    </div>
                                </div>
                                <div className="kpi">
                                    <FaHotel className="icon"/>
                                    <div className="data">
                                        <p className="value">{mockData[0]["check-ins"]}</p>
                                        <p className="description">New booking</p>
                                    </div>
                                </div>
                                <div className="kpi">
                                    <FaHotel className="icon"/>
                                    <div className="data">
                                        <p className="value">{mockData[0]["check-outs"]}</p>
                                        <p className="description">New booking</p>
                                    </div>
                                </div>
                            </section>
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