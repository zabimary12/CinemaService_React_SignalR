using ChatService.Interface;
using ChatService.Model;
using Microsoft.VisualBasic;
using System.Collections.Generic;
using System.ComponentModel;
using System.Threading.Tasks;

namespace ChatService.DAL
{
    public class RoomsRepository
    {
        private static RoomsRepository instance;

        private List<Room> _rooms ;

        public List<Room> _Rooms
        {
            get { return _rooms; }
            set { _rooms = value; }
        }

        public RoomsRepository() 
        {
          _Rooms = new List<Room>();
        }
        public static RoomsRepository Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new RoomsRepository();
                }
                return instance;
            }
        }

        public void AddUserInRoom(UserConnection userConnection)
        {
            var roomFromVM = GetRoomByName(userConnection.Room);
            if (roomFromVM is object)
            {
                _Rooms.Remove(roomFromVM);
                roomFromVM.UsersInRoom.Add(userConnection.User);
                _Rooms.Add(roomFromVM);
            }
            else
            {
                _Rooms.Add(new Room(userConnection));
            }

        }

        public Room GetRoomByName(string roomName)
        {
            return _Rooms.Find(r=> r.Name == roomName);
        }

        public void AddInformationAboutTheVideo(string roomName, string youTubeLink)
        {
            var roomFromVM = GetRoomByName(roomName);
            _Rooms.Remove(roomFromVM);
            roomFromVM.Video.URL = youTubeLink;
            _Rooms.Add(roomFromVM);
        }

        public void RemoveUserFromRoom(UserConnection userConnection)
        {
            var roomFromVM = GetRoomByName(userConnection.Room);
            if (roomFromVM is object)
            {
                _Rooms.Remove(roomFromVM);
                roomFromVM.UsersInRoom.Remove(userConnection.User);
                if (roomFromVM.UsersInRoom.Count != 0)
                    _Rooms.Add(roomFromVM);
            }
        }

        public async Task<string?> GetLinkByRoom(string roomName)
        {
            var roomFromVM = GetRoomByName(roomName);
            if (roomFromVM is object)
            {
                return roomFromVM.Video.URL;
            }
            return null;
        }


    }
}
