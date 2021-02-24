using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Threading.Tasks;
using MassTransit;
using Quizzer.Domain.Entities;
using Quizzer.Domain.Enums;
using Quizzer.Domain.Events;
using Quizzer.Domain.Exceptions;

namespace Quizzer.Infrastructure
{
    public class QuizManager
    {
        private readonly IBusControl _bus;

        public QuizManager(IBusControl bus)
        {
            _bus = bus;
        }

        private readonly ConcurrentDictionary<ulong, QuizGame> _runningGame = new ();

        //public bool Add(string game) => _runningGame.Add(userId);
        //public bool Remove(ulong userId) => _runningGame.TryRemove(userId);
        public void Clear() => _runningGame.Clear();

        /// <summary>
        /// Tries to get the quiz based on the given id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="GameNotFoundException">Thrown when the game is not found</exception>
        public QuizGame TryGetQuiz(ulong id) // TODO find a better name since Try indicate it should not throw an exception
        {
            if (!_runningGame.TryGetValue(id, out QuizGame game))
            {
                throw new GameNotFoundException(id);
            }

            return game;
        }

        /// <summary>
        /// Join a user in the game
        /// </summary>
        /// <param name="id"></param>
        /// <param name="user"></param>
        public async Task JoinGame(ulong id, string user)
        {
            var game = TryGetQuiz(id);

            game.Users.Add(new Player()
            {
                Id = user,
                Score = 0
            });

            await _bus.Publish(new UserJoinedGameEvent()
            {
                UserId = user,
                GameId = id
            });
        }

        /// <summary>
        /// Create new game
        /// </summary>
        /// <param name="game"></param>
        /// <returns></returns>
        public QuizGame CreateNew(QuizGame game)
        {
            _runningGame.TryAdd(game.Id, game);

            return game;
        }

        /// <summary>
        /// End a running game
        /// </summary>
        /// <exception cref="GameNotFoundException"></exception>
        /// <param name="id"></param>
        /// <returns></returns>
        public QuizGame EndGame(ulong id)
        {
            return TryGetQuiz(id);

            // TODO end the game
        }

        /// <summary>
        /// Starts a quiz game based on the given id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="Exception">Thrown when the game is in a state different than IDLE</exception>
        public async Task Start(ulong id)
        {
            var game = TryGetQuiz(id);

            if (game.Status != GameStatus.Idle)
                throw new Exception("Expected game to be idle but was in a different state"); // TODO add a custom exception

            game.Status = GameStatus.Running;

            var gameStartedEvent = new GameStartedEvent()
            {
                GameId = id,
                Users = game.Users.Select(x => x.Id).ToList(),
                Status = game.Status,
                CurrentQuestion = game.CurrentQuestion
            };

            await _bus.Publish(gameStartedEvent);

            // TODO find a better solution
            await Task.Delay(500);

            await StartQuestion(id, game.CurrentQuestion);
        }

        /// <summary>
        /// Start the given question in the specified game id
        /// </summary>
        /// <param name="gameId"></param>
        /// <param name="index"></param>
        /// <returns></returns>
        public async Task<Question> StartQuestion(ulong gameId, int index)
        {
            var game = TryGetQuiz(gameId);

            if (game.Quiz.Questions.Count <= index)
            {
                // End the game and remove it from running games
                game.Status = GameStatus.Ended;
                await _bus.Publish(new GameEndedEvent() {Game = game});
                _runningGame.TryRemove(game.Id, out _);
                return null;
            }

            // TODO what if its out of index?
            var question = game.Quiz.Questions[index];

            if (question == null) return null; 

            // TODO check if this is really necessary
            game.CurrentQuestion = game.CurrentQuestion += 1;

            var questionStartedEvent = new QuestionStartedEvent()
            {
                Question = question.Title,
                Answers = question.Answer.Select(x => x.Description).ToList(),
                GameId = gameId,
                CurrentQuestion = game.CurrentQuestion,
                EndAt = DateTimeOffset.UtcNow.AddSeconds(16) // TODO use the question timeout instead
            };

            await _bus.Publish(questionStartedEvent);

            // TODO add a scheduler
            _ = Task.Run(async () =>
            {
                // TODO respect timeout from the question entity
                await Task.Delay(TimeSpan.FromSeconds(15));

                await _bus.Publish(new QuestionEndedEvent()
                {
                    Answers = question.Answer,
                    GameId = gameId
                });
            });

            return question;
        }
    }
}
