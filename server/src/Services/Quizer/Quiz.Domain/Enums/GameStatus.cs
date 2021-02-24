namespace Quizzer.Domain.Enums
{
    public enum GameStatus
    {
        /// <summary>
        /// Indicates that the game hasn't started yet
        /// </summary>
        Idle = 0,

        /// <summary>
        /// Indicates that the game is currently running
        /// </summary>
        Running = 1,

        /// <summary>
        /// Indicate that the game has been stopped
        /// This is not integrated yet
        /// </summary>
        Stopped = 2,

        /// <summary>
        /// Indicate that the game has ended
        /// </summary>
        Ended = 3
    }
}
