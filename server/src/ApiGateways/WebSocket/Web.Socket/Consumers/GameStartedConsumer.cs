using MassTransit;
using Microsoft.AspNetCore.SignalR;
using Quizzer.Domain.Events;
using System.Threading.Tasks;
using Web.Socket.Hubs;

namespace Web.Socket.Consumers
{
    public class GameStartedConsumer : IConsumer<GameStartedEvent>
    {
        private readonly IHubContext<QuizzerGateway> _gateway;

        public GameStartedConsumer(IHubContext<QuizzerGateway> gateway)
        {
            _gateway = gateway;
        }

        public async Task Consume(ConsumeContext<GameStartedEvent> context)
        {
            await _gateway.Clients
                .Groups(context.Message.GameId.ToString()) // Gets all users in the room
                .SendAsync("GameStarted", context.Message); // Send a game start message
        }
    }
}
