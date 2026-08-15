export class ExtraServiceModel {
    constructor({ id = 0, name = '', price = 0, roomId = 0, roomName = '' } = {}) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.roomId = roomId;
        this.roomName = roomName;
    }
}