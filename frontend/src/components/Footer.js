import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const Footer = () => {
    return (
        <Container fluid className="px-0 py-5 bg-gray text-white">
            <Container>
                <Row>
                    <Col xs={12} sm={12} md={4} className="d-flex flex-column align-items-center align-items-md-start">
                        <div className="mb-3">Imaginary logo</div>
                        <p>2021 &copy; eServis. Sva prava pridržana.</p>
                    </Col>
                    <Col xs={0} sm={0} md={2}></Col>
                    <Col xs={12} sm={12} md={6}>
                        <div className="d-flex flex-column flex-md-row flex-wrap align-content-center justify-content-between">
                            <div className="d-flex align-items-center justify-content-between my-2" style={{width: '215px'}}>
                                <div>
                                    <span>Kontaktirajte nas:</span>
                                    <br />
                                    <span>mail@example.com</span>
                                </div>
                                <div>
                                    <span className="fas fa-stack fa-2x">
                                        <i className="fas fa-circle fa-stack-2x text-blueAccent"></i>
                                        <i className="fas fa-envelope fa-stack-1x text-white"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between my-2" style={{width: '215px'}}>
                                <div>
                                    <span>Nazovite nas:</span>
                                    <br />
                                    <span>+385 (01) 6787 510</span>
                                </div>
                                <div>
                                    <span className="fas fa-stack fa-2x">
                                        <i className="fas fa-circle fa-stack-2x text-blueAccent"></i>
                                        <i className="fas fa-phone-alt fa-stack-1x text-white"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default Footer;