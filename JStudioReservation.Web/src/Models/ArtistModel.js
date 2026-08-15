export class ArtistModel {
    constructor({ id = 0, fullName = '', genre = '', phoneNumber = '' } = {}) {
        this.id = id;
        this.fullName = fullName;
        this.genre = genre;
        this.phoneNumber = phoneNumber;
    }
}