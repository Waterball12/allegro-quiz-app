using System.Collections.Generic;

namespace Web.API.Dto
{
    public record CreateQuizDto
    {
        public string Title { get; init; }

        public string Description { get; init; }

        public IList<QuestionDto> Questions { get; init; }
    }
}
