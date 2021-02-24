using System;
using System.Collections.Generic;

namespace Quizzer.Domain.Events
{
    /// <summary>
    /// Event fired when the user click on game start or when he clicks on next question
    /// </summary>
    public record QuestionStartedEvent
    {
        public ulong GameId { get; init; }

        /// <summary>
        /// The given question based on the game CurrentQuestion
        /// </summary>
        public string Question { get; init; }

        /// <summary>
        /// Current question position
        /// </summary>
        public int CurrentQuestion { get; init; }

        public DateTimeOffset EndAt { get; init; }

        /// <summary>
        /// List of possible answer for he given question
        /// </summary>
        public IList<string> Answers { get; init; }
    }
}
