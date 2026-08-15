import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingService, ArtistService, RoomService, ExtraServiceService } from '../../services';
import { BookingForm } from '../../components/Forms/BookingForm';
import { AlertMessage } from '../../components/Modals/AlertMessage';
import { LoadingSpinner } from '../../components/Shared/LoadingSpinner';

const bookingService = new BookingService();
const artistService = new ArtistService();
const roomService = new RoomService();
const extraServiceService = new ExtraServiceService();

export const BookingCreate = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [artists, setArtists] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [extraServices, setExtraServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [artistsData, roomsData, servicesData] = await Promise.all([
                artistService.getAll(),
                roomService.getAll(),
                extraServiceService.getAll()
            ]);
            setArtists(artistsData);
            setRooms(roomsData);
            setExtraServices(servicesData);
        } catch (err) {
            setError('Error al cargar datos: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (formData) => {
        try {
            await bookingService.create(formData);
            navigate('/bookings');
        } catch (err) {
            setError('Error al crear la reserva: ' + err.message);
        }
    };

    const handleCancel = () => {
        navigate('/bookings');
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Crear Nueva Reserva</h1>
            {error && <AlertMessage type="error" message={error} onClose={() => setError('')} />}
            <BookingForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                artists={artists}
                rooms={rooms}
                extraServices={extraServices}
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