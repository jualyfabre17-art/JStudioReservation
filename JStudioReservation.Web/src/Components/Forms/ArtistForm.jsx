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

    const styles = {
        container: {
            maxWidth: '640px',
            margin: '0 auto',
            padding: '2.5rem',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            boxShadow: '0 10px 40px rgba(30, 41, 59, 0.08)',
            border: '1px solid rgba(226, 232, 240, 0.5)',
            transition: 'box-shadow 0.3s ease'
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
            color: '#0f172a'
        },
        inputFocus: {
            borderColor: '#4f46e5',
            backgroundColor: '#ffffff',
            boxShadow: '0 0 0 4px rgba(79, 70, 229, 0.08)'
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
        cancelButtonHover: {
            backgroundColor: '#f1f5f9',
            borderColor: '#cbd5e1'
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
        submitButtonHover: {
            backgroundColor: '#4338ca',
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(79, 70, 229, 0.30)'
        },
        
        helperText: {
            fontSize: '0.8rem',
            color: '#94a3b8',
            marginTop: '0.2rem',
            paddingLeft: '0.25rem'
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>
                {isEditing ? '✏️ Editar Artista' : '🎤 Nuevo Artista'}
            </h2>
            <p style={styles.subtitle}>
                {isEditing
                    ? 'Actualiza la información del artista'
                    : 'Registra un nuevo artista en el estudio'}
            </p>

            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.field}>
                    <label style={styles.label}>
                        Nombre completo <span style={styles.labelRequired}>*</span>
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Ej: Juan Pérez"
                        value={formData.fullName}
                        onChange={handleChange}
                        style={{
                            ...styles.input,
                            ...(errors.fullName ? styles.inputError : {}),
                            ...(document.activeElement === document.querySelector('input[name="fullName"]') ? styles.inputFocus : {})
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#4f46e5';
                            e.target.style.backgroundColor = '#ffffff';
                            e.target.style.boxShadow = '0 0 0 4px rgba(79, 70, 229, 0.08)';
                        }}
                        onBlur={(e) => {
                            if (!errors.fullName) {
                                e.target.style.borderColor = '#e2e8f0';
                                e.target.style.backgroundColor = '#f8fafc';
                                e.target.style.boxShadow = 'none';
                            }
                        }}
                    />
                    {errors.fullName && <span style={styles.error}>{errors.fullName}</span>}
                    <span style={styles.helperText}>Máximo 100 caracteres</span>
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>
                        Género musical <span style={styles.labelRequired}>*</span>
                    </label>
                    <input
                        type="text"
                        name="genre"
                        placeholder="Ej: Rock, Pop, Jazz"
                        value={formData.genre}
                        onChange={handleChange}
                        style={{
                            ...styles.input,
                            ...(errors.genre ? styles.inputError : {}),
                            ...(document.activeElement === document.querySelector('input[name="genre"]') ? styles.inputFocus : {})
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#4f46e5';
                            e.target.style.backgroundColor = '#ffffff';
                            e.target.style.boxShadow = '0 0 0 4px rgba(79, 70, 229, 0.08)';
                        }}
                        onBlur={(e) => {
                            if (!errors.genre) {
                                e.target.style.borderColor = '#e2e8f0';
                                e.target.style.backgroundColor = '#f8fafc';
                                e.target.style.boxShadow = 'none';
                            }
                        }}
                    />
                    {errors.genre && <span style={styles.error}>{errors.genre}</span>}
                    <span style={styles.helperText}>Máximo 50 caracteres</span>
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Teléfono de contacto</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Ej: 809-555-1234"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        style={{
                            ...styles.input,
                            ...(errors.phoneNumber ? styles.inputError : {}),
                            ...(document.activeElement === document.querySelector('input[name="phoneNumber"]') ? styles.inputFocus : {})
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#4f46e5';
                            e.target.style.backgroundColor = '#ffffff';
                            e.target.style.boxShadow = '0 0 0 4px rgba(79, 70, 229, 0.08)';
                        }}
                        onBlur={(e) => {
                            if (!errors.phoneNumber) {
                                e.target.style.borderColor = '#e2e8f0';
                                e.target.style.backgroundColor = '#f8fafc';
                                e.target.style.boxShadow = 'none';
                            }
                        }}
                    />
                    {errors.phoneNumber && <span style={styles.error}>{errors.phoneNumber}</span>}
                    <span style={styles.helperText}>Opcional. Máximo 20 caracteres</span>
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
                        {isEditing ? 'Actualizar' : 'Crear Artista'}
                    </button>
                </div>
            </form>
        </div>
    );
};