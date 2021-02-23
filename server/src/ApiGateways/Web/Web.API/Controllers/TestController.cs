using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Quiz.API;
using Web.API.Services;

namespace Web.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController
    {
        private readonly QuizService _service;

        public TestController(QuizService service)
        {
            _service = service;
        }

        [HttpGet()]
        public async Task<IActionResult> Test()
        {
            var quiz = await _service.CreateNewQuiz(new QuizCreateRequest()
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
                throw new ArgumentNullException(nameof(quiz));

            return new JsonResult(quiz);
        }
    }
}
