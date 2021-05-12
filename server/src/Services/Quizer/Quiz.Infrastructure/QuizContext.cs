using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Quizzer.Domain.Entities;

namespace Quizzer.Infrastructure
{
    public class QuizContext : DbContext
    {
        public DbSet<Quiz> Quiz { get; set; }

        public QuizContext(DbContextOptions<QuizContext> options) : base(options)
        {
        }

    }
}
