using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MassTransit;
using Microsoft.AspNetCore.SignalR;
using Quizzer.Domain.Events;
using Web.Socket.Hubs;

namespace Web.Socket.Consumers
{
    public class QuestionEndedConsumer : IConsumer<QuestionEndedEvent>
    {
        private readonly IHubContext<QuizzerGateway> _gateway;

        public QuestionEndedConsumer(IHubContext<QuizzerGateway> gateway)
        {
            _gateway = gateway;
        }

        public async Task Consume(ConsumeContext<QuestionEndedEvent> context)
        {
            await _gateway.Clients.All.SendAsync("QuestionEnded", context.Message);
        }
    }
}
