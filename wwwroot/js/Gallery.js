var $;
class Photo {
    constructor(photo) {
        this.ID = photo.ID;
        this.ThumbnailURL = photo.ThumbnailURL;
        this.Date = new Date(photo.Date);
    }
}
class Gallery {
    constructor(photos) {
        this.currentYear = 2023;
        this.photos = [];
        if (photos != null) {
            for (let thePhoto of photos)
                this.photos.push(new Photo(thePhoto));
        }
        $('#myButton2023').click(() => this.setYear(2023));
        $('#myButton2024').click(() => this.setYear(2024));
        this.setYear(2023);
    }
    setYear(year) {
        this.currentYear = year;
        let theGrid = $('#myImageGrid').empty();
        if (this.photos != null) {
            for (let thePhoto of this.photos) {
                if (thePhoto.Date.getUTCFullYear() != this.currentYear)
                    continue;
                let theImageItem = $('#myImageItemTemplate').children().clone();
                theImageItem.find('img').addBack().attr('src', thePhoto.ThumbnailURL);
                theGrid.append(theImageItem);
            }
        }
    }
}
//# sourceMappingURL=Gallery.js.map