import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import './Homepage.css';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import AppearSensor from './AppearSensor';

function Homepage() {
  function divider(width = 75) {
    return (
      <div className="d-flex justify-content-center my-3">
        <div className="divider pt-1 bg-homeHighlight" style={{ width: `${width}px` }}></div>
      </div>
    );
  }

  function counter(value) {
    return (
      <AppearSensor>
        {({ hasBeenVisible }) =>
          hasBeenVisible
            ? <CountUp
              start={0}
              end={value}
              className="text-homeHighlight"
              style={{ fontSize: '4rem' }} />
            : <span
              className="text-homeHighlight"
              style={{ fontSize: '4rem' }}
            >{value}</span>
        }
      </AppearSensor>
    );
  }

  return (
    <>
      <Navbar bg="homeDark" className="px-0 py-2 text-homeWhiteFont">
        <div className="brand-wrapper ml-3 ml-sm-5">
          <Link to="/">
            <img src="/images/logo.svg" alt="logo" className="logo" />
          </Link>
        </div>
        <Link to="/login" className="ml-auto mr-3 mr-sm-5">
          <Button variant="homeHighlight" className="text-homeWhiteFont button-round">PRIJAVI SE</Button>
        </Link>
      </Navbar>

      <Container fluid className="px-0">
        <div className="text-center header d-flex align-content-center justify-content-center" style={{ backgroundImage: 'url(images/header_image.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="my-auto">
            <p className="text-homeWhiteFont text-uppercase py-2 header-subtitle">Pružamo najvišu kvalitetu</p>
            <h1 className="text-homeWhiteFont font-weight-bold py-2 header-title">Davanje budućnosti Vašoj tehnologiji</h1>
          </div>
        </div>
      </Container>

      <Container fluid>
        <Row className="row-eq-height">
          <Col xs={12} sm={6} className="p-5 bg-homeDark text-center">
            <h5 className="text-homeWhiteFont text-weight-bold text-uppercase">Pronađite odgovarajuće usluge servisa</h5>
            <p className="text-homeWhiteFont">Pomoći ćemo Vašem uređaju da opet radi brzo i pouzdano</p>
            <Link to="/signup/user">
              <Button variant="homeHighlight" className="button-round">REGISTRACIJA</Button>
            </Link>
          </Col>
          <Col xs={12} sm={6} className="p-5 bg-homeLight text-center text-weight-bold">
            <h5 className="text-weight-bold text-uppercase">Ponudite usluge servisa uređaja</h5>
            <p>Kvalitetan i profesionalan popravak i nadogradnja svih modela uređaja</p>
            <Link to="/signup/service">
              <Button variant="homeHighlight" className="button-round">REGISTRACIJA</Button>
            </Link>
          </Col>
        </Row>
      </Container>

      <Container className="py-5">
        <div className="text-center">
          <h4 className="text-uppercase font-weight-bold">Servisi</h4>
          {divider()}
          <p>Servisi u koje se možete pouzdati</p>
        </div>

        <Row>
          <Col xs={12} md={4}>
            <div className="text-center">
              <img className="img-fluid" src="/images/servis_racunala.jpg" alt="Servis računala" />
              <h5 className="text-uppercase font-weight-bold pt-3">Servis računala</h5>
              <p>Usluge servisa svih vrsta računala - desktopa, laptopa ili notepada te tableta</p>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div className="text-center">
              <img className="img-fluid" src="/images/servis_mobitela.jpg" alt="Servis mobitela" />
              <h5 className="text-uppercase font-weight-bold pt-3">Servis mobitela</h5>
              <p>Usluge servisa svih poznatih brendova pametnih telefona te pametnih satova</p>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div className="text-center">
              <img className="img-fluid" src="/images/servis_konzola.jpg" alt="Servis konzola" />
              <h5 className="text-uppercase font-weight-bold pt-3">Servis konzola</h5>
              <p>Usluge servisa svih generacija i modela konzola, ručnih konzola i popravak retro igračih konzola</p>
            </div>
          </Col>
        </Row>
      </Container>

      <Container fluid className="px-0 pt-5 pb-5 bg-homeLight">
        <div className="text-center pb-4">
          <h4 className="text-uppercase font-weight-bold">O nama</h4>
          {divider()}
          <p>Nova perspektiva pružanja i dobivanja usluga</p>
        </div>
        <Container>
          <Row className="align-items-center">
            <Col xs={12} lg={6}>
              <img src="/images/o_nama.jpg" alt="O nama" className="img-fluid" />
            </Col>
            <Col xs={12} lg={6} className="my-3">
              <p>Mi brinemo za Vaše uređaje, a to uključuje partnerstva s najboljim i najpouzdanijim ovlaštenim servisima koji će izvršiti Vaše popravke.</p>
              <p>Naš je krajnji cilj upariti korisnike s odgovarajućim servisom koji nudi usluge popravka. U tu svrhu  razvili smo sustav koji klasificira i standardizira pojedine zahtjeve korisnika. To nam omogućuje da ovlašteni servisi potencijalnim korisnicima ponude kvalitetan i profesionalan popravak uređaja.</p>
              <p>Želimo Vam pružiti najbolju uslugu popravka.</p>
              <p>Razumijevajući potrebe korisnika, u tren oka pretvaramo probleme s uređajima u optimalna rješenja. Ponosni smo na stručnost koja se pretvorila u nebrojene uspješne popravke i sretne kupce.</p>
              <p>Doista nam je stalo do zadovoljstva korisnika i kvaliteta usluga!</p>
            </Col>
          </Row>
        </Container>
      </Container>

      <Container className="my-5 text-center">
        <div>
          <h4 className="text-uppercase font-weight-bold">Zašto odabrati nas?</h4>
          {divider()}
          <p>Naša platforma omogućuje Vam da svojim potencijalnim kupcima ponudite kvalitetan i profesionalan popravak uređaja!</p>
          <p>Poboljšajte učinkovitost, iskoristite tehnologiju i pružite bolja iskustva korisnika s modernim tehnološkim uslugama dostupnim širom Hrvatske.</p>
        </div>

        <Row className="icons">
          <Col xs={12} sm={6} lg={3} className="px-2 py-2">
            <span className="fas fa-stack fa-3x">
              <i className="fas fa-circle fa-stack-2x text-homeHighlight"></i>
              <i className="fas fa-user-shield fa-stack-1x text-homeWhiteFont"></i>
            </span>
            <h5 className="text-uppercase font-weight-bold my-3">Integritet</h5>
            {divider()}
            <p className="pt-3">Transparentnost je ono što nas definira. Nastojimo stvoriti jasne dugoročne poslovne odnose i odnose s kupcima.</p>
          </Col>
          <Col xs={12} sm={6} lg={3} className="px-2 py-2">
            <span className="fas fa-stack fa-3x">
              <i className="fas fa-circle fa-stack-2x text-homeHighlight"></i>
              <i className="fas fa-users fa-stack-1x text-homeWhiteFont"></i>
            </span>
            <h5 className="text-uppercase font-weight-bold my-3">Predanost</h5>
            {divider()}
            <p className="pt-3">Zahvaljujući marljivom radu svakog servisa, svi možemo napredovati te tako stvoriti dodatnu vrijednost i postići ciljeve.</p>
          </Col>
          <Col xs={12} sm={6} lg={3} className="px-2 py-2">
            <span className="fas fa-stack fa-3x">
              <i className="fas fa-circle fa-stack-2x text-homeHighlight"></i>
              <i className="fas fa-award fa-stack-1x text-homeWhiteFont"></i>
            </span>
            <h5 className="text-uppercase font-weight-bold my-3">Izvrsnost</h5>
            {divider()}
            <p className="pt-3">Svaki sklopljeni posao ostvaruje se na ispravan i najpogodniji način, poštujući sve ovlaštene servisere i korisnike.</p>
          </Col>
          <Col xs={12} sm={6} lg={3} className="px-2 py-2">
            <span className="fas fa-stack fa-3x">
              <i className="fas fa-circle fa-stack-2x text-homeHighlight"></i>
              <i className="fas fa-user-check fa-stack-1x text-homeWhiteFont"></i>
            </span>
            <h5 className="text-uppercase font-weight-bold my-3">Korisnik na prvom mjestu</h5>
            {divider()}
            <p className="pt-3">Razumijevajući potrebe korisnika, u tren oka pretvaramo probleme s uređajima u optimalna rješenja.</p>
          </Col>
        </Row>
      </Container>

      <Container fluid className="bg-homeLight">
        <Row className="p-4 text-center font-weight-bold">
          <Col xs={12} sm={4} className="py-2">
            {counter(3225)}
            <p className="text-uppercase">Popravljenih računala</p>
          </Col>
          <Col xs={12} sm={4} className="py-2">
            {counter(2134)}
            <p className="text-uppercase">Popravljenih mobitela</p>
          </Col>
          <Col xs={12} sm={4} className="py-2">
            {counter(1139)}
            <p className="text-uppercase">Popravljenih konzola</p>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}

export default Homepage;
