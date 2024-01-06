namespace ChatService.Model
{
    public class Video
    {
        public string? URL { get; set; }
        public int? Time { get; set; }

        public Video(string? _url, int? _time) 
        { 
            URL = _url;
            Time = _time;
        }
    }
}
