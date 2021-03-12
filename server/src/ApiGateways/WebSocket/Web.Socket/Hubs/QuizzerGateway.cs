using Grpc.Core;
using Microsoft.AspNetCore.SignalR;
using Quiz.API;
using System;
using System.Threading.Tasks;

namespace Web.Socket.Hubs
{
    public class QuizzerGateway : Hub
    {
        private readonly Quizer.QuizerClient _quizzer;

        public QuizzerGateway(Quizer.QuizerClient quizzer)
        {
            _quizzer = quizzer;
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();

            var queryRoomId = httpContext.Request.Query["roomId"];

            if (!ulong.TryParse(queryRoomId, out ulong roomId))
                throw new ArgumentException("Room Id should be ulong type");

            var game = await _quizzer.GetQuizAsync(new GetQuizRequest()
            {
                Id = roomId
            });

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
            await _quizzer.JoinGameAsync(new JoinGameRequest()
            {
                Id = roomId,
                User = Context.ConnectionId
            });

            await base.OnConnectedAsync();
        }

        [HubMethodName("StartGame")]
        public async Task StartGame(ulong id)
        {
            await _quizzer.StartGameAsync(new QuizStartRequest()
            {
                Id = id
            });
        }

        [HubMethodName("NextQuestion")]
        public async Task NextQuestion(ulong id)
        {
            await _quizzer.NextQuestionAsync(new NextQuestionRequest()
            {
                Id = id
            });
        }

        [HubMethodName("SubmitAnswer")]
        public async Task SubmitAnswer(ulong id, string answer)
        {
            await _quizzer.SubmitAnswerAsync(new SubmitAnswerRequest()
            {
                Answer = answer,
                Id = id,
                UserId = Context.ConnectionId
            });
        }
    }
}
