import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookingService, ArtistService, RoomService, ExtraServiceService } from '../../services';
import { LoadingSpinner } from '../../components/Shared/LoadingSpinner';
import { ConfirmDelete } from '../../components/Modals/ConfirmDelete';
import { AlertMessage } from '../../components/Modals/AlertMessage';
import { formatDate } from '../../utils/dateHelpers';

const bookingService = new BookingService();
const artistService = new ArtistService();
const roomService = new RoomService();
const extraServiceService = new ExtraServiceService();

export const BookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {
        try {
            setLoading(true);
            let data;
            if (filter === 'all') {
                data = await bookingService.getAll();
            } else if (filter === 'active') {
                data = await bookingService.getActive();
            } else if (filter === 'upcoming') {
                data = await bookingService.getUpcoming(7);
            } else {
                data = await bookingService.getByStatus(filter);
            }
            setBookings(data);
            setError('');
        } catch (err) {
            setError('Error al cargar las reservas: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBookings();
    }, [filter]);

    const handleDeleteClick = (booking) => {
        setSelectedBooking(booking);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await bookingService.delete(selectedBooking.id);
            setShowDeleteModal(false);
            setSelectedBooking(null);
            loadBookings();
        } catch (err) {
            setError('Error al eliminar la reserva: ' + err.message);
            setShowDeleteModal(false);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            'Pending': '#f59e0b',
            'Confirmed': '#10b981',
            'Cancelled': '#ef4444',
            'Completed': '#4f46e5'
        };
        return colors[status] || '#475569';
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>Reservas</h1>
                <Link to="/bookings/create" style={styles.createButton}>
                    + Nueva Reserva
                </Link>
            </div>

            <div style={styles.filterContainer}>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    style={styles.filterSelect}
                >
                    <option value="all">Todas</option>
                    <option value="Pending">Pendientes</option>
                    <option value="Confirmed">Confirmadas</option>
                    <option value="Cancelled">Canceladas</option>
                    <option value="Completed">Completadas</option>
                    <option value="active">Activas</option>
                    <option value="upcoming">Próximas 7 días</option>
                </select>
            </div>

            {error && <AlertMessage type="error" message={error} onClose={() => setError('')} />}

            <div style={styles.grid}>
                {bookings.length === 0 ? (
                    <p style={styles.emptyMessage}>No hay reservas.</p>
                ) : (
                    bookings.map(booking => (
                        <div key={booking.id} style={styles.card}>
                            <div style={styles.cardContent}>
                                <div style={styles.cardHeader}>
                                    <h3 style={styles.cardTitle}>
                                        Reserva #{booking.id}
                                    </h3>
                                    <span style={{
                                        ...styles.statusBadge,
                                        backgroundColor: getStatusColor(booking.status)
                                    }}>
                                        {booking.status}
                                    </span>
                                </div>
                                <p style={styles.cardText}>
                                    <strong>Artista:</strong> {booking.artistName || 'N/A'}
                                </p>
                                <p style={styles.cardText}>
                                    <strong>Sala:</strong> {booking.roomName || 'N/A'}
                                </p>
                                {booking.extraServiceName && (
                                    <p style={styles.cardText}>
                                        <strong>Servicio adicional:</strong> {booking.extraServiceName}
                                    </p>
                                )}
                                <p style={styles.cardText}>
                                    <strong>Inicio:</strong> {formatDate(booking.startTime)}
                                </p>
                                <p style={styles.cardText}>
                                    <strong>Fin:</strong> {formatDate(booking.endTime)}
                                </p>
                            </div>
                            <div style={styles.cardActions}>
                                <Link to={`/bookings/edit/${booking.id}`} style={styles.editButton}>
                                    Editar
                                </Link>
                                <button
                                    onClick={() => handleDeleteClick(booking)}
                                    style={styles.deleteButton}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <ConfirmDelete
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
                entityName={`Reserva #${selectedBooking?.id || ''}`}
            />
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
    },
    title: {
        color: '#1e293b',
        fontSize: '2rem',
        margin: 0
    },
    createButton: {
        padding: '0.75rem 1.5rem',
        backgroundColor: '#4f46e5',
        color: '#ffffff',
        textDecoration: 'none',
        borderRadius: '6px',
        transition: 'background-color 0.2s'
    },
    filterContainer: {
        marginBottom: '2rem'
    },
    filterSelect: {
        padding: '0.5rem 1rem',
        border: '1px solid #e2e8f0',
        borderRadius: '6px',
        fontSize: '1rem',
        backgroundColor: '#ffffff',
        cursor: 'pointer'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '1.5rem'
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    cardContent: {
        flex: 1
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.75rem'
    },
    cardTitle: {
        color: '#1e293b',
        fontSize: '1.1rem',
        margin: 0
    },
    statusBadge: {
        padding: '0.25rem 0.75rem',
        borderRadius: '20px',
        color: '#ffffff',
        fontSize: '0.75rem',
        fontWeight: '500'
    },
    cardText: {
        color: '#475569',
        margin: '0.25rem 0',
        fontSize: '0.95rem'
    },
    cardActions: {
        display: 'flex',
        gap: '0.75rem',
        marginTop: '1rem',
        paddingTop: '1rem',
        borderTop: '1px solid #e2e8f0'
    },
    editButton: {
        padding: '0.5rem 1rem',
        backgroundColor: '#4f46e5',
        color: '#ffffff',
        textDecoration: 'none',
        borderRadius: '4px',
        fontSize: '0.9rem',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'center',
        flex: 1
    },
    deleteButton: {
        padding: '0.5rem 1rem',
        backgroundColor: '#ef4444',
        color: '#ffffff',
        border: 'none',
        borderRadius: '4px',
        fontSize: '0.9rem',
        cursor: 'pointer',
        flex: 1
    },
    emptyMessage: {
        color: '#475569',
        fontSize: '1.1rem',
        gridColumn: '1 / -1',
        textAlign: 'center',
        padding: '2rem'
    }
};