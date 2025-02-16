var $:any;

class Photo
{
    public ID:string;
    public ThumbnailURL:string;
	public Date: Date;
	public Width: number;
	public Height: number;

	public constructor(photo:Photo)
	{
		this.ID = photo.ID;
		this.ThumbnailURL = photo.ThumbnailURL;
		this.Date = new Date(<any>photo.Date);
		this.Width = photo.Width;
		this.Height = photo.Height;
	}
}

class Gallery
{
	photos:Photo[];
	currentYear:number;

	constructor(photos:Photo[])
	{
		this.photos = [];
		if (photos != null) {
			for (let thePhoto of photos)
				this.photos.push(new Photo(thePhoto));
		}

		$('#myButton2023').click(() => this.setYear(2023));
		$('#myButton2024').click(() => this.setYear(2024));

		this.setYear(2023);
	}

	private	setYear(year:number)
	{
		this.currentYear = year;
		if (this.photos != null) {
			const photos = this.photos.concat(this.photos).concat(this.photos).concat(this.photos)//.filter(photo => photo.Date.getUTCFullYear() == this.currentYear);
			this.refillGrid(photos);
		}
	}

	private refillGrid(photos: Photo[]) {
		let theGrid: HTMLElement = document.querySelector('#myImageGrid');
		theGrid.replaceChildren();

		let rowCount = 4;
		let rowWidth = theGrid.getBoundingClientRect().width;

		for (let index = 0; index < photos.length; index += rowCount) {
			let rowDiv: HTMLDivElement = document.createElement("div");
			let rowPhotos = photos.slice(index, Math.min(index + rowCount, photos.length));

			let photosWithScaleFactor = this.calculateImageScaleFactors(rowPhotos, rowWidth)

			for (var photo of photosWithScaleFactor) {
				let theJqImageItem = $('#myImageItemTemplate').children().clone();
				let imageElement = theJqImageItem.find('img').addBack();
				imageElement.attr('src', photo.photo.ThumbnailURL);

				imageElement.width(photo.factor * photo.photo.Width);
				imageElement.height(photo.factor * photo.photo.Height);
			
				rowDiv.appendChild(theJqImageItem[0]);
			}

			theGrid.appendChild(rowDiv);
		}
	}

	// Calculate the factors to scale the photos in the row so that they have equal height
	private calculateImageScaleFactors(photos: Photo[], totalWidth: number) {
		let heightProduct = 1;
		let numerators = [];

		for (let i = 0; i < photos.length; i++) {
			heightProduct *= photos[i].Height;
		}

		let denominator = 0;
		for (let rowIndex = 0; rowIndex < photos.length; rowIndex++) {
			let productWithoutCurrent = heightProduct / photos[rowIndex].Height;
			denominator += productWithoutCurrent * photos[rowIndex].Width;
			numerators.push({ photo: photos[rowIndex], numerator: productWithoutCurrent * totalWidth});
		}

		return numerators.map((n) => { return { photo: n.photo, factor: n.numerator / denominator } });
	}
}