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

    const styles = {
        container: {
            maxWidth: '720px',
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
        row: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem'
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
        },
        statusBadge: {
            display: 'inline-block',
            padding: '0.3rem 1rem',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.3px'
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>
                {isEditing ? '✏️ Editar Reserva' : '📅 Nueva Reserva'}
            </h2>
            <p style={styles.subtitle}>
                {isEditing
                    ? 'Actualiza los detalles de la reserva'
                    : 'Registra una nueva sesión de grabación'}
            </p>

            <form onSubmit={handleSubmit} style={styles.form}>
                {/* Artista */}
                <div style={styles.field}>
                    <label style={styles.label}>
                        Artista <span style={styles.labelRequired}>*</span>
                    </label>
                    <select
                        name="artistId"
                        value={formData.artistId}
                        onChange={handleChange}
                        style={{
                            ...styles.select,
                            ...(errors.artistId ? styles.inputError : {})
                        }}
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

                {/* Sala y Servicio (2 columnas) */}
                <div style={styles.row}>
                    <div style={styles.field}>
                        <label style={styles.label}>
                            Sala <span style={styles.labelRequired}>*</span>
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
                                    {room.name} (${room.pricePerHour}/h)
                                </option>
                            ))}
                        </select>
                        {errors.roomId && <span style={styles.error}>{errors.roomId}</span>}
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Servicio adicional</label>
                        <select
                            name="extraServiceId"
                            value={formData.extraServiceId || ''}
                            onChange={handleChange}
                            style={styles.select}
                        >
                            <option value="">Ninguno</option>
                            {extraServices.map(service => (
                                <option key={service.id} value={service.id}>
                                    {service.name} (${service.price})
                                </option>
                            ))}
                        </select>
                        <span style={styles.helperText}>Opcional</span>
                    </div>
                </div>

                {/* Fechas (2 columnas) */}
                <div style={styles.row}>
                    <div style={styles.field}>
                        <label style={styles.label}>
                            Inicio <span style={styles.labelRequired}>*</span>
                        </label>
                        <input
                            type="datetime-local"
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleChange}
                            style={{
                                ...styles.input,
                                ...(errors.startTime ? styles.inputError : {})
                            }}
                        />
                        {errors.startTime && <span style={styles.error}>{errors.startTime}</span>}
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>
                            Fin <span style={styles.labelRequired}>*</span>
                        </label>
                        <input
                            type="datetime-local"
                            name="endTime"
                            value={formData.endTime}
                            onChange={handleChange}
                            style={{
                                ...styles.input,
                                ...(errors.endTime ? styles.inputError : {})
                            }}
                        />
                        {errors.endTime && <span style={styles.error}>{errors.endTime}</span>}
                    </div>
                </div>

                {/* Estado (solo en edición) */}
                {isEditing && (
                    <div style={styles.field}>
                        <label style={styles.label}>Estado</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            style={{
                                ...styles.select,
                                ...(errors.status ? styles.inputError : {})
                            }}
                        >
                            <option value="Pending">Pendiente</option>
                            <option value="Confirmed">Confirmada</option>
                            <option value="Cancelled">Cancelada</option>
                            <option value="Completed">Completada</option>
                        </select>
                        {errors.status && <span style={styles.error}>{errors.status}</span>}
                    </div>
                )}

                {/* Botones */}
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
                        {isEditing ? 'Actualizar' : 'Crear Reserva'}
                    </button>
                </div>
            </form>
        </div>
    );
};