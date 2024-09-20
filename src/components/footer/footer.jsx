import css from './footer.module.css'

function Footer() {
    return (
        <footer className={css.footer}>
        <a className={css.tel} href="tel:+1234567890">Call to us</a>
        <address className={css.address}>
                <p>123 Main Street, City, Country</p>
                <p>
                    <a href="https://www.google.com/maps?q=123+Main+Street,+City,+Country" target="_blank" rel="noopener noreferrer">
                        View on Google Maps
                    </a>
                </p>
                <p>
                    <a href="mailto:example@example.com">example@example.com</a>
                </p>
            </address>
        </footer>
    )
}

export default Footer