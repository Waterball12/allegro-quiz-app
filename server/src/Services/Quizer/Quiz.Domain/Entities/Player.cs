namespace Quizzer.Domain.Entities
{
    public record Player
    {
        public string Id { get; set; }

        public int Score { get; set; }
    }
}
