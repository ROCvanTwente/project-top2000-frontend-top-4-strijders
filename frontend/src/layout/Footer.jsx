import React from 'react';
import "../css/global.css";

function Footer(state) {
    return (
        <footer
            className="bg-footer d-flex justify-content-center align-items-center mt-auto"
        >
            <div className="container text-center">
                <p className="m-0 pb-2 text-light">
                    © 2024 NPO Radio 2 - TOP 2000. Alle rechten voorbehouden.
                </p>
                <p className="m-0 text-secondary">
                    Deze website is een demonstratie.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
