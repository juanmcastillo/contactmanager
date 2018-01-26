using Microsoft.EntityFrameworkCore;
using ContactManager.Infrastructure.DAL.Entities;

namespace ContactManager.Infrastructure.DAL.Contexts
{
    public class ContactManagerDbContext : DbContext
    {
        public ContactManagerDbContext(DbContextOptions<ContactManagerDbContext> options) : base(options)
        {
        }

        public DbSet<Contact> Contacts { get; set; }
    }
}
