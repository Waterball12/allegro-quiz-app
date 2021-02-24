using MassTransit;
using Microsoft.AspNetCore.SignalR;
using Quizzer.Domain.Events;
using System.Threading.Tasks;
using Web.Socket.Hubs;

namespace Web.Socket.Consumers
{
    public class QuestionStartedConsumer : IConsumer<QuestionStartedEvent>
    {
        private readonly IHubContext<QuizzerGateway> _gateway;

        public QuestionStartedConsumer(IHubContext<QuizzerGateway> gateway)
        {
            _gateway = gateway;
        }

        public async Task Consume(ConsumeContext<QuestionStartedEvent> context)
        {
            await _gateway.Clients
                .Groups(context.Message.GameId.ToString()) // Gets all users in the room
                .SendAsync("QuestionReceived", context.Message); // Notify all user in the group that a new question started
        }
    }
}
