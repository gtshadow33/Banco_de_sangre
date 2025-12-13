using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;

public class TokenAuthHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
    public TokenAuthHandler(
        IOptionsMonitor<AuthenticationSchemeOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder)
        : base(options, logger, encoder)
    {
        // No tocar Options aquí para evitar null
    }

    protected override Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        // Asegurarse de que TimeProvider esté configurado
        Options.TimeProvider ??= TimeProvider.System;

        if (!Request.Headers.ContainsKey("Authorization"))
            return Task.FromResult(AuthenticateResult.Fail("Missing Authorization Header"));

        var header = Request.Headers["Authorization"].ToString();

        if (!header.StartsWith("Bearer "))
            return Task.FromResult(AuthenticateResult.Fail("Invalid Scheme"));

        var token = header.Substring("Bearer ".Length).Trim();

        // Obtener token válido desde appsettings.json
        var validToken = Context.RequestServices
            .GetRequiredService<IConfiguration>()["ApiToken"];

        if (string.IsNullOrEmpty(validToken) || token != validToken)
            return Task.FromResult(AuthenticateResult.Fail("Invalid Token"));

        var identity = new ClaimsIdentity(new[]
        {
            new Claim(ClaimTypes.Name, "AuthorizedUser")
        }, Scheme.Name);

        var principal = new ClaimsPrincipal(identity);
        var ticket = new AuthenticationTicket(principal, Scheme.Name);

        return Task.FromResult(AuthenticateResult.Success(ticket));
    }
}
