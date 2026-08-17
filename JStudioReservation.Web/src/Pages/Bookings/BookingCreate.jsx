import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingService, ArtistService, RoomService, ExtraServiceService } from '../../services';
import { BookingForm } from '../../components/Forms/BookingForm';
import { AlertMessage } from '../../components/Modals/AlertMessage';
import { LoadingSpinner } from '../../components/Shared/LoadingSpinner';

const bookingService = new BookingService();
const artistService = new ArtistService();
const roomService = new RoomService();
const extraServiceService = new ExtraServiceService();

export const BookingCreate = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [artists, setArtists] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [extraServices, setExtraServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [artistsData, roomsData, servicesData] = await Promise.all([
                artistService.getAll(),
                roomService.getAll(),
                extraServiceService.getAll()
            ]);
            setArtists(artistsData);
            setRooms(roomsData);
            setExtraServices(servicesData);
        } catch (err) {
            setError('Error al cargar datos: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (formData) => {
        try {
            await bookingService.create(formData);
            navigate('/bookings');
        } catch (err) {
            setError('Error al crear la reserva: ' + err.message);
        }
    };

    const handleCancel = () => {
        navigate('/bookings');
    };

    const styles = {
        container: {
            maxWidth: '800px',
            margin: '0 auto',
            padding: '2rem 1.5rem'
        },
        header: {
            marginBottom: '2.5rem',
            textAlign: 'center'
        },
        title: {
            fontSize: '2.25rem',
            fontWeight: '700',
            color: '#0f172a',
            letterSpacing: '-0.02em',
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            margin: 0,
            marginBottom: '0.5rem'
        },
        subtitle: {
            fontSize: '1rem',
            color: '#64748b',
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            margin: 0
        },
        breadcrumb: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem',
            fontSize: '0.85rem',
            color: '#94a3b8',
            fontFamily: "'Inter', 'Segoe UI', sans-serif"
        },
        breadcrumbLink: {
            color: '#4f46e5',
            textDecoration: 'none',
            fontWeight: '500',
            transition: 'color 0.2s ease'
        },
        breadcrumbSeparator: {
            color: '#cbd5e1'
        },
        breadcrumbCurrent: {
            color: '#475569',
            fontWeight: '500'
        },
        formWrapper: {
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '0.5rem 0'
        },
        loadingContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '300px'
        },
        errorContainer: {
            marginBottom: '1.5rem'
        },
        loadingText: {
            color: '#64748b',
            marginLeft: '1rem',
            fontFamily: "'Inter', 'Segoe UI', sans-serif"
        }
    };

    if (loading) {
        return (
            <div style={styles.container}>
                <div style={styles.loadingContainer}>
                    <LoadingSpinner />
                    <span style={styles.loadingText}>Cargando datos para la reserva...</span>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.breadcrumb}>
                <a
                    href="/"
                    style={styles.breadcrumbLink}
                    onMouseEnter={(e) => e.target.style.color = '#4338ca'}
                    onMouseLeave={(e) => e.target.style.color = '#4f46e5'}
                >
                    Inicio
                </a>
                <span style={styles.breadcrumbSeparator}>/</span>
                <a
                    href="/bookings"
                    style={styles.breadcrumbLink}
                    onMouseEnter={(e) => e.target.style.color = '#4338ca'}
                    onMouseLeave={(e) => e.target.style.color = '#4f46e5'}
                >
                    Reservas
                </a>
                <span style={styles.breadcrumbSeparator}>/</span>
                <span style={styles.breadcrumbCurrent}>Nueva Reserva</span>
            </div>

            <div style={styles.header}>
                <h1 style={styles.title}>📅 Nueva Reserva</h1>
                <p style={styles.subtitle}>
                    Registra una nueva sesión de grabación en el estudio
                </p>
            </div>

            {error && (
                <div style={styles.errorContainer}>
                    <AlertMessage type="error" message={error} onClose={() => setError('')} />
                </div>
            )}

            <div style={styles.formWrapper}>
                <BookingForm
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    artists={artists}
                    rooms={rooms}
                    extraServices={extraServices}
                />
            </div>
        </div>
    );
};