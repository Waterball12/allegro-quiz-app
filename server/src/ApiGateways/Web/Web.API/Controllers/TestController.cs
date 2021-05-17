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
                            Title = "How many notes are there?",
                            Answers =
                            {
                                new AnswerData() {Description = "5", IsCorrect = false},
                                new AnswerData() {Description = "2", IsCorrect = false},
                                new AnswerData() {Description = "7", IsCorrect = true},
                                new AnswerData() {Description = "1", IsCorrect = false},
                            }
                        },
                        new QuestionData()
                        {
                            Title = "How many Staff lines are there?",
                            Answers =
                            {
                                new AnswerData() {Description = "5", IsCorrect = true},
                                new AnswerData() {Description = "3", IsCorrect = false},
                                new AnswerData() {Description = "6", IsCorrect = false},
                                new AnswerData() {Description = "2", IsCorrect = false},
                            }
                        },
                        new QuestionData()
                        {
                            Title = "What Time Signature is considered Simple Time?",
                            Answers =
                            {
                                new AnswerData() {Description = "6/8", IsCorrect = false},
                                new AnswerData() {Description = "2/4", IsCorrect = true},
                                new AnswerData() {Description = "9/8", IsCorrect = false},
                                new AnswerData() {Description = "3/8", IsCorrect = false},
                            }
                        },
                        new QuestionData()
                        {
                            Title = "What does a quaver note worth also referred to as?",
                            Answers =
                            {
                                new AnswerData() {Description = "Eight Note", IsCorrect = true},
                                new AnswerData() {Description = "Sixteenth Note", IsCorrect = false},
                                new AnswerData() {Description = "Thirty second Note", IsCorrect = false},
                                new AnswerData() {Description = "Quarter Note", IsCorrect = false},
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
