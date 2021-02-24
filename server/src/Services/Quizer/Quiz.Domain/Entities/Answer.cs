namespace Quizzer.Domain.Entities
{
    /// <summary>
    /// Entity for the question answer
    /// </summary>
    public record Answer
    {
        /// <summary>
        /// The id of the answer
        /// </summary>
        public ulong Id { get; init; }

        /// <summary>
        /// The description illustrated to the user
        /// </summary>
        public string Description { get; init; }

        /// <summary>
        /// Whether is correct or not
        /// </summary>
        public bool IsCorrect { get; init; }

        /// <summary>
        /// How many points does the answer give once the user has got it right
        /// </summary>
        public uint Points { get; init; }
    }
}
