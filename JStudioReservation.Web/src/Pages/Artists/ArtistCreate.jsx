import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArtistService } from '../../services';
import { ArtistForm } from '../../components/Forms/ArtistForm';
import { AlertMessage } from '../../components/Modals/AlertMessage';

const artistService = new ArtistService();

export const ArtistCreate = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (formData) => {
        try {
            await artistService.create(formData);
            navigate('/artists');
        } catch (err) {
            setError('Error al crear el artista: ' + err.message);
        }
    };

    const handleCancel = () => {
        navigate('/artists');
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
        }
    };

    return (
        <div style={styles.container}>
            {/* Breadcrumb */}
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
                    href="/artists"
                    style={styles.breadcrumbLink}
                    onMouseEnter={(e) => e.target.style.color = '#4338ca'}
                    onMouseLeave={(e) => e.target.style.color = '#4f46e5'}
                >
                    Artistas
                </a>
                <span style={styles.breadcrumbSeparator}>/</span>
                <span style={styles.breadcrumbCurrent}>Nuevo Artista</span>
            </div>

            {/* Header */}
            <div style={styles.header}>
                <h1 style={styles.title}>🎤 Nuevo Artista</h1>
                <p style={styles.subtitle}>
                    Registra un nuevo artista o banda en el estudio de grabación
                </p>
            </div>

            {/* Error Message */}
            {error && (
                <div style={{ marginBottom: '1.5rem' }}>
                    <AlertMessage type="error" message={error} onClose={() => setError('')} />
                </div>
            )}

            {/* Form */}
            <div style={styles.formWrapper}>
                <ArtistForm
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </div>
        </div>
    );
};