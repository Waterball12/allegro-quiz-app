using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.API.Dto
{
    public class QuizGameDto
    {
        public ulong Id { get; init; }
        public QuizDto Quiz { get; init; }
        public DateTime? Started { get; init; }
    }
}
