using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using ContactManager.Infrastructure.DAL.Entities;
using ContactManager.Infrastructure.DAL.Repository;

namespace ContactManager.Controllers
{
    [Route("api/[controller]")]
    public class ContactsController : Controller
    {
        private readonly IGenericRepository<Contact> _contactGenericRepository;

        public ContactsController(IGenericRepository<Contact> contactGenericRepository)
        {
            _contactGenericRepository = contactGenericRepository;
        }

        [HttpGet]
        public IEnumerable<Contact> Get()
        {
            return _contactGenericRepository.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<Contact> Get(long id)
        {
            return await _contactGenericRepository.GetById(id);
        }

        [HttpPost]
        public Contact Post([FromBody]Contact contact)
        {
            _contactGenericRepository.Save(contact);

            return contact;
        }

        [HttpPut("{id}")]
        public Contact Put([FromBody]Contact contact)
        {
            _contactGenericRepository.Update(contact.Id, contact);

            return contact;
        }

        [HttpDelete("{id}")]
        public void Delete(long id)
        {
            _contactGenericRepository.Delete(id);
        }
    }
}
