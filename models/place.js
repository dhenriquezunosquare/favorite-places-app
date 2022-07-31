export class Place {
    constructor(title, imageUrl, address, location,id) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.address = address;
        this.location = location // {lat:'0..2121', lng:'0.1212};
        this.id = id
    }
}