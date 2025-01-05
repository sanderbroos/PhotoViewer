namespace PhotoViewer.Models
{
    public class Photo
    {
        public int ID { get; set; }
        public required string ThumbnailURL { get; set; }
        public DateTime Date { get; set; }
    }
}
