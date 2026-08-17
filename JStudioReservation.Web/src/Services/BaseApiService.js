export class BaseApiService {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    async handleResponse(response) {
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        return response.json();
    }

    async getAll() {
        const response = await fetch(this.endpoint);
        return this.handleResponse(response);
    }

    async getById(id) {
        const response = await fetch(`${this.endpoint}/${id}`);
        return this.handleResponse(response);
    }

    async create(data) {
        const response = await fetch(this.endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return this.handleResponse(response);
    }

    async update(id, data) {
        const response = await fetch(`${this.endpoint}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.status === 204) {
            return true;
        }

        return this.handleResponse(response);
    }

    async delete(id) {
        const response = await fetch(`${this.endpoint}/${id}`, {
            method: 'DELETE'
        });

        if (response.status === 204) {
            return true;
        }

        return this.handleResponse(response);
    }
}