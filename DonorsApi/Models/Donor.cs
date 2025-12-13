using System.ComponentModel.DataAnnotations;

namespace DonorsApi.Models
{
    public class Donor
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "El nombre es obligatorio.")]
        [StringLength(100, ErrorMessage = "El nombre no puede tener más de 100 caracteres.")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "La edad es obligatoria.")]
        [Range(0, 120, ErrorMessage = "La edad debe estar entre 0 y 120.")]
        public int Age { get; set; }

        [Required(ErrorMessage = "El tipo de sangre es obligatorio.")]
        [RegularExpression("^(O|A|B|AB)[+-]$", ErrorMessage = "El tipo de sangre debe ser válido, por ejemplo: O+, A-, AB+, etc.")]
        public string BloodType { get; set; } = string.Empty;
    }
}
