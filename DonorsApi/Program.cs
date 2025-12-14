using DonorsApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication;

var builder = WebApplication.CreateBuilder(args);

// --- PostgreSQL ---
builder.Services.AddDbContext<DonorContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// --- Controladores ---
builder.Services.AddControllers();

// --- Swagger (simple) ---
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// --- CORS ---
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// --- Autenticación con token ---
builder.Services.AddAuthentication("ApiToken")
    .AddScheme<AuthenticationSchemeOptions, TokenAuthHandler>("ApiToken", null);

// --- Autorización ---
builder.Services.AddAuthorization();

var app = builder.Build();

// --- Swagger ---
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// --- Middleware ---
app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
