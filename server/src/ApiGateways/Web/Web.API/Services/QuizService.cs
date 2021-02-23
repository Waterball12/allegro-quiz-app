using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Quiz.API;

namespace Web.API.Services
{
    public class QuizService
    {
        private readonly IConfiguration _config;

        public QuizService(HttpClient http, IConfiguration config)
        {
            _config = config;
        }

        public Task<QuizCreatedResponse> CreateNewQuiz(QuizCreateRequest request)
        {
            return GrpcCallerService.CallService(_config.GetValue<string>("QuizGrpcApi"), async channel =>
            {
                var client = new Quizer.QuizerClient(channel);

                return await client.CreateGameAsync(request);
            });
        }

    }
}
