using DonorsApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication;

var builder = WebApplication.CreateBuilder(args);

// --- PostgreSQL ---
builder.Services.AddDbContext<DonorContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// --- Controladores ---
builder.Services.AddControllers();

// --- CORS: permitir cualquier origen (para desarrollo) ---
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// --- Autenticación con token simple ---
builder.Services.AddAuthentication("ApiToken")
    .AddScheme<AuthenticationSchemeOptions, TokenAuthHandler>("ApiToken", null);

// --- Autorización ---
builder.Services.AddAuthorization();

var app = builder.Build();

// --- Usar CORS ANTES de Auth ---
app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
