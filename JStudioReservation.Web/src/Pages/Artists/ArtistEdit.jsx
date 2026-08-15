import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArtistService } from '../../services';
import { ArtistForm } from '../../components/Forms/ArtistForm';
import { LoadingSpinner } from '../../components/Shared/LoadingSpinner';
import { AlertMessage } from '../../components/Modals/AlertMessage';

const artistService = new ArtistService();

export const ArtistEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [artist, setArtist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadArtist();
    }, [id]);

    const loadArtist = async () => {
        try {
            setLoading(true);
            const data = await artistService.getById(id);
            setArtist(data);
            setError('');
        } catch (err) {
            setError('Error al cargar el artista: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (formData) => {
        try {
            await artistService.update(id, formData);
            navigate('/artists');
        } catch (err) {
            setError('Error al actualizar el artista: ' + err.message);
        }
    };

    const handleCancel = () => {
        navigate('/artists');
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <AlertMessage type="error" message={error} />;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Editar Artista</h1>
            <ArtistForm
                initialData={artist}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isEditing={true}
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