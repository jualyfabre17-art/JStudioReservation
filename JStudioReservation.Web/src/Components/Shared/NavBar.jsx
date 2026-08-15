import { Link } from 'react-router-dom';

export const NavBar = () => {
    return (
        <nav style={styles.navbar}>
            <div style={styles.container}>
                <Link to="/" style={styles.brand}>
                    🎵 JStudioReservation
                </Link>
                <div style={styles.links}>
                    <Link to="/artists" style={styles.link}>Artistas</Link>
                    <Link to="/rooms" style={styles.link}>Salas</Link>
                    <Link to="/extraservices" style={styles.link}>Servicios</Link>
                    <Link to="/bookings" style={styles.link}>Reservas</Link>
                </div>
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        backgroundColor: '#1e293b',
        padding: '1rem 2rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
    },
    brand: {
        color: '#ffffff',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textDecoration: 'none'
    },
    links: {
        display: 'flex',
        gap: '2rem'
    },
    link: {
        color: '#e2e8f0',
        textDecoration: 'none',
        fontSize: '1rem',
        transition: 'color 0.2s',
        padding: '0.5rem 0'
    }
};