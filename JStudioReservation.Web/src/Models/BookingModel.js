export class BookingModel {
    constructor({
        id = 0,
        artistId = 0,
        artistName = '',
        roomId = 0,
        roomName = '',
        extraServiceId = null,
        extraServiceName = '',
        startTime = new Date(),
        endTime = new Date(),
        status = 'Pending'
    } = {}) {
        this.id = id;
        this.artistId = artistId;
        this.artistName = artistName;
        this.roomId = roomId;
        this.roomName = roomName;
        this.extraServiceId = extraServiceId;
        this.extraServiceName = extraServiceName;
        this.startTime = startTime;
        this.endTime = endTime;
        this.status = status;
    }
}