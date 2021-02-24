using System;
using System.Collections.Generic;
using Quizzer.Domain.Enums;

namespace Quizzer.Domain.Entities
{
    /// <summary>
    /// Entity used for the game
    /// </summary>
    public record QuizGame
    {
        /// <summary>
        /// Unique identifier for the game
        /// </summary>
        public ulong Id { get; init; }

        /// <summary>
        /// The Quiz entity, this should probably just use a quiz id
        /// </summary>
        public Quiz Quiz { get; init; }

        /// <summary>
        /// When the game started, null when it hasn't started yet
        /// </summary>
        public DateTime? Started { get; set; }

        /// <summary>
        /// Indicate the current active question
        /// </summary>
        /// <remarks>Cannot be less than 0</remarks>
        public int CurrentQuestion { get; set; }

        /// <summary>
        /// List of users who are participating to the quiz
        /// </summary>
        public IList<Player> Users { get; set; }

        /// <summary>
        /// Indicate the current state of the game
        /// </summary>
        public GameStatus Status { get; set; }

        /// <summary>
        /// Id of the user who started the game
        /// </summary>
        public string OwnerId { get; set; }

        // TODO
        // Store user answer so that score can be calculated at the end
    }
}
