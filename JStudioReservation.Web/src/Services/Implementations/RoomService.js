import { BaseApiService } from '../BaseApiService';
import { API_ENDPOINTS } from '../../utils/apiEndpoints';

export class RoomService extends BaseApiService {
    constructor() {
        super(API_ENDPOINTS.ROOMS);
    }

    async getByArtist(artistId) {
        const response = await fetch(`${this.endpoint}/artist/${artistId}`);
        return this.handleResponse(response);
    }

    async getAvailable(startTime, endTime) {
        const params = new URLSearchParams({
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString()
        });
        const response = await fetch(`${this.endpoint}/available?${params}`);
        return this.handleResponse(response);
    }

    async checkAvailability(roomId, startTime, endTime) {
        const params = new URLSearchParams({
            roomId: roomId,
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString()
        });
        const response = await fetch(`${this.endpoint}/check-availability?${params}`);
        return this.handleResponse(response);
    }

    async getByPriceRange(minPrice, maxPrice) {
        const params = new URLSearchParams({
            minPrice: minPrice,
            maxPrice: maxPrice
        });
        const response = await fetch(`${this.endpoint}/price-range?${params}`);
        return this.handleResponse(response);
    }
}