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
			const photos = this.photos.filter(photo => photo.Date.getUTCFullYear() == this.currentYear);
			this.refillGrid(photos);
		}
	}

	private refillGrid(photos: Photo[]) {
		let theGrid: HTMLElement = document.querySelector('#myImageGrid');
		theGrid.replaceChildren();
		let rowDiv: HTMLDivElement = document.createElement("div");

		for (let index = 0; index < photos.length; index++) {
			let photo = photos[index];
			let theJqImageItem = $('#myImageItemTemplate').children().clone();
			theJqImageItem.find('img').addBack().attr('src', photo.ThumbnailURL);
			rowDiv.appendChild(theJqImageItem[0]);

			if (index % 2 == 1) {
				theGrid.appendChild(rowDiv);
				rowDiv = document.createElement("div");
			}
		}
	}
}