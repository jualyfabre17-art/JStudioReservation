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

    const styles = {
        container: {
            padding: '2rem 1.5rem',
            maxWidth: '1200px',
            margin: '0 auto'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
            gap: '1rem'
        },
        title: {
            fontSize: '2.25rem',
            fontWeight: '700',
            color: '#0f172a',
            letterSpacing: '-0.02em',
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            margin: 0
        },
        createButton: {
            padding: '0.85rem 2rem',
            backgroundColor: '#4f46e5',
            color: '#ffffff',
            textDecoration: 'none',
            borderRadius: '12px',
            fontWeight: '600',
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            transition: 'all 0.25s ease',
            boxShadow: '0 4px 14px rgba(79, 70, 229, 0.25)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
        },
        filterContainer: {
            marginBottom: '2rem'
        },
        filterSelect: {
            padding: '0.6rem 1.2rem',
            border: '2px solid #e2e8f0',
            borderRadius: '12px',
            fontSize: '1rem',
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            backgroundColor: '#ffffff',
            cursor: 'pointer',
            outline: 'none',
            transition: 'border-color 0.2s'
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '1.5rem'
        },
        card: {
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
            border: '1px solid #f1f5f9',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'all 0.3s ease'
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
            fontSize: '1.1rem',
            fontWeight: '600',
            color: '#0f172a',
            margin: 0,
            fontFamily: "'Inter', 'Segoe UI', sans-serif"
        },
        statusBadge: {
            padding: '0.25rem 0.75rem',
            borderRadius: '20px',
            color: '#ffffff',
            fontSize: '0.75rem',
            fontWeight: '600',
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            letterSpacing: '0.2px'
        },
        cardText: {
            color: '#475569',
            margin: '0.3rem 0',
            fontSize: '0.95rem',
            fontFamily: "'Inter', 'Segoe UI', sans-serif"
        },
        cardTextStrong: {
            color: '#1e293b',
            fontWeight: '500'
        },
        cardActions: {
            display: 'flex',
            gap: '0.75rem',
            marginTop: '1.25rem',
            paddingTop: '1rem',
            borderTop: '1px solid #f1f5f9'
        },
        editButton: {
            padding: '0.5rem 1rem',
            backgroundColor: '#f8fafc',
            color: '#1e293b',
            textDecoration: 'none',
            borderRadius: '8px',
            fontSize: '0.85rem',
            fontWeight: '500',
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            border: '1px solid #e2e8f0',
            cursor: 'pointer',
            textAlign: 'center',
            flex: 1
        },
        deleteButton: {
            padding: '0.5rem 1rem',
            backgroundColor: '#fef2f2',
            color: '#ef4444',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            fontSize: '0.85rem',
            fontWeight: '500',
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            cursor: 'pointer',
            textAlign: 'center',
            flex: 1
        },
        emptyMessage: {
            color: '#94a3b8',
            fontSize: '1.1rem',
            gridColumn: '1 / -1',
            textAlign: 'center',
            padding: '3rem',
            fontFamily: "'Inter', 'Segoe UI', sans-serif"
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>📅 Reservas</h1>
                <Link
                    to="/bookings/create"
                    style={styles.createButton}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#4338ca';
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(79, 70, 229, 0.30)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#4f46e5';
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 14px rgba(79, 70, 229, 0.25)';
                    }}
                >
                    <span style={{ fontSize: '1.2rem' }}>+</span> Nueva Reserva
                </Link>
            </div>

            <div style={styles.filterContainer}>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    style={styles.filterSelect}
                    onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
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
                    <p style={styles.emptyMessage}>
                        No hay reservas.
                        <Link to="/bookings/create" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: '500' }}>
                            {' '}Crea la primera
                        </Link>
                    </p>
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
                                    <span style={styles.cardTextStrong}>🎤 Artista:</span> {booking.artistName || 'N/A'}
                                </p>
                                <p style={styles.cardText}>
                                    <span style={styles.cardTextStrong}>🎚️ Sala:</span> {booking.roomName || 'N/A'}
                                </p>
                                {booking.extraServiceName && (
                                    <p style={styles.cardText}>
                                        <span style={styles.cardTextStrong}>🎛️ Servicio:</span> {booking.extraServiceName}
                                    </p>
                                )}
                                <p style={styles.cardText}>
                                    <span style={styles.cardTextStrong}>⏰ Inicio:</span> {formatDate(booking.startTime)}
                                </p>
                                <p style={styles.cardText}>
                                    <span style={styles.cardTextStrong}>⏰ Fin:</span> {formatDate(booking.endTime)}
                                </p>
                            </div>
                            <div style={styles.cardActions}>
                                <Link
                                    to={`/bookings/edit/${booking.id}`}
                                    style={styles.editButton}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = '#f1f5f9';
                                        e.target.style.borderColor = '#cbd5e1';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = '#f8fafc';
                                        e.target.style.borderColor = '#e2e8f0';
                                    }}
                                >
                                    ✏️ Editar
                                </Link>
                                <button
                                    onClick={() => handleDeleteClick(booking)}
                                    style={styles.deleteButton}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = '#fee2e2';
                                        e.target.style.borderColor = '#fca5a5';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = '#fef2f2';
                                        e.target.style.borderColor = '#fecaca';
                                    }}
                                >
                                    🗑️ Eliminar
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