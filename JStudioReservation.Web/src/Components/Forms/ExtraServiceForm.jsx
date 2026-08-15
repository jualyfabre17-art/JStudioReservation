import { useState, useEffect } from 'react';

export const ExtraServiceForm = ({ initialData = {}, onSubmit, onCancel, isEditing = false, rooms = [] }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        roomId: 0,
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
            [name]: name === 'price' || name === 'roomId'
                ? parseFloat(value) || 0
                : value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'El nombre del servicio es requerido';
        if (formData.name.length > 100) newErrors.name = 'El nombre no puede exceder 100 caracteres';
        if (formData.price < 0) newErrors.price = 'El precio no puede ser negativo';
        if (formData.roomId <= 0) newErrors.roomId = 'Debe seleccionar una sala';
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
                <label style={styles.label}>Nombre del Servicio *</label>
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
                <label style={styles.label}>Precio *</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    style={{ ...styles.input, borderColor: errors.price ? '#ef4444' : '#e2e8f0' }}
                />
                {errors.price && <span style={styles.error}>{errors.price}</span>}
            </div>

            <div style={styles.field}>
                <label style={styles.label}>Sala Asociada *</label>
                <select
                    name="roomId"
                    value={formData.roomId}
                    onChange={handleChange}
                    style={{ ...styles.input, borderColor: errors.roomId ? '#ef4444' : '#e2e8f0' }}
                >
                    <option value="0">Seleccione una sala...</option>
                    {rooms.map(room => (
                        <option key={room.id} value={room.id}>
                            {room.name}
                        </option>
                    ))}
                </select>
                {errors.roomId && <span style={styles.error}>{errors.roomId}</span>}
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