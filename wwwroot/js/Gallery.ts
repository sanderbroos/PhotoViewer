﻿var $:any;

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