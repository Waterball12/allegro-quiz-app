using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace Identity.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {

        [HttpGet]
        public IActionResult Login(string returnUrl = "/")
        {
            return Challenge(new AuthenticationProperties()
            {
                RedirectUri = Url.Action(nameof(XD))
            });
        }


        [HttpGet("XD")]
        public IActionResult XD()
        {
            Console.WriteLine("OK");

            return Ok();
        }
    }
}
