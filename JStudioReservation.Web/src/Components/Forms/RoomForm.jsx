import { useState, useEffect } from 'react';

export const RoomForm = ({ initialData = {}, onSubmit, onCancel, isEditing = false, artists = [] }) => {
    const [formData, setFormData] = useState({
        name: '',
        pricePerHour: 0,
        capacity: 0,
        artistId: 0,
        ...initialData
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'pricePerHour' || name === 'capacity' || name === 'artistId'
                ? parseFloat(value) || 0
                : value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'El nombre de la sala es requerido';
        if (formData.name.length > 100) newErrors.name = 'El nombre no puede exceder 100 caracteres';
        if (formData.pricePerHour <= 0) newErrors.pricePerHour = 'El precio por hora debe ser mayor a 0';
        if (formData.capacity <= 0) newErrors.capacity = 'La capacidad debe ser mayor a 0';
        if (formData.artistId <= 0) newErrors.artistId = 'Debe seleccionar un artista';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.field}>
                <label style={styles.label}>Nombre de la Sala *</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    style={{ ...styles.input, borderColor: errors.name ? '#ef4444' : '#e2e8f0' }}
                />
                {errors.name && <span style={styles.error}>{errors.name}</span>}
            </div>

            <div style={styles.field}>
                <label style={styles.label}>Precio por Hora *</label>
                <input
                    type="number"
                    name="pricePerHour"
                    value={formData.pricePerHour}
                    onChange={handleChange}
                    min="0.01"
                    step="0.01"
                    style={{ ...styles.input, borderColor: errors.pricePerHour ? '#ef4444' : '#e2e8f0' }}
                />
                {errors.pricePerHour && <span style={styles.error}>{errors.pricePerHour}</span>}
            </div>

            <div style={styles.field}>
                <label style={styles.label}>Capacidad *</label>
                <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    min="1"
                    step="1"
                    style={{ ...styles.input, borderColor: errors.capacity ? '#ef4444' : '#e2e8f0' }}
                />
                {errors.capacity && <span style={styles.error}>{errors.capacity}</span>}
            </div>

            <div style={styles.field}>
                <label style={styles.label}>Artista Propietario *</label>
                <select
                    name="artistId"
                    value={formData.artistId}
                    onChange={handleChange}
                    style={{ ...styles.input, borderColor: errors.artistId ? '#ef4444' : '#e2e8f0' }}
                >
                    <option value="0">Seleccione un artista...</option>
                    {artists.map(artist => (
                        <option key={artist.id} value={artist.id}>
                            {artist.fullName}
                        </option>
                    ))}
                </select>
                {errors.artistId && <span style={styles.error}>{errors.artistId}</span>}
            </div>

            <div style={styles.actions}>
                <button type="button" onClick={onCancel} style={styles.cancelButton}>
                    Cancelar
                </button>
                <button type="submit" style={styles.submitButton}>
                    {isEditing ? 'Actualizar' : 'Crear'}
                </button>
            </div>
        </form>
    );
};

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        maxWidth: '500px',
        margin: '0 auto',
        padding: '2rem',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem'
    },
    label: {
        fontWeight: '500',
        color: '#1e293b',
        fontSize: '0.9rem'
    },
    input: {
        padding: '0.75rem',
        border: '1px solid #e2e8f0',
        borderRadius: '6px',
        fontSize: '1rem',
        transition: 'border-color 0.2s'
    },
    error: {
        color: '#ef4444',
        fontSize: '0.85rem',
        marginTop: '0.25rem'
    },
    actions: {
        display: 'flex',
        gap: '1rem',
        justifyContent: 'flex-end',
        marginTop: '0.5rem'
    },
    cancelButton: {
        padding: '0.75rem 2rem',
        backgroundColor: '#e2e8f0',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        color: '#1e293b',
        fontSize: '1rem'
    },
    submitButton: {
        padding: '0.75rem 2rem',
        backgroundColor: '#4f46e5',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        color: '#ffffff',
        fontSize: '1rem',
        transition: 'background-color 0.2s'
    }
};