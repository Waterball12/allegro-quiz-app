using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Quiz.API;
using Web.API.Dto;

namespace Web.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class QuizController
    {
        
        private readonly Quizer.QuizerClient _quizzer;

        public QuizController(Quizer.QuizerClient quizzer)
        {
            _quizzer = quizzer;
        }

        [HttpPost]
        public async Task CreateQuizAsync([FromBody] CreateQuizDto quiz)
        {
            
        }

    }
}
