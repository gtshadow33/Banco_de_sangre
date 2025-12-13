using Microsoft.EntityFrameworkCore;
using DonorsApi.Models;

namespace DonorsApi.Data
{
    public class DonorContext : DbContext
    {
        public DonorContext(DbContextOptions<DonorContext> options) : base(options) { }

        public DbSet<Donor> Donors { get; set; } = null!;
    }
}
