export const Footer = () => {
    const styles = {
        footer: {
            backgroundColor: '#0f172a',
            padding: '2rem',
            textAlign: 'center',
            borderTop: '3px solid #4f46e5',
            marginTop: 'auto'
        },
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem'
        },
        text: {
            color: '#94a3b8',
            fontSize: '0.9rem',
            margin: 0,
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            letterSpacing: '0.2px'
        },
        brand: {
            color: '#e2e8f0',
            fontWeight: '600',
            fontSize: '1rem'
        },
        highlight: {
            color: '#4f46e5',
            fontWeight: '700'
        },
        divider: {
            width: '60px',
            height: '2px',
            backgroundColor: '#4f46e5',
            borderRadius: '2px',
            margin: '0.25rem 0'
        },
        socialLinks: {
            display: 'flex',
            gap: '1.5rem',
            marginTop: '0.25rem'
        },
        socialLink: {
            color: '#64748b',
            textDecoration: 'none',
            fontSize: '0.85rem',
            transition: 'color 0.2s ease',
            fontFamily: "'Inter', 'Segoe UI', sans-serif"
        },
        year: {
            color: '#475569',
            fontSize: '0.8rem',
            marginTop: '0.25rem'
        }
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <div style={styles.divider} />

                <p style={styles.text}>
                    <span style={styles.brand}>
                        🎵 JStudio<span style={styles.highlight}>Reservation</span>
                    </span>
                </p>

                <p style={styles.text}>
                    Tu estudio de grabación profesional ·
                    <span style={{ color: '#64748b', margin: '0 0.25rem' }}>|</span>
                    <span style={{ color: '#94a3b8' }}> Sonido de calidad</span>
                </p>

                <div style={styles.socialLinks}>
                    <a
                        href="#"
                        style={styles.socialLink}
                        onMouseEnter={(e) => e.target.style.color = '#4f46e5'}
                        onMouseLeave={(e) => e.target.style.color = '#64748b'}
                    >
                        Instagram
                    </a>
                    <a
                        href="#"
                        style={styles.socialLink}
                        onMouseEnter={(e) => e.target.style.color = '#4f46e5'}
                        onMouseLeave={(e) => e.target.style.color = '#64748b'}
                    >
                        YouTube
                    </a>
                    <a
                        href="#"
                        style={styles.socialLink}
                        onMouseEnter={(e) => e.target.style.color = '#4f46e5'}
                        onMouseLeave={(e) => e.target.style.color = '#64748b'}
                    >
                        Spotify
                    </a>
                </div>

                <p style={styles.year}>
                    © {currentYear} JStudioReservation · Todos los derechos reservados
                </p>
            </div>
        </footer>
    );
};