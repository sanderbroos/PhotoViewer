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
        window.addEventListener('resize', function () { return _this.resizeGrid(); });
        this.setYear(2023);
    }
    Gallery.prototype.resizeGrid = function () {
        this.setYear(this.currentYear);
    };
    Gallery.prototype.setYear = function (year) {
        this.currentYear = year;
        if (this.photos != null) {
            var photos = this.photos.concat(this.photos).concat(this.photos).concat(this.photos); //.filter(photo => photo.Date.getUTCFullYear() == this.currentYear);
            this.refillGrid(photos);
        }
    };
    Gallery.prototype.refillGrid = function (photos) {
        var theGrid = document.querySelector('#myImageGrid');
        theGrid.replaceChildren();
        var rowCount = 3;
        var rowWidth = theGrid.getBoundingClientRect().width;
        for (var index = 0; index < photos.length; index += rowCount) {
            var rowDiv = document.createElement("div");
            var rowPhotos = photos.slice(index, Math.min(index + rowCount, photos.length));
            var photosWithScaleFactor = this.calculateImageScaleFactors(rowPhotos, rowWidth);
            for (var _i = 0, photosWithScaleFactor_1 = photosWithScaleFactor; _i < photosWithScaleFactor_1.length; _i++) {
                var photo = photosWithScaleFactor_1[_i];
                var theJqImageItem = $('#myImageItemTemplate').children().clone();
                var imageElement = theJqImageItem.find('img').addBack();
                imageElement.attr('src', photo.photo.ThumbnailURL);
                imageElement.width(photo.factor * photo.photo.Width);
                imageElement.height(photo.factor * photo.photo.Height);
                rowDiv.appendChild(theJqImageItem[0]);
            }
            theGrid.appendChild(rowDiv);
        }
    };
    // Calculate the factors to scale the photos in the row so that they have equal height
    Gallery.prototype.calculateImageScaleFactors = function (photos, totalWidth) {
        var heightProduct = 1;
        var numerators = [];
        for (var i = 0; i < photos.length; i++) {
            heightProduct *= photos[i].Height;
        }
        var denominator = 0;
        for (var rowIndex = 0; rowIndex < photos.length; rowIndex++) {
            var productWithoutCurrent = heightProduct / photos[rowIndex].Height;
            denominator += productWithoutCurrent * photos[rowIndex].Width;
            numerators.push({ photo: photos[rowIndex], numerator: productWithoutCurrent * totalWidth });
        }
        return numerators.map(function (n) { return { photo: n.photo, factor: n.numerator / denominator }; });
    };
    return Gallery;
}());
//# sourceMappingURL=Gallery.js.map