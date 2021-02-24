using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Web.Socket.Services;

namespace Web.Socket.Hubs
{
    public class QuizzerGateway : Hub
    {
        private readonly QuizService _service;

        public QuizzerGateway(QuizService service)
        {
            _service = service;
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();

            var queryRoomId = httpContext.Request.Query["roomId"];

            if (!ulong.TryParse(queryRoomId, out ulong roomId))
                throw new ArgumentException("Room Id should be ulong type");

            var game = await _service.QuizExist(roomId); // TODO maybe changing it to simple Get request

            if (game == null)
            {
                await Clients.Caller.SendAsync("Error", "Room does not exist");
                Context.Abort();
                return;
            }

            // Temporary way to understand if its the owner
            if (game.Users.Count <= 0)
                game.IsOwner = true;

            // Reply with connected
            await Clients.Caller.SendAsync("Connected", game);
            await Clients.Caller.SendAsync("Ready", Context.ConnectionId);
            
            // Add user to the group
            await Groups.AddToGroupAsync(Context.ConnectionId, roomId.ToString());
            // Add user to the game
            await _service.JoinGame(roomId, Context.ConnectionId);

            await base.OnConnectedAsync();
        }

        [HubMethodName("StartGame")]
        public async Task StartGame(ulong id)
        {
            await _service.StartQuiz(id);
        }

        [HubMethodName("NextQuestion")]
        public async Task NextQuestion(ulong id)
        {
            await _service.NextQuestion(id);
        }
        
        [HubMethodName("SubmitAnswer")]
        public async Task SubmitAnswer(ulong id, string answer)
        {
            await _service.SubmitAnswer(id, Context.ConnectionId, answer);
        }
    }
}
