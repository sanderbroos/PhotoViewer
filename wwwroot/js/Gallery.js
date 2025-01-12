var $;
var Photo = /** @class */ (function () {
    function Photo(photo) {
        this.ID = photo.ID;
        this.ThumbnailURL = photo.ThumbnailURL;
        this.Date = new Date(photo.Date);
    }
    return Photo;
}());
var Gallery = /** @class */ (function () {
    function Gallery(photos) {
        var _this = this;
        this.currentYear = 2023;
        this.photos = [];
        if (photos != null) {
            for (var _i = 0, photos_1 = photos; _i < photos_1.length; _i++) {
                var thePhoto = photos_1[_i];
                this.photos.push(new Photo(thePhoto));
            }
        }
        $('#myButton2023').click(function () { return _this.setYear(2023); });
        $('#myButton2024').click(function () { return _this.setYear(2024); });
        this.setYear(2023);
    }
    Gallery.prototype.setYear = function (year) {
        this.currentYear = year;
        var theGrid = $('#myImageGrid').empty();
        if (this.photos != null) {
            for (var _i = 0, _a = this.photos; _i < _a.length; _i++) {
                var thePhoto = _a[_i];
                if (thePhoto.Date.getUTCFullYear() != this.currentYear)
                    continue;
                var theImageItem = $('#myImageItemTemplate').children().clone();
                theImageItem.find('img').addBack().attr('src', thePhoto.ThumbnailURL);
                theGrid.append(theImageItem);
            }
        }
    };
    return Gallery;
}());
//# sourceMappingURL=Gallery.js.map