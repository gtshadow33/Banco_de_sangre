using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DonorsApi.Data;
using DonorsApi.Models;
using Microsoft.AspNetCore.Authorization;

namespace DonorsApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class DonorsController : ControllerBase
    {
        private readonly DonorContext _context;

        public DonorsController(DonorContext context)
        {
            _context = context;
        }

        // GET /api/donors?bloodType=O+
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Donor>>> GetAll([FromQuery] string? bloodType)
        {
            if (string.IsNullOrEmpty(bloodType))
                return await _context.Donors.ToListAsync();

            // Obtener tipos compatibles
            var compatibles = GetCompatibleBloodTypes(bloodType);

            return await _context.Donors
                .Where(d => compatibles.Contains(d.BloodType))
                .ToListAsync();
        }

        // GET /api/donors/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Donor>> GetById(int id)
        {
            var donor = await _context.Donors.FindAsync(id);
            if (donor == null) return NotFound();
            return donor;
        }

        // POST /api/donors
        [HttpPost]
        public async Task<ActionResult<Donor>> Create(Donor donor)
        {
            _context.Donors.Add(donor);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = donor.Id }, donor);
        }

        // --- Lógica de compatibilidad ---
        private string[] GetCompatibleBloodTypes(string recipient)
        {
            return recipient switch
            {
                "O-" => new[] { "O-" },
                "O+" => new[] { "O-", "O+" },
                "A-" => new[] { "O-", "A-" },
                "A+" => new[] { "O-", "O+", "A-", "A+" },
                "B-" => new[] { "O-", "B-" },
                "B+" => new[] { "O-", "O+", "B-", "B+" },
                "AB-" => new[] { "O-", "A-", "B-", "AB-" },
                "AB+" => new[] { "O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+" },
                _ => Array.Empty<string>()
            };
        }
    }
}
