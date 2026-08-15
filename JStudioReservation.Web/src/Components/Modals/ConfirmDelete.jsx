export const ConfirmDelete = ({ isOpen, onClose, onConfirm, entityName }) => {
    if (!isOpen) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h3 style={styles.title}>Confirmar Eliminación</h3>
                <p style={styles.message}>
                    ¿Estás seguro de que deseas eliminar <strong>{entityName}</strong>?
                </p>
                <div style={styles.actions}>
                    <button onClick={onClose} style={styles.cancelButton}>
                        Cancelar
                    </button>
                    <button onClick={onConfirm} style={styles.deleteButton}>
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
    },
    modal: {
        backgroundColor: '#ffffff',
        padding: '2rem',
        borderRadius: '8px',
        maxWidth: '400px',
        width: '100%',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    },
    title: {
        margin: '0 0 1rem 0',
        color: '#1e293b'
    },
    message: {
        color: '#475569',
        marginBottom: '1.5rem'
    },
    actions: {
        display: 'flex',
        gap: '1rem',
        justifyContent: 'flex-end'
    },
    cancelButton: {
        padding: '0.5rem 1.5rem',
        backgroundColor: '#e2e8f0',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        color: '#1e293b'
    },
    deleteButton: {
        padding: '0.5rem 1.5rem',
        backgroundColor: '#ef4444',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        color: '#ffffff'
    }
};