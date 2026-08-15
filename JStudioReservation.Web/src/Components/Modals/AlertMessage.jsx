export const AlertMessage = ({ type, message, onClose }) => {
    if (!message) return null;

    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#4f46e5'
    };

    return (
        <div style={{ ...styles.alert, backgroundColor: colors[type] || colors.info }}>
            <span style={styles.message}>{message}</span>
            {onClose && (
                <button onClick={onClose} style={styles.closeButton}>
                    ×
                </button>
            )}
        </div>
    );
};

const styles = {
    alert: {
        padding: '0.75rem 1.25rem',
        borderRadius: '6px',
        color: '#ffffff',
        marginBottom: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    message: {
        flex: 1
    },
    closeButton: {
        background: 'transparent',
        border: 'none',
        color: '#ffffff',
        fontSize: '1.5rem',
        cursor: 'pointer',
        padding: '0 0.5rem'
    }
};