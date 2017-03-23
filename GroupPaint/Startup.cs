using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(GroupPaint.Startup))]

namespace GroupPaint
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {

            app.MapSignalR<GroupPaintConnection>("/grouppaintsocket");
            app.MapSignalR();
        }
    }
}
