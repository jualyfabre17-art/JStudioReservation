import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookingService, ArtistService, RoomService, ExtraServiceService } from '../../services';
import { BookingForm } from '../../components/Forms/BookingForm';
import { LoadingSpinner } from '../../components/Shared/LoadingSpinner';
import { AlertMessage } from '../../components/Modals/AlertMessage';

const bookingService = new BookingService();
const artistService = new ArtistService();
const roomService = new RoomService();
const extraServiceService = new ExtraServiceService();

export const BookingEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);
    const [artists, setArtists] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [extraServices, setExtraServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadData();
    }, [id]);

    const loadData = async () => {
        try {
            setLoading(true);
            const [bookingData, artistsData, roomsData, servicesData] = await Promise.all([
                bookingService.getById(id),
                artistService.getAll(),
                roomService.getAll(),
                extraServiceService.getAll()
            ]);
            setBooking(bookingData);
            setArtists(artistsData);
            setRooms(roomsData);
            setExtraServices(servicesData);
            setError('');
        } catch (err) {
            setError('Error al cargar los datos: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (formData) => {
        try {
            await bookingService.update(id, formData);
            navigate('/bookings');
        } catch (err) {
            setError('Error al actualizar la reserva: ' + err.message);
        }
    };

    const handleCancel = () => {
        navigate('/bookings');
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <AlertMessage type="error" message={error} />;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Editar Reserva #{id}</h1>
            <BookingForm
                initialData={booking}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isEditing={true}
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