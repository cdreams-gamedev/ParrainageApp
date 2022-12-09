using CsvHelper.Configuration;

namespace server.Model
{
    public class MapStudent: ClassMap<Student>
    {
        public MapStudent()
        {
            Map(student => student.Name).Index(1);
            Map(student => student.Email).Index(2);
            Map(student => student.Filiere).Index(3);
            Map(student => student.Axe).Index(4);
            Map(student => student.Domaines).Index(5);
            Map(student => student.Url).Index(6);
        }
    }
}
