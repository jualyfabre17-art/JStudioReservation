import { BaseApiService } from '../BaseApiService';
import { API_ENDPOINTS } from '../../utils/apiEndpoints';

export class ExtraServiceService extends BaseApiService {
    constructor() {
        super(API_ENDPOINTS.EXTRA_SERVICES);
    }

    async getByRoom(roomId) {
        const response = await fetch(`${this.endpoint}/room/${roomId}`);
        return this.handleResponse(response);
    }

    async searchByName(searchTerm) {
        const params = new URLSearchParams({ term: searchTerm });
        const response = await fetch(`${this.endpoint}/search?${params}`);
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