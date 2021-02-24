using System.Collections.Generic;
using Quizzer.Domain.Entities;

namespace Quizzer.Domain.Events
{
    /// <summary>
    /// Event fired when the timeout of the question has been reached
    /// </summary>
    public class QuestionEndedEvent
    {
        public ulong GameId { get; init; }

        /// <summary>
        /// The list of correct answer
        /// </summary>
        public IList<Answer> Answers { get; init; }
    }
}
