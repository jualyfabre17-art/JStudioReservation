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

    if (loading) return <LoadingSpinner />;
    if (error) return <AlertMessage type="error" message={error} />;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Editar Sala</h1>
            <RoomForm
                initialData={room}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isEditing={true}
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