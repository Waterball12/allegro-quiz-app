using Game.Api.Tests.Acceptance.Models;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Assist;

namespace Game.Api.Tests.Acceptance.StepDefinitions
{
    [Binding]
    public class GameManagementSteps
    {
        [When(@"I create game with the following details")]
        public void WhenICreateGameWithTheFollowingDetails(Table table)
        {
            var createProductRequest = table.CreateSet<CreateGameRequest>();
            
            ScenarioContext.StepIsPending();
        }

        [Then(@"the games are created successfully")]
        public void ThenTheGamesAreCreatedSuccessfully()
        {
            ScenarioContext.StepIsPending();
        }

        [Given(@"the following game in the system")]
        public void GivenTheFollowingGameInTheSystem()
        {
            ScenarioContext.StepIsPending();
        }

        [When(@"those games get deleted")]
        public void WhenThoseGamesGetDeleted()
        {
            ScenarioContext.StepIsPending();
        }

        [Then(@"the games are deleted successfully")]
        public void ThenTheGamesAreDeletedSuccessfully()
        {
            ScenarioContext.StepIsPending();
        }
    }
}