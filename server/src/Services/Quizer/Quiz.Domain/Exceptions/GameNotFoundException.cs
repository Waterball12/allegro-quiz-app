using System;

namespace Quizzer.Domain.Exceptions
{
    /// <summary>
    /// Exception thrown when the game was not found
    /// </summary>
    public class GameNotFoundException : Exception
    {
        public GameNotFoundException(ulong id) : base($"Game {id} not found")
        {
        }

        public GameNotFoundException() : base()
        {
        }
    }
}
