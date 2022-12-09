using server.Model;
using System.Runtime.InteropServices;

namespace server.DTO
{
    public class MatchDTO
    {
        public int Key { get; set; }
        public List<Student>? Matches { get; set; }
    }
}
