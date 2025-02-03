var $;
var Photo = /** @class */ (function () {
    function Photo(photo) {
        this.ID = photo.ID;
        this.ThumbnailURL = photo.ThumbnailURL;
        this.Date = new Date(photo.Date);
        this.Width = photo.Width;
        this.Height = photo.Height;
    }
    return Photo;
}());
var Gallery = /** @class */ (function () {
    function Gallery(photos) {
        var _this = this;
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
        var _this = this;
        this.currentYear = year;
        if (this.photos != null) {
            var photos = this.photos.filter(function (photo) { return photo.Date.getUTCFullYear() == _this.currentYear; });
            this.refillGrid(photos);
        }
    };
    Gallery.prototype.refillGrid = function (photos) {
        var theGrid = document.querySelector('#myImageGrid');
        theGrid.replaceChildren();
        var rowDiv = document.createElement("div");
        for (var index = 0; index < photos.length; index++) {
            var photo = photos[index];
            var theJqImageItem = $('#myImageItemTemplate').children().clone();
            theJqImageItem.find('img').addBack().attr('src', photo.ThumbnailURL);
            rowDiv.appendChild(theJqImageItem[0]);
            if (index % 2 == 1) {
                theGrid.appendChild(rowDiv);
                rowDiv = document.createElement("div");
            }
        }
    };
    return Gallery;
}());
//# sourceMappingURL=Gallery.js.map