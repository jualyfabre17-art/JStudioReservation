export class RoomModel {
    constructor({ id = 0, name = '', pricePerHour = 0, capacity = 0, artistId = 0, artistName = '' } = {}) {
        this.id = id;
        this.name = name;
        this.pricePerHour = pricePerHour;
        this.capacity = capacity;
        this.artistId = artistId;
        this.artistName = artistName;
    }
}