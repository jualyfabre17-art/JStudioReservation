import { useState, useEffect } from 'react';

export const ArtistForm = ({ initialData = {}, onSubmit, onCancel, isEditing = false }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        genre: '',
        phoneNumber: '',
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
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'El nombre completo es requerido';
        if (formData.fullName.length > 100) newErrors.fullName = 'El nombre no puede exceder 100 caracteres';
        if (!formData.genre.trim()) newErrors.genre = 'El género es requerido';
        if (formData.genre.length > 50) newErrors.genre = 'El género no puede exceder 50 caracteres';
        if (formData.phoneNumber && formData.phoneNumber.length > 20)
            newErrors.phoneNumber = 'El teléfono no puede exceder 20 caracteres';
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
                <label style={styles.label}>Nombre Completo *</label>
                <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    style={{ ...styles.input, borderColor: errors.fullName ? '#ef4444' : '#e2e8f0' }}
                />
                {errors.fullName && <span style={styles.error}>{errors.fullName}</span>}
            </div>

            <div style={styles.field}>
                <label style={styles.label}>Género *</label>
                <input
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    style={{ ...styles.input, borderColor: errors.genre ? '#ef4444' : '#e2e8f0' }}
                />
                {errors.genre && <span style={styles.error}>{errors.genre}</span>}
            </div>

            <div style={styles.field}>
                <label style={styles.label}>Teléfono</label>
                <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    style={{ ...styles.input, borderColor: errors.phoneNumber ? '#ef4444' : '#e2e8f0' }}
                />
                {errors.phoneNumber && <span style={styles.error}>{errors.phoneNumber}</span>}
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