import { useState, useEffect } from 'react';
import { toISOStringLocal } from '../../utils/dateHelpers';

export const BookingForm = ({
    initialData = {},
    onSubmit,
    onCancel,
    isEditing = false,
    artists = [],
    rooms = [],
    extraServices = []
}) => {
    const [formData, setFormData] = useState({
        artistId: 0,
        roomId: 0,
        extraServiceId: null,
        startTime: new Date().toISOString().slice(0, 16),
        endTime: new Date(Date.now() + 3600000).toISOString().slice(0, 16),
        status: 'Pending',
        ...initialData
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setFormData({
                ...initialData,
                startTime: initialData.startTime ? toISOStringLocal(initialData.startTime) : '',
                endTime: initialData.endTime ? toISOStringLocal(initialData.endTime) : ''
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'artistId' || name === 'roomId' || name === 'extraServiceId'
                ? parseInt(value) || 0
                : value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.artistId || formData.artistId <= 0)
            newErrors.artistId = 'Debe seleccionar un artista';
        if (!formData.roomId || formData.roomId <= 0)
            newErrors.roomId = 'Debe seleccionar una sala';
        if (!formData.startTime) newErrors.startTime = 'La fecha de inicio es requerida';
        if (!formData.endTime) newErrors.endTime = 'La fecha de fin es requerida';

        if (formData.startTime && formData.endTime) {
            const start = new Date(formData.startTime);
            const end = new Date(formData.endTime);
            if (start >= end) newErrors.endTime = 'La fecha de fin debe ser posterior a la de inicio';
            if (start < new Date()) newErrors.startTime = 'La fecha de inicio no puede ser en el pasado';
        }

        if (formData.status && !['Pending', 'Confirmed', 'Cancelled', 'Completed'].includes(formData.status)) {
            newErrors.status = 'Estado inválido';
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const submitData = {
            ...formData,
            startTime: new Date(formData.startTime).toISOString(),
            endTime: new Date(formData.endTime).toISOString(),
            extraServiceId: formData.extraServiceId || null
        };

        onSubmit(submitData);
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.field}>
                <label style={styles.label}>Artista *</label>
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

            <div style={styles.field}>
                <label style={styles.label}>Sala *</label>
                <select
                    name="roomId"
                    value={formData.roomId}
                    onChange={handleChange}
                    style={{ ...styles.input, borderColor: errors.roomId ? '#ef4444' : '#e2e8f0' }}
                >
                    <option value="0">Seleccione una sala...</option>
                    {rooms.map(room => (
                        <option key={room.id} value={room.id}>
                            {room.name} (${room.pricePerHour}/hora)
                        </option>
                    ))}
                </select>
                {errors.roomId && <span style={styles.error}>{errors.roomId}</span>}
            </div>

            <div style={styles.field}>
                <label style={styles.label}>Servicio Adicional (opcional)</label>
                <select
                    name="extraServiceId"
                    value={formData.extraServiceId || ''}
                    onChange={handleChange}
                    style={styles.input}
                >
                    <option value="">Ninguno</option>
                    {extraServices.map(service => (
                        <option key={service.id} value={service.id}>
                            {service.name} (${service.price})
                        </option>
                    ))}
                </select>
            </div>

            <div style={styles.field}>
                <label style={styles.label}>Fecha/Hora Inicio *</label>
                <input
                    type="datetime-local"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    style={{ ...styles.input, borderColor: errors.startTime ? '#ef4444' : '#e2e8f0' }}
                />
                {errors.startTime && <span style={styles.error}>{errors.startTime}</span>}
            </div>

            <div style={styles.field}>
                <label style={styles.label}>Fecha/Hora Fin *</label>
                <input
                    type="datetime-local"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    style={{ ...styles.input, borderColor: errors.endTime ? '#ef4444' : '#e2e8f0' }}
                />
                {errors.endTime && <span style={styles.error}>{errors.endTime}</span>}
            </div>

            {isEditing && (
                <div style={styles.field}>
                    <label style={styles.label}>Estado</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        style={{ ...styles.input, borderColor: errors.status ? '#ef4444' : '#e2e8f0' }}
                    >
                        <option value="Pending">Pendiente</option>
                        <option value="Confirmed">Confirmada</option>
                        <option value="Cancelled">Cancelada</option>
                        <option value="Completed">Completada</option>
                    </select>
                    {errors.status && <span style={styles.error}>{errors.status}</span>}
                </div>
            )}

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
        maxWidth: '600px',
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