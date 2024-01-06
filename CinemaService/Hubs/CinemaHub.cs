using ChatService.DAL;
using ChatService.Interface;
using ChatService.Model;
using CinemaService.Model;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.IO.Pipelines;
using System.Linq;
using System.Threading.Tasks;

namespace ChatService.Hubs
{
    public class CinemaHub:Hub
    {
        private readonly string _botUser;
        private readonly IDictionary<string, UserConnection> _connections;
        RoomsRepository _roomsRepository = RoomsRepository.Instance;


        public CinemaHub(IDictionary<string, UserConnection> connections)
        {
            _botUser = "MyChat Bot";
            _connections = connections;
            
        }

        public async Task SendMessage(string message)
        {
            if(_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", userConnection.User, message);
            }
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            if(_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                _roomsRepository.RemoveUserFromRoom(userConnection);    
                _connections.Remove(Context.ConnectionId);
                Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser, $"{userConnection.User} has left");

                SendConnectedUser(userConnection.Room);
            }
            return base.OnDisconnectedAsync(exception);
        }

        public async Task JoinRoom(UserConnection userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);

            _connections[Context.ConnectionId] = userConnection;
            _roomsRepository.AddUserInRoom(userConnection);

            await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser, $"{userConnection.User} has joined {userConnection.Room}");
            await SendConnectedUser(userConnection.Room);
            var youTubeLink = await _roomsRepository.GetLinkByRoom(userConnection.Room);
            if (youTubeLink != null)
            {
                await Clients.Client(Context.ConnectionId).SendAsync("ReceiveLink", youTubeLink);
                await Clients.Group(userConnection.Room).SendAsync("ReceivePlayerState", false);
            }
        }
        public async Task SendYouTubeLink(string youTubeLink)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
               _roomsRepository.AddInformationAboutTheVideo(userConnection.Room, youTubeLink);
                await Clients.Group(userConnection.Room).SendAsync("ReceiveLink", youTubeLink);
            }
        }
        public async Task SendPlayerState(VideoState video)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                await Clients.OthersInGroup(userConnection.Room).SendAsync("ReceivePlayerState", video.playerState, video.playedSeconds);
            }
        }

        public Task SendConnectedUser(string room)
        {
            var users = _connections.Values.Where(c=> c.Room == room).Select(c=>c.User);
            return Clients.Group(room).SendAsync("UsersInRoom", users);
        }
    }
}
