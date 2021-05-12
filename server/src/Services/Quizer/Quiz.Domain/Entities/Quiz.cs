using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Quizzer.Domain.Entities
{
    /// <summary>
    /// Immutable quiz entity that contains necessary information to start a game
    /// This in future will be saved in a database
    /// </summary>
    public record Quiz
    {
        /// <summary>
        /// The id of the quiz
        /// </summary>
        [Key]
        public ulong Id { get; init; }

        /// <summary>
        /// Title of the quiz
        /// </summary>
        public string Title { get; init; }

        /// <summary>
        /// Description of the quiz
        /// </summary>
        public string Description { get; init; }

        /// <summary>
        /// Image Url in future can be used as a banner
        /// </summary>
        public string ImageUrl { get; init; }

        /// <summary>
        /// List of available questions in the quiz
        /// </summary>
        public IList<Question> Questions { get; init; }
    }
}
