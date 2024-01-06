using ChatService.DAL;
using Microsoft.Identity.Client;
using System.Collections.Generic;

namespace ChatService.Model
{
    public class Room
    {
        public string Name { get; set; } 
        public  List<string> UsersInRoom { get; set; }
        public  Video Video { get; set; }

        public Room(string _name, List<string> _usersInRoom, Video _video) 
        { 
            Name = _name;
            UsersInRoom = _usersInRoom;
            Video = _video;
        
        }
        public Room(UserConnection _userConnection)
        {
            Name = _userConnection.Room;
            UsersInRoom = new List<string> { _userConnection.User };
            Video = new Video(null, null);

        }

    }
}
