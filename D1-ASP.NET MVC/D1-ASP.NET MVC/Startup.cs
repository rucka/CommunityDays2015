using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(D1_ASP.NET_MVC.Startup))]
namespace D1_ASP.NET_MVC
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
