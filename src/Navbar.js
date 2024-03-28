import { Navbar, Row, Col, Image } from 'react-bootstrap';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';


const NavBar = ({ title }) => {
    return (
        <Navbar id='inicio' expand="lg" style={{
            backgroundColor: '#1A3E5C',
            minWidth: '100vh',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', 
            borderRadius: '10px',
            opacity: '0.9' ,
            minHeight: "12vh"
        }}>
            <Row className="w-100">
                <Col xs={12} md={4} className="d-flex justify-content-center justify-content-md-start">

                </Col>
                <Col xs={12} md={4} className="d-flex justify-content-center align-items-center">
                    <span className='fira-sans-condensed-black' style={{ fontSize: '35px', color: 'White'}}>
                        {title}
                    </span>
                </Col>
            </Row>
        </Navbar>
        
    );
};

export default NavBar;