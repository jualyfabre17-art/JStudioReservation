const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:7270/api'; 

export const API_ENDPOINTS = {
    ARTISTS: `${API_BASE_URL}/Artist`,
    ROOMS: `${API_BASE_URL}/Room`,
    EXTRA_SERVICES: `${API_BASE_URL}/ExtraService`,
    BOOKINGS: `${API_BASE_URL}/Booking`
};