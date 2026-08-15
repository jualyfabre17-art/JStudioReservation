import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArtistService } from '../../services';
import { LoadingSpinner } from '../../components/Shared/LoadingSpinner';
import { ConfirmDelete } from '../../components/Modals/ConfirmDelete';
import { AlertMessage } from '../../components/Modals/AlertMessage';

const artistService = new ArtistService();

export const ArtistList = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedArtist, setSelectedArtist] = useState(null);

    useEffect(() => {
        loadArtists();
    }, []);

    const loadArtists = async () => {
        try {
            setLoading(true);
            const data = await artistService.getAll();
            setArtists(data);
            setError('');
        } catch (err) {
            setError('Error al cargar los artistas: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (artist) => {
        setSelectedArtist(artist);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await artistService.delete(selectedArtist.id);
            setShowDeleteModal(false);
            setSelectedArtist(null);
            loadArtists();
        } catch (err) {
            setError('Error al eliminar el artista: ' + err.message);
            setShowDeleteModal(false);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>Artistas</h1>
                <Link to="/artists/create" style={styles.createButton}>
                    + Nuevo Artista
                </Link>
            </div>

            {error && <AlertMessage type="error" message={error} onClose={() => setError('')} />}

            <div style={styles.grid}>
                {artists.length === 0 ? (
                    <p style={styles.emptyMessage}>No hay artistas registrados.</p>
                ) : (
                    artists.map(artist => (
                        <div key={artist.id} style={styles.card}>
                            <div style={styles.cardContent}>
                                <h3 style={styles.cardTitle}>{artist.fullName}</h3>
                                <p style={styles.cardText}><strong>Género:</strong> {artist.genre}</p>
                                <p style={styles.cardText}><strong>Teléfono:</strong> {artist.phoneNumber || 'N/A'}</p>
                            </div>
                            <div style={styles.cardActions}>
                                <Link to={`/artists/edit/${artist.id}`} style={styles.editButton}>
                                    Editar
                                </Link>
                                <button
                                    onClick={() => handleDeleteClick(artist)}
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
                entityName={selectedArtist?.fullName || ''}
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
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
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
    cardTitle: {
        color: '#1e293b',
        fontSize: '1.25rem',
        margin: '0 0 0.5rem 0'
    },
    cardText: {
        color: '#475569',
        margin: '0.25rem 0'
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