import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
    return (

        <footer className="page-footer">
            <br/>
            <div id = 'main-container' className="container text-center text-md-left mt-5">
            <div className="row mt-3 dark-grey-text">
                    <div className="col-md-3 col-lg-4 col-xl-3 mb-4">
                        <h6 className="text-uppercase font-weight-bold">Eventing</h6>
                        <hr className="teal accent-3 mb-4 mt-0 d-inline-block mx-auto" />
                        <p>Nos dedicamos a hacer tus eventos y sueños realidad. ¡ven y únete a la comunidad de eventing en donde encontrarás
                            eventos de todo el mundo!, podrás crear tus eventos de una forma única y personalizada.
                        </p>
                    </div>

                    <div className="col-md-3 col-md-4 col-xl-3 mx-auto mb-md-0 mb-4">
                        <h6 className="text-uppercase font-weight-bold">Contacto</h6>
                        <hr className="teal accent-3 mb-4 mt-0 d-inline-block mx-auto"/>
                        <p>
                            <i className="fas fa-home "></i> Zona 4 Ciudad de Guatemala, <br/>4-36 Edificio Tec II</p>
                        <p>
                            <i className="fas fa-envelope"></i> info@eventing.com</p>
                        <p>
                            <i className="fas fa-phone"></i> + 502 34500209</p>
                    </div>
                </div>
            </div>

            <div className="footer-copyright text-center text-black-50 py-3">© 2021 Copyright
            <br/>
            <a className="dark-grey-text" href="/index">www.eventing.com</a>
            </div>
        </footer>

    )
}

export default Footer;