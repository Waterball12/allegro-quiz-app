using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.API.Dto
{
    public class QuizDto
    {
        public string Title { get; init; }
        public string Description { get; init; }
        public string ImageUrl { get; init; }
        public IList<QuestionDto> Questions { get; init; }
    }
}
