using System.Collections.Generic;
using Quizzer.Domain.Enums;

namespace Quizzer.Domain.Events
{
    /// <summary>
    /// Event fired once the game owner press start
    /// </summary>
    public record GameStartedEvent
    {
        /// <summary>
        /// The game id or room id
        /// </summary>
        public ulong GameId { get; init; }

        /// <summary>
        /// The participants users
        /// </summary>
        public IList<string> Users { get; init; }

        /// <summary>
        /// Status of the game, should be running
        /// </summary>
        public GameStatus Status { get; init; }

        /// <summary>
        /// Starting question
        /// </summary>
        public int CurrentQuestion { get; init; }
    }
}
