using System.IO;
using ContactManager.Infrastructure.DAL.Contexts;
using ContactManager.Infrastructure.DAL.Repository;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace ContactManager
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public IHostingEnvironment HostingEnvironment { get; }

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder().SetBasePath(env.ContentRootPath)
                                                    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                                                    .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                                                    .AddEnvironmentVariables();
            HostingEnvironment = env;

            Configuration = builder.Build();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            if (HostingEnvironment.IsDevelopment())
            {
                services.AddCors(options => options.AddPolicy("AllowDevelopment",
                                 p => p.WithOrigins("http://localhost:3000").AllowAnyMethod()
                                                                            .AllowAnyHeader()));
            }

            services.AddOptions();

            services.AddMvc();

            /* Dependencies Registrations */

            services.AddSingleton(Configuration);

            services.AddTransient(typeof(IGenericRepository<>), typeof(GenericRepository<>));

            services.AddDbContext<ContactManagerDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("ContactManagerDb")));
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));

            loggerFactory.AddDebug();

            if (HostingEnvironment.IsDevelopment())
            {
                app.UseCors("AllowDevelopment");
            }

            var defaultFileName = "index.html";

            var options = new DefaultFilesOptions();

            options.DefaultFileNames.Clear();
            
            options.DefaultFileNames.Add(defaultFileName);

            app.Use(async (context, next) =>
            {
                await next();

                if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value))
                {
                    context.Request.Path = $"/{defaultFileName}";
                }
            });

            app.UseMvc();

            app.UseDefaultFiles(options);

            app.UseStaticFiles();
        }
    }
}
