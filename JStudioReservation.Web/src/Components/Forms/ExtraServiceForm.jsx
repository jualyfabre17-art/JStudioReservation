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

    const styles = {
        container: {
            maxWidth: '600px',
            margin: '0 auto',
            padding: '2.5rem',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            boxShadow: '0 10px 40px rgba(30, 41, 59, 0.08)',
            border: '1px solid rgba(226, 232, 240, 0.5)'
        },
        title: {
            fontSize: '1.75rem',
            fontWeight: '700',
            color: '#0f172a',
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em',
            fontFamily: "'Inter', 'Segoe UI', sans-serif"
        },
        subtitle: {
            fontSize: '0.95rem',
            color: '#64748b',
            marginBottom: '2rem',
            paddingBottom: '1.5rem',
            borderBottom: '2px solid #f1f5f9'
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1.75rem'
        },
        field: {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem'
        },
        label: {
            fontWeight: '600',
            color: '#1e293b',
            fontSize: '0.85rem',
            letterSpacing: '0.3px',
            textTransform: 'uppercase',
            fontFamily: "'Inter', 'Segoe UI', sans-serif"
        },
        labelRequired: {
            color: '#ef4444',
            marginLeft: '2px'
        },
        input: {
            padding: '0.9rem 1.2rem',
            border: '2px solid #e2e8f0',
            borderRadius: '12px',
            fontSize: '1rem',
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            backgroundColor: '#f8fafc',
            transition: 'all 0.25s ease',
            outline: 'none',
            color: '#0f172a',
            width: '100%',
            boxSizing: 'border-box'
        },
        select: {
            padding: '0.9rem 1.2rem',
            border: '2px solid #e2e8f0',
            borderRadius: '12px',
            fontSize: '1rem',
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            backgroundColor: '#f8fafc',
            transition: 'all 0.25s ease',
            outline: 'none',
            color: '#0f172a',
            width: '100%',
            boxSizing: 'border-box',
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23475569' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 1rem center',
            paddingRight: '2.5rem'
        },
        inputError: {
            borderColor: '#ef4444',
            backgroundColor: '#fef2f2'
        },
        error: {
            color: '#ef4444',
            fontSize: '0.85rem',
            fontWeight: '500',
            marginTop: '0.25rem',
            paddingLeft: '0.25rem'
        },
        helperText: {
            fontSize: '0.8rem',
            color: '#94a3b8',
            marginTop: '0.2rem',
            paddingLeft: '0.25rem'
        },
        actions: {
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end',
            marginTop: '1.5rem',
            paddingTop: '1.5rem',
            borderTop: '2px solid #f1f5f9'
        },
        cancelButton: {
            padding: '0.85rem 2rem',
            backgroundColor: 'transparent',
            border: '2px solid #e2e8f0',
            borderRadius: '12px',
            cursor: 'pointer',
            color: '#475569',
            fontSize: '0.9rem',
            fontWeight: '600',
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            transition: 'all 0.2s ease',
            textTransform: 'uppercase',
            letterSpacing: '0.3px'
        },
        submitButton: {
            padding: '0.85rem 2.5rem',
            backgroundColor: '#4f46e5',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            color: '#ffffff',
            fontSize: '0.9rem',
            fontWeight: '600',
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            transition: 'all 0.25s ease',
            textTransform: 'uppercase',
            letterSpacing: '0.3px',
            boxShadow: '0 4px 14px rgba(79, 70, 229, 0.25)'
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>
                {isEditing ? '✏️ Editar Servicio Adicional' : '🎛️ Nuevo Servicio Adicional'}
            </h2>
            <p style={styles.subtitle}>
                {isEditing
                    ? 'Actualiza la información del servicio'
                    : 'Registra un nuevo servicio para las sesiones'}
            </p>

            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.field}>
                    <label style={styles.label}>
                        Nombre del servicio <span style={styles.labelRequired}>*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Ej: Ingeniero de Sonido, Mezcla, Instrumentos"
                        value={formData.name}
                        onChange={handleChange}
                        style={{
                            ...styles.input,
                            ...(errors.name ? styles.inputError : {})
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#4f46e5';
                            e.target.style.backgroundColor = '#ffffff';
                            e.target.style.boxShadow = '0 0 0 4px rgba(79, 70, 229, 0.08)';
                        }}
                        onBlur={(e) => {
                            if (!errors.name) {
                                e.target.style.borderColor = '#e2e8f0';
                                e.target.style.backgroundColor = '#f8fafc';
                                e.target.style.boxShadow = 'none';
                            }
                        }}
                    />
                    {errors.name && <span style={styles.error}>{errors.name}</span>}
                    <span style={styles.helperText}>Máximo 100 caracteres</span>
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>
                        Precio <span style={styles.labelRequired}>*</span>
                    </label>
                    <input
                        type="number"
                        name="price"
                        placeholder="0.00"
                        value={formData.price}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        style={{
                            ...styles.input,
                            ...(errors.price ? styles.inputError : {})
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#4f46e5';
                            e.target.style.backgroundColor = '#ffffff';
                            e.target.style.boxShadow = '0 0 0 4px rgba(79, 70, 229, 0.08)';
                        }}
                        onBlur={(e) => {
                            if (!errors.price) {
                                e.target.style.borderColor = '#e2e8f0';
                                e.target.style.backgroundColor = '#f8fafc';
                                e.target.style.boxShadow = 'none';
                            }
                        }}
                    />
                    {errors.price && <span style={styles.error}>{errors.price}</span>}
                    <span style={styles.helperText}>Precio en dólares (USD)</span>
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>
                        Sala asociada <span style={styles.labelRequired}>*</span>
                    </label>
                    <select
                        name="roomId"
                        value={formData.roomId}
                        onChange={handleChange}
                        style={{
                            ...styles.select,
                            ...(errors.roomId ? styles.inputError : {})
                        }}
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
                    <button
                        type="button"
                        onClick={onCancel}
                        style={styles.cancelButton}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#f1f5f9';
                            e.target.style.borderColor = '#cbd5e1';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.borderColor = '#e2e8f0';
                        }}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        style={styles.submitButton}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#4338ca';
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 6px 20px rgba(79, 70, 229, 0.30)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#4f46e5';
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 14px rgba(79, 70, 229, 0.25)';
                        }}
                    >
                        {isEditing ? 'Actualizar' : 'Crear Servicio'}
                    </button>
                </div>
            </form>
        </div>
    );
};