export const Footer = () => {
    return (
        <footer style={styles.footer}>
            <p style={styles.text}>
                © {new Date().getFullYear()} JStudioReservation - Estudio de Grabación
            </p>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: '#f8f9fa',
        padding: '1.5rem',
        textAlign: 'center',
        borderTop: '1px solid #e2e8f0',
        marginTop: '2rem'
    },
    text: {
        color: '#475569',
        fontSize: '0.9rem',
        margin: 0
    }
};