using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Quizzer.Domain.Events
{
    /// <summary>
    /// Event fired when a user joins a game
    /// </summary>
    public record UserJoinedGameEvent
    {
        public string UserId { get; set; }
        public ulong GameId { get; set; }
    }
}
