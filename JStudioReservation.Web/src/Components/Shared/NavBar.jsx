import { Link } from 'react-router-dom';

export const NavBar = () => {
    const styles = {
        navbar: {
            backgroundColor: '#0f172a',
            padding: '1rem 2rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            borderBottom: '3px solid #4f46e5'
        },
        container: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '1200px',
            margin: '0 auto'
        },
        brand: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            color: '#ffffff',
            fontSize: '1.5rem',
            fontWeight: '700',
            textDecoration: 'none',
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            letterSpacing: '-0.02em',
            transition: 'opacity 0.2s ease'
        },
        brandIcon: {
            fontSize: '1.8rem'
        },
        brandSubtitle: {
            fontSize: '0.7rem',
            fontWeight: '400',
            color: '#94a3b8',
            letterSpacing: '0.5px',
            marginLeft: '0.25rem'
        },
        links: {
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center'
        },
        link: {
            color: '#e2e8f0',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: '500',
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            padding: '0.6rem 1.2rem',
            borderRadius: '10px',
            transition: 'all 0.2s ease',
            letterSpacing: '0.2px'
        },
        linkActive: {
            backgroundColor: 'rgba(79, 70, 229, 0.15)',
            color: '#ffffff'
        },
        linkHover: {
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            color: '#ffffff'
        },
        mobileToggle: {
            display: 'none',
            background: 'transparent',
            border: 'none',
            color: '#ffffff',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '0.25rem 0.5rem'
        },
       
        activeLink: {
            backgroundColor: '#4f46e5',
            color: '#ffffff',
            borderRadius: '10px',
            padding: '0.6rem 1.2rem',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: '500',
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            transition: 'all 0.2s ease',
            letterSpacing: '0.2px'
        }
    };

   
    const isActive = (path) => {
        return window.location.pathname === path;
    };

    return (
        <nav style={styles.navbar}>
            <div style={styles.container}>
                <Link to="/" style={styles.brand}>
                    <span style={styles.brandIcon}>🎵</span>
                    <span>
                        JStudio
                        <span style={styles.brandSubtitle}>Reservation</span>
                    </span>
                </Link>

                <div style={styles.links}>
                    <Link
                        to="/"
                        style={isActive('/') ? styles.activeLink : styles.link}
                        onMouseEnter={(e) => {
                            if (!isActive('/')) {
                                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                                e.target.style.color = '#ffffff';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isActive('/')) {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.color = '#e2e8f0';
                            }
                        }}
                    >
                        🏠 Inicio
                    </Link>
                    <Link
                        to="/artists"
                        style={isActive('/artists') ? styles.activeLink : styles.link}
                        onMouseEnter={(e) => {
                            if (!isActive('/artists')) {
                                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                                e.target.style.color = '#ffffff';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isActive('/artists')) {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.color = '#e2e8f0';
                            }
                        }}
                    >
                        🎤 Artistas
                    </Link>
                    <Link
                        to="/rooms"
                        style={isActive('/rooms') ? styles.activeLink : styles.link}
                        onMouseEnter={(e) => {
                            if (!isActive('/rooms')) {
                                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                                e.target.style.color = '#ffffff';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isActive('/rooms')) {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.color = '#e2e8f0';
                            }
                        }}
                    >
                        🎚️ Salas
                    </Link>
                    <Link
                        to="/extraservices"
                        style={isActive('/extraservices') ? styles.activeLink : styles.link}
                        onMouseEnter={(e) => {
                            if (!isActive('/extraservices')) {
                                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                                e.target.style.color = '#ffffff';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isActive('/extraservices')) {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.color = '#e2e8f0';
                            }
                        }}
                    >
                        🎛️ Servicios
                    </Link>
                    <Link
                        to="/bookings"
                        style={isActive('/bookings') ? styles.activeLink : styles.link}
                        onMouseEnter={(e) => {
                            if (!isActive('/bookings')) {
                                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                                e.target.style.color = '#ffffff';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isActive('/bookings')) {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.color = '#e2e8f0';
                            }
                        }}
                    >
                        📅 Reservas
                    </Link>
                </div>
            </div>
        </nav>
    );
};