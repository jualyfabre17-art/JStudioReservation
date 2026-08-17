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
        headerLeft: {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem'
        },
        title: {
            fontSize: '2.25rem',
            fontWeight: '700',
            color: '#0f172a',
            letterSpacing: '-0.02em',
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            margin: 0
        },
        subtitle: {
            fontSize: '1rem',
            color: '#64748b',
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            margin: 0
        },
        headerActions: {
            display: 'flex',
            gap: '1rem',
            alignItems: 'center'
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
            gap: '0.5rem',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.95rem'
        },
        stats: {
            display: 'flex',
            gap: '1.5rem',
            marginBottom: '2rem',
            flexWrap: 'wrap'
        },
        statItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: '#f8fafc',
            padding: '0.5rem 1rem',
            borderRadius: '10px',
            border: '1px solid #e2e8f0'
        },
        statNumber: {
            fontWeight: '700',
            color: '#0f172a',
            fontSize: '1.1rem'
        },
        statLabel: {
            color: '#64748b',
            fontSize: '0.85rem'
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
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
            alignItems: 'flex-start',
            marginBottom: '0.75rem'
        },
        cardTitle: {
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#0f172a',
            margin: 0,
            fontFamily: "'Inter', 'Segoe UI', sans-serif"
        },
        cardGenre: {
            display: 'inline-block',
            backgroundColor: 'rgba(79, 70, 229, 0.08)',
            color: '#4f46e5',
            padding: '0.2rem 0.75rem',
            borderRadius: '20px',
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
            transition: 'all 0.2s ease',
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
            transition: 'all 0.2s ease',
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
        },
        errorContainer: {
            marginBottom: '1.5rem'
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <h1 style={styles.title}>🎤 Artistas</h1>
                    <p style={styles.subtitle}>
                        Gestiona todos los artistas y bandas del estudio
                    </p>
                </div>
                <div style={styles.headerActions}>
                    <Link
                        to="/artists/create"
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
                        <span style={{ fontSize: '1.2rem' }}>+</span> Nuevo Artista
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div style={styles.stats}>
                <div style={styles.statItem}>
                    <span style={styles.statNumber}>{artists.length}</span>
                    <span style={styles.statLabel}>Artistas registrados</span>
                </div>
                <div style={styles.statItem}>
                    <span style={styles.statNumber}>
                        {artists.filter(a => a.genre).length}
                    </span>
                    <span style={styles.statLabel}>Con género definido</span>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div style={styles.errorContainer}>
                    <AlertMessage type="error" message={error} onClose={() => setError('')} />
                </div>
            )}

            {/* Grid */}
            <div style={styles.grid}>
                {artists.length === 0 ? (
                    <p style={styles.emptyMessage}>
                        No hay artistas registrados.
                        <Link to="/artists/create" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: '500' }}>
                            {' '}Crea el primero
                        </Link>
                    </p>
                ) : (
                    artists.map(artist => (
                        <div key={artist.id} style={styles.card}>
                            <div style={styles.cardContent}>
                                <div style={styles.cardHeader}>
                                    <h3 style={styles.cardTitle}>{artist.fullName}</h3>
                                    <span style={styles.cardGenre}>{artist.genre}</span>
                                </div>
                                <p style={styles.cardText}>
                                    <span style={styles.cardTextStrong}>📞 Teléfono:</span> {artist.phoneNumber || 'No registrado'}
                                </p>
                                <p style={styles.cardText} style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.5rem' }}>
                                    ID: #{artist.id}
                                </p>
                            </div>
                            <div style={styles.cardActions}>
                                <Link
                                    to={`/artists/edit/${artist.id}`}
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
                                    onClick={() => handleDeleteClick(artist)}
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

            {/* Delete Modal */}
            <ConfirmDelete
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
                entityName={selectedArtist?.fullName || ''}
            />
        </div>
    );
};