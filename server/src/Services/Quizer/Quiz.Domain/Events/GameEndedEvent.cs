using Quizzer.Domain.Entities;

namespace Quizzer.Domain.Events
{
    /// <summary>
    /// Event fired once the game ended
    /// </summary>
    public class GameEndedEvent
    {
        public QuizGame Game { get; init; }
    }
}
