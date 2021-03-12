using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Quiz.API;
using Web.API.Controllers;
using Web.API.Services;
using Xunit;

namespace Web.API.Tests
{
    public class TestControllerTests
    {
        [Fact]
        public async Task CreateQuiz_Returns_BadRequest()
        {
            // Arrange
            var quizzer = new Mock<IQuizService>();

            quizzer.Setup(svc => svc.CreateNewQuiz(new QuizCreateRequest()
            {
                Title = "test"
            }));

            var controller = new TestController(quizzer.Object);

            // Act

            var result = await controller.Test();

            // Assert

            Assert.IsType<BadRequestResult>(result);
        }
    }
}
