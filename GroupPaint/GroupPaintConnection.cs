using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace GroupPaint
{
    public class GroupPaintConnection : PersistentConnection
    {
        public static HashSet<string> ConnectedUsers = new HashSet<string>();
        public static string[,] Map = new string[50,50];
        
        protected override Task OnConnected(IRequest request, string connectionId)
        {
            ConnectedUsers.Add(connectionId);

            var message = new 
            {
                type = "mapUpdate",
                mapData = Map
            };

            string data = JsonConvert.SerializeObject(message);
            this.Connection.Send(connectionId, data);

            return base.OnConnected(request, connectionId);
        }

        protected override Task OnReceived(IRequest request, string connectionId, string data)
        {
            dynamic message = JsonConvert.DeserializeObject(data);
            Map[message.row, message.col] = message.colorValue;
            this.Connection.Broadcast(data);

            return base.OnReceived(request, connectionId, data);
        }

        protected override Task OnDisconnected(IRequest request, string connectionId, bool stopCalled)
        {
            ConnectedUsers.Remove(connectionId);

            if (ConnectedUsers.Count == 0)
            {
                Map = new string[10, 10];
            }

            return base.OnDisconnected(request, connectionId, stopCalled);
        }
    }
}