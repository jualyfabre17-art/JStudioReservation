export const LoadingSpinner = () => {
    return (
        <div style={styles.container}>
            <div style={styles.spinner}></div>
            <p style={styles.text}>Cargando...</p>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
    },
    spinner: {
        border: '4px solid #e2e8f0',
        borderTop: '4px solid #4f46e5',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        animation: 'spin 1s linear infinite'
    },
    text: {
        marginTop: '1rem',
        color: '#475569'
    }
};

