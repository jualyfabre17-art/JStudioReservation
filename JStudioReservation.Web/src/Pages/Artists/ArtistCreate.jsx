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

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Crear Nuevo Artista</h1>
            {error && <AlertMessage type="error" message={error} onClose={() => setError('')} />}
            <ArtistForm onSubmit={handleSubmit} onCancel={handleCancel} />
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