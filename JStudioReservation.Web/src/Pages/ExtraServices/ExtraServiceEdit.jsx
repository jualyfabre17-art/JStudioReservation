import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ExtraServiceService, RoomService } from '../../services';
import { ExtraServiceForm } from '../../components/Forms/ExtraServiceForm';
import { LoadingSpinner } from '../../components/Shared/LoadingSpinner';
import { AlertMessage } from '../../components/Modals/AlertMessage';

const extraServiceService = new ExtraServiceService();
const roomService = new RoomService();

export const ExtraServiceEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadData();
    }, [id]);

    const loadData = async () => {
        try {
            setLoading(true);
            const [serviceData, roomsData] = await Promise.all([
                extraServiceService.getById(id),
                roomService.getAll()
            ]);
            setService(serviceData);
            setRooms(roomsData);
            setError('');
        } catch (err) {
            setError('Error al cargar los datos: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (formData) => {
        try {
            await extraServiceService.update(id, formData);
            navigate('/extraservices');
        } catch (err) {
            setError('Error al actualizar el servicio: ' + err.message);
        }
    };

    const handleCancel = () => {
        navigate('/extraservices');
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <AlertMessage type="error" message={error} />;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Editar Servicio Adicional</h1>
            <ExtraServiceForm
                initialData={service}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isEditing={true}
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