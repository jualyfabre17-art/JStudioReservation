import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RoomService, ArtistService } from '../../services';
import { RoomForm } from '../../components/Forms/RoomForm';
import { LoadingSpinner } from '../../components/Shared/LoadingSpinner';
import { AlertMessage } from '../../components/Modals/AlertMessage';

const roomService = new RoomService();
const artistService = new ArtistService();

export const RoomEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [room, setRoom] = useState(null);
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadData();
    }, [id]);

    const loadData = async () => {
        try {
            setLoading(true);
            const [roomData, artistsData] = await Promise.all([
                roomService.getById(id),
                artistService.getAll()
            ]);
            setRoom(roomData);
            setArtists(artistsData);
            setError('');
        } catch (err) {
            setError('Error al cargar los datos: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (formData) => {
        try {
            await roomService.update(id, formData);
            navigate('/rooms');
        } catch (err) {
            setError('Error al actualizar la sala: ' + err.message);
        }
    };

    const handleCancel = () => {
        navigate('/rooms');
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
        editBadge: {
            display: 'inline-block',
            backgroundColor: 'rgba(79, 70, 229, 0.08)',
            color: '#4f46e5',
            padding: '0.25rem 1rem',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: '600',
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            letterSpacing: '0.3px',
            marginTop: '0.5rem'
        },
        roomName: {
            color: '#0f172a',
            fontWeight: '600'
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
                    <span style={styles.loadingText}>Cargando información de la sala...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={styles.container}>
                <div style={styles.errorContainer}>
                    <AlertMessage type="error" message={error} />
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
                    href="/rooms"
                    style={styles.breadcrumbLink}
                    onMouseEnter={(e) => e.target.style.color = '#4338ca'}
                    onMouseLeave={(e) => e.target.style.color = '#4f46e5'}
                >
                    Salas
                </a>
                <span style={styles.breadcrumbSeparator}>/</span>
                <span style={styles.breadcrumbCurrent}>
                    Editar: <span style={styles.roomName}>{room?.name}</span>
                </span>
            </div>

            <div style={styles.header}>
                <h1 style={styles.title}>✏️ Editar Sala</h1>
                <p style={styles.subtitle}>
                    Actualiza la información de la sala de grabación
                </p>
                <div style={styles.editBadge}>
                    Editando: <span style={styles.roomName}>{room?.name}</span>
                </div>
            </div>

            {error && (
                <div style={styles.errorContainer}>
                    <AlertMessage type="error" message={error} onClose={() => setError('')} />
                </div>
            )}

            <div style={styles.formWrapper}>
                <RoomForm
                    initialData={room}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isEditing={true}
                    artists={artists}
                />
            </div>
        </div>
    );
};