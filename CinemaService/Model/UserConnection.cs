using ChatService.Model;
using Microsoft.Net.Http.Headers;

namespace ChatService.DAL
{
    public class UserConnection
    {
        public string User { get; set; }
        public string Room { get; set; }
    }
}
