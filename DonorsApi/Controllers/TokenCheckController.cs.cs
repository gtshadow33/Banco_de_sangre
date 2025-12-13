using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DonorsApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TokenCheckController : ControllerBase
    {
        // GET /api/tokencheck
        [HttpGet]
        [Authorize] // Esta línea hace que solo los requests con token válido lleguen
        public IActionResult CheckToken()
        {
            // Si llegamos aquí, el token es válido
            return Ok(new { message = "Token válido" });
        }
    }
}
