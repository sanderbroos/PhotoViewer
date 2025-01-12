namespace PhotoViewer.Data
{
    public class Photo
    {
        public int ID { get; set; }
        public required string ThumbnailURL { get; set; }
        public DateTime Date { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
    }
}
