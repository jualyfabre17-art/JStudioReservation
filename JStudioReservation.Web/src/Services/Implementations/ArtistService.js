import { BaseApiService } from '../BaseApiService';
import { API_ENDPOINTS } from '../../utils/apiEndpoints';

export class ArtistService extends BaseApiService {
    constructor() {
        super(API_ENDPOINTS.ARTISTS);
    }

    async getByGenre(genre) {
        const response = await fetch(`${this.endpoint}/genre/${encodeURIComponent(genre)}`);
        return this.handleResponse(response);
    }

    async getWithDetails(id) {
        const response = await fetch(`${this.endpoint}/${id}/details`);
        return this.handleResponse(response);
    }
}