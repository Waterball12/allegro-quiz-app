using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Quizzer.Domain.Entities
{
    /// <summary>
    /// Entity for the quiz question
    /// </summary>
    public record Question
    {
        /// <summary>
        /// The id of the question
        /// </summary>
        [Key]
        public ulong Id { get;set; }

        /// <summary>
        /// The question title or the question itself
        /// </summary>
        public string Title { get; init; }

        /// <summary>
        /// The time given to the user to answer the question, this not handled by the server and client
        /// TODO decide which measurement unit use and integrate with the frontend
        /// </summary>
        public int Timeout { get; init; }

        /// <summary>
        /// List of possible answer, MIN 0 and MAX 4
        /// </summary>
        [Range(0, 4)]
        public IList<Answer> Answer { get; init; }
    }
}
