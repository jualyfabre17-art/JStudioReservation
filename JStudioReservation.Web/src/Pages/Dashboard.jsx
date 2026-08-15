import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArtistService, RoomService, BookingService } from '../services';

const artistService = new ArtistService();
const roomService = new RoomService();
const bookingService = new BookingService();

export const Dashboard = () => {
    const [stats, setStats] = useState({
        totalArtists: 0,
        totalRooms: 0,
        totalBookings: 0,
        activeBookings: 0,
        upcomingBookings: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            setLoading(true);
            const [artists, rooms, bookings, activeBookings, upcomingBookings] = await Promise.all([
                artistService.getAll(),
                roomService.getAll(),
                bookingService.getAll(),
                bookingService.getActive(),
                bookingService.getUpcoming(7)
            ]);

            setStats({
                totalArtists: artists.length,
                totalRooms: rooms.length,
                totalBookings: bookings.length,
                activeBookings: activeBookings.length,
                upcomingBookings: upcomingBookings.length
            });
            setError('');
        } catch (err) {
            setError('Error al cargar estadísticas: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <p>Cargando dashboard...</p>
        </div>
    );

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Dashboard</h1>
            <p style={styles.subtitle}>Bienvenido al sistema de gestión de JStudioReservation</p>

            {error && (
                <div style={styles.errorMessage}>
                    {error}
                    <button onClick={() => setError('')} style={styles.closeButton}>×</button>
                </div>
            )}

            <div style={styles.grid}>
                <Link to="/artists" style={styles.card}>
                    <div style={styles.cardIcon}>🎵</div>
                    <h3 style={styles.cardTitle}>Artistas</h3>
                    <p style={styles.cardNumber}>{stats.totalArtists}</p>
                    <p style={styles.cardLabel}>registrados</p>
                </Link>

                <Link to="/rooms" style={styles.card}>
                    <div style={styles.cardIcon}>🎚️</div>
                    <h3 style={styles.cardTitle}>Salas</h3>
                    <p style={styles.cardNumber}>{stats.totalRooms}</p>
                    <p style={styles.cardLabel}>disponibles</p>
                </Link>

                <Link to="/bookings" style={styles.card}>
                    <div style={styles.cardIcon}>📅</div>
                    <h3 style={styles.cardTitle}>Reservas</h3>
                    <p style={styles.cardNumber}>{stats.totalBookings}</p>
                    <p style={styles.cardLabel}>totales</p>
                </Link>

                <Link to="/bookings" style={{ ...styles.card, ...styles.cardActive }}>
                    <div style={styles.cardIcon}>🔴</div>
                    <h3 style={styles.cardTitle}>Activas</h3>
                    <p style={styles.cardNumber}>{stats.activeBookings}</p>
                    <p style={styles.cardLabel}>reservas activas</p>
                </Link>

                <Link to="/bookings" style={{ ...styles.card, ...styles.cardUpcoming }}>
                    <div style={styles.cardIcon}>⏰</div>
                    <h3 style={styles.cardTitle}>Próximas</h3>
                    <p style={styles.cardNumber}>{stats.upcomingBookings}</p>
                    <p style={styles.cardLabel}>en 7 días</p>
                </Link>

                <Link to="/extraservices" style={styles.card}>
                    <div style={styles.cardIcon}>🎛️</div>
                    <h3 style={styles.cardTitle}>Servicios</h3>
                    <p style={styles.cardNumber}>Servicios adicionales</p>
                    <p style={styles.cardLabel}>disponibles</p>
                </Link>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
    },
    title: {
        color: '#1e293b',
        fontSize: '2.5rem',
        marginBottom: '0.5rem'
    },
    subtitle: {
        color: '#475569',
        fontSize: '1.1rem',
        marginBottom: '2rem'
    },
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '300px'
    },
    spinner: {
        border: '4px solid #e2e8f0',
        borderTop: '4px solid #4f46e5',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        animation: 'spin 1s linear infinite'
    },
    errorMessage: {
        backgroundColor: '#fef2f2',
        color: '#ef4444',
        padding: '0.75rem 1rem',
        borderRadius: '6px',
        marginBottom: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    closeButton: {
        background: 'transparent',
        border: 'none',
        fontSize: '1.5rem',
        cursor: 'pointer',
        color: '#ef4444',
        padding: '0 0.5rem'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1.5rem'
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        padding: '1.5rem',
        textAlign: 'center',
        textDecoration: 'none',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer'
    },
    cardActive: {
        borderLeft: '4px solid #10b981'
    },
    cardUpcoming: {
        borderLeft: '4px solid #f59e0b'
    },
    cardIcon: {
        fontSize: '2.5rem',
        marginBottom: '0.5rem'
    },
    cardTitle: {
        color: '#1e293b',
        fontSize: '1.1rem',
        margin: '0 0 0.5rem 0'
    },
    cardNumber: {
        color: '#1e293b',
        fontSize: '2rem',
        fontWeight: 'bold',
        margin: '0.5rem 0 0.25rem 0'
    },
    cardLabel: {
        color: '#475569',
        fontSize: '0.9rem',
        margin: 0
    }
};