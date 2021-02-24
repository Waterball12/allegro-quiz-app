using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using Quiz.API;
using Quizzer.Domain.Entities;
using Quizzer.Domain.Exceptions;
using Quizzer.Infrastructure;

namespace Quizzer.API.Services
{
    public class QuizerService : Quiz.API.Quizer.QuizerBase
    {
        private readonly QuizManager _manager;

        public QuizerService(QuizManager manager)
        {
            _manager = manager;
        }

        public override async Task<Empty> JoinGame(JoinGameRequest request, ServerCallContext context)
        {
            await _manager.JoinGame(request.Id, request.User).ConfigureAwait(false);

            return new Empty();
        }

        public override Task<QuizCreatedResponse> GetQuiz(GetQuizRequest request, ServerCallContext context)
        {
            try
            {
                var game = _manager.TryGetQuiz(request.Id);

                return Task.FromResult(new QuizCreatedResponse()
                {
                    Id = game.Id,
                    Quiz = new QuizData()
                    {
                        Title = game.Quiz.Title,
                        Description = game.Quiz.Description,
                        ImageUrl = game.Quiz.ImageUrl,
                        Questions = { } // TODO finish mapping this model
                    },
                    Users = { game.Users.Select(x => x.Id)}
                });
            }
            catch (GameNotFoundException)
            {
                context.Status = new Status(StatusCode.NotFound, "Quiz does not exist");

                return Task.FromResult(new QuizCreatedResponse());
            }
        }

        public override Task<Empty> SubmitAnswer(SubmitAnswerRequest request, ServerCallContext context)
        {
            try
            {
                var game = _manager.TryGetQuiz(request.Id);

                var questions = game.Quiz.Questions[game.CurrentQuestion - 1];

                var answer = questions?.Answer.FirstOrDefault(x => x.Description == request.Answer);

                if (answer != null && answer.IsCorrect)
                {
                    var player = game.Users.FirstOrDefault(x => x.Id == request.UserId);

                    if (player != null) player.Score += new Random().Next(5, 20); // XD
                }

                return Task.FromResult(new Empty());
            }
            catch (GameNotFoundException)
            {
                context.Status = new Status(StatusCode.NotFound, "Quiz does not exist");

                return Task.FromResult(new Empty());
            }
        }

        public override Task<QuizCreatedResponse> CreateGame(QuizCreateRequest request, ServerCallContext context)
        {
            var quiz = new Domain.Entities.Quiz()
            {
                Title = request.Quiz.Title,
                Description = request.Quiz.Description,
                ImageUrl = request.Quiz.ImageUrl,
                Questions = request.Quiz.Questions.Select(x => new Question()
                {
                    Timeout = x.Timeout,
                    Title = x.Title,
                    Answer = x.Answers.Select(answer => new Answer()
                    {
                        Description = answer.Description,
                        IsCorrect = answer.IsCorrect
                    }).ToList(),
                }).ToList()
            };

            var random = new Random();

            ulong id = (ulong)random.Next(21000000, 25000000);

            var game = new QuizGame()
            {
                Quiz = quiz,
                Id = id,
                Started = DateTime.UtcNow,
                Users = new List<Player>()
            };

            var result = _manager.CreateNew(game);

            var response = new QuizCreatedResponse()
            {
                Quiz = request.Quiz,
                Id = result.Id
            };

            return Task.FromResult(response);
        }

        public override async Task<Empty> NextQuestion(NextQuestionRequest request, ServerCallContext context)
        {
            var game = _manager.TryGetQuiz(request.Id);

            await _manager.StartQuestion(game.Id, game.CurrentQuestion);

            return new Empty();
        }

        public override async Task<Empty> StartGame(QuizStartRequest request, ServerCallContext context)
        {
            await _manager.Start(request.Id);

            return new Empty();
        }
    }
}
