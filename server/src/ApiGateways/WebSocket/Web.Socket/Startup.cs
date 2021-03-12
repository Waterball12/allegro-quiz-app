using MassTransit;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Quiz.API;
using System;
using System.Reflection;
using Web.Socket.Hubs;

namespace Web.Socket
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddSignalR(hub =>
            {
                hub.KeepAliveInterval = TimeSpan.FromHours(1);
                hub.EnableDetailedErrors = true;
            });

            services.AddMassTransit(x =>
            {
                x.AddConsumers(Assembly.GetEntryAssembly());

                x.UsingRabbitMq((context, cfg) =>
                {
                    cfg.Host(Configuration.GetValue<string>("RabbitMQConnection", "rabbitmq://localhost"));

                    cfg.ConfigureEndpoints(context);
                });
            });

            services.AddGrpcClient<Quizer.QuizerClient>(channel =>
            {
                channel.Address = new Uri(Configuration.GetValue<string>("QuizGrpcApi"));
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider provider)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

            }

            var massTransit = provider.GetRequiredService<IBusControl>();

            massTransit.StartAsync();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<QuizzerGateway>("/gateway");
            });
        }
    }
}
