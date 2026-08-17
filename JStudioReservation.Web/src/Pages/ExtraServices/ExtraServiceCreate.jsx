import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExtraServiceService, RoomService } from '../../services';
import { ExtraServiceForm } from '../../components/Forms/ExtraServiceForm';
import { AlertMessage } from '../../components/Modals/AlertMessage';
import { LoadingSpinner } from '../../components/Shared/LoadingSpinner';

const extraServiceService = new ExtraServiceService();
const roomService = new RoomService();

export const ExtraServiceCreate = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadRooms();
    }, []);

    const loadRooms = async () => {
        try {
            const data = await roomService.getAll();
            setRooms(data);
        } catch (err) {
            setError('Error al cargar salas: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (formData) => {
        try {
            await extraServiceService.create(formData);
            navigate('/extraservices');
        } catch (err) {
            setError('Error al crear el servicio: ' + err.message);
        }
    };

    const handleCancel = () => {
        navigate('/extraservices');
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
                    <span style={styles.loadingText}>Cargando salas disponibles...</span>
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
                    href="/extraservices"
                    style={styles.breadcrumbLink}
                    onMouseEnter={(e) => e.target.style.color = '#4338ca'}
                    onMouseLeave={(e) => e.target.style.color = '#4f46e5'}
                >
                    Servicios
                </a>
                <span style={styles.breadcrumbSeparator}>/</span>
                <span style={styles.breadcrumbCurrent}>Nuevo Servicio</span>
            </div>

            <div style={styles.header}>
                <h1 style={styles.title}>🎛️ Nuevo Servicio Adicional</h1>
                <p style={styles.subtitle}>
                    Registra un nuevo servicio para las sesiones de grabación
                </p>
            </div>

            {error && (
                <div style={styles.errorContainer}>
                    <AlertMessage type="error" message={error} onClose={() => setError('')} />
                </div>
            )}

            <div style={styles.formWrapper}>
                <ExtraServiceForm
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    rooms={rooms}
                />
            </div>
        </div>
    );
};