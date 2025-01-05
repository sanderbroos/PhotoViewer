using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PhotoViewer.Data;
using PhotoViewer.Models;
using System.Diagnostics;

namespace PhotoViewer.Controllers
{
	public class HomeController : Controller
	{
        private readonly ApplicationDbContext _context;
		private readonly ILogger<HomeController> _logger;

		public HomeController(ApplicationDbContext context, ILogger<HomeController> logger)
		{
            _context = context;
			_logger = logger;
		}

		public IActionResult Index()
		{
			return View(new PhotosModel() { Photos = _context.Photos.ToList() });
		}

		public IActionResult Privacy()
		{
			return View();
		}

		[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
		public IActionResult Error()
		{
			return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
		}
	}
}
