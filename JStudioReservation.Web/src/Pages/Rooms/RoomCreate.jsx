import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoomService, ArtistService } from '../../services';
import { RoomForm } from '../../components/Forms/RoomForm';
import { AlertMessage } from '../../components/Modals/AlertMessage';
import { LoadingSpinner } from '../../components/Shared/LoadingSpinner';

const roomService = new RoomService();
const artistService = new ArtistService();

export const RoomCreate = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadArtists();
    }, []);

    const loadArtists = async () => {
        try {
            const data = await artistService.getAll();
            setArtists(data);
        } catch (err) {
            setError('Error al cargar artistas: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (formData) => {
        try {
            await roomService.create(formData);
            navigate('/rooms');
        } catch (err) {
            setError('Error al crear la sala: ' + err.message);
        }
    };

    const handleCancel = () => {
        navigate('/rooms');
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Crear Nueva Sala</h1>
            {error && <AlertMessage type="error" message={error} onClose={() => setError('')} />}
            <RoomForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                artists={artists}
            />
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto'
    },
    title: {
        color: '#1e293b',
        fontSize: '2rem',
        marginBottom: '2rem'
    }
};