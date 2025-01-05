var $:any;

class Photo
{
    ID:string;
    ThumbnailURL:string;
    Date:Date;

	public constructor(photo:object)
	{

	}
}

class Gallery
{
	photos:Photo[];
	currentYear:number = 2023;

	constructor(photos:Photo[])
	{
		this.photos = [];
		for (let thePhoto of photos)
			this.photos.push(new Photo(thePhoto));

		$('#myButton2023').click(() => this.setYear(2023));
		$('#myButton2024').click(() => this.setYear(2024));

		this.setYear(2023);
	}

	private	setYear(year:number)
	{
		this.currentYear = year;
		let theGrid = $('#myImageGrid').empty();
		for (let thePhoto of this.photos) {
			if (thePhoto.Date.getUTCFullYear() != this.currentYear)
				continue;
			let theImageItem = $('#myImageItemTemplate').children().clone();
			theImageItem.find('img').attr('src', thePhoto.ThumbnailURL);
			theGrid.append(theImageItem);
		}
	}
}