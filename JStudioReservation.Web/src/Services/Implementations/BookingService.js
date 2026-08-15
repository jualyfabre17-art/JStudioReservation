import { BaseApiService } from '../BaseApiService';
import { API_ENDPOINTS } from '../../utils/apiEndpoints';

export class BookingService extends BaseApiService {
    constructor() {
        super(API_ENDPOINTS.BOOKINGS);
    }

    async getByArtist(artistId) {
        const response = await fetch(`${this.endpoint}/artist/${artistId}`);
        return this.handleResponse(response);
    }

    async getByRoom(roomId) {
        const response = await fetch(`${this.endpoint}/room/${roomId}`);
        return this.handleResponse(response);
    }

    async getByStatus(status) {
        const response = await fetch(`${this.endpoint}/status/${status}`);
        return this.handleResponse(response);
    }

    async getByDateRange(startDate, endDate) {
        const params = new URLSearchParams({
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString()
        });
        const response = await fetch(`${this.endpoint}/date-range?${params}`);
        return this.handleResponse(response);
    }

    async getUpcoming(days = 7) {
        const params = new URLSearchParams({ days });
        const response = await fetch(`${this.endpoint}/upcoming?${params}`);
        return this.handleResponse(response);
    }

    async getActive() {
        const response = await fetch(`${this.endpoint}/active`);
        return this.handleResponse(response);
    }

    async getTotalByArtist(artistId) {
        const response = await fetch(`${this.endpoint}/artist/${artistId}/total`);
        return this.handleResponse(response);
    }

    async getTotalByRoom(roomId) {
        const response = await fetch(`${this.endpoint}/room/${roomId}/total`);
        return this.handleResponse(response);
    }

    async updateStatus(bookingId, status) {
        const response = await fetch(`${this.endpoint}/${bookingId}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(status)
        });
        return this.handleResponse(response);
    }
}