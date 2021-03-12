using Grpc.Core;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Quiz.API;
using System.Threading.Tasks;
using Web.API.Controllers;
using Xunit;

namespace Web.API.Tests
{
    public class TestControllerTests
    {
        [Fact]
        public async Task CreateQuiz_Returns_BadRequest()
        {
            // Arrange
            var quizzer = new Mock<Quizer.QuizerClient>();

            quizzer.Setup(svc => svc.CreateGameAsync(new QuizCreateRequest() { Title = "" }, new CallOptions()));

            var controller = new TestController(quizzer.Object);

            // Act

            var result = await controller.Test();

            // Assert

            Assert.IsType<BadRequestResult>(result);
        }
    }
}
