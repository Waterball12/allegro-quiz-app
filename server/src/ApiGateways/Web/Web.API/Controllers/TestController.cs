using Microsoft.AspNetCore.Mvc;
using Quiz.API;
using System.Threading.Tasks;

namespace Web.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController
    {
        private readonly Quizer.QuizerClient _quizzer;

        public TestController(Quizer.QuizerClient quizzer)
        {
            _quizzer = quizzer;
        }

        [HttpGet]
        public async Task<IActionResult> Test()
        {
            var quiz = await _quizzer.CreateGameAsync(new QuizCreateRequest()
            {
                Title = "test",
                Quiz = new QuizData()
                {
                    Description = "test",
                    ImageUrl = "test",
                    Title = "test",
                    Questions =
                    {
                        new QuestionData()
                        {
                            Title = "What is the name of The Satbir’ first album",
                            Answers =
                            {
                                new AnswerData() {Description = "Minun", IsCorrect = true},
                                new AnswerData() {Description = "Ampharos", IsCorrect = true},
                                new AnswerData() {Description = "Pupitar", IsCorrect = true},
                                new AnswerData() {Description = "Deoxys", IsCorrect = true},
                            }
                        },
                        new QuestionData()
                        {
                            Title = "What is the name of The Jasraj’ first album",
                            Answers =
                            {
                                new AnswerData() {Description = "Arcanine", IsCorrect = false},
                                new AnswerData() {Description = "Tynamo", IsCorrect = false},
                                new AnswerData() {Description = "Tapu Koko", IsCorrect = true},
                                new AnswerData() {Description = "Mudkip", IsCorrect = false},
                            }
                        },
                        new QuestionData()
                        {
                            Title = "Who was the best rock band?",
                            Answers =
                            {
                                new AnswerData() {Description = "Satbir", IsCorrect = false},
                                new AnswerData() {Description = "Jasraj", IsCorrect = false},
                                new AnswerData() {Description = "Tom and Jerry", IsCorrect = false},
                                new AnswerData() {Description = "Linkin Park", IsCorrect = true},
                            }
                        }
                    }
                }
            });

            if (quiz == null)
                return new BadRequestResult();

            return new JsonResult(quiz);
        }
    }
}
