using MassTransit;
using Microsoft.AspNetCore.SignalR;
using Quizzer.Domain.Events;
using System.Threading.Tasks;
using Web.Socket.Hubs;

namespace Web.Socket.Consumers
{
    public class UserJoinedGameConsumer : IConsumer<UserJoinedGameEvent>
    {
        private readonly IHubContext<QuizzerGateway> _gateway;

        public UserJoinedGameConsumer(IHubContext<QuizzerGateway> gateway)
        {
            _gateway = gateway;
        }

        public async Task Consume(ConsumeContext<UserJoinedGameEvent> context)
        {
            await _gateway.Clients
                .Groups(context.Message.GameId.ToString()) // Gets all users in the room
                .SendAsync("UserJoinedGame", context.Message); // Notify that a user joined the game
        }
    }
}
