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

    if (loading) return <LoadingSpinner />;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Crear Nuevo Servicio Adicional</h1>
            {error && <AlertMessage type="error" message={error} onClose={() => setError('')} />}
            <ExtraServiceForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                rooms={rooms}
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