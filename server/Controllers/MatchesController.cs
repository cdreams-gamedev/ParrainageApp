using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.AspNetCore.Mvc;
using server.DTO;
using server.Model;
using server.Utilities;
using System.Diagnostics;
using System.Text;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MatchesController : ControllerBase
    {
        [HttpPost]
        public ActionResult<IEnumerable<MatchDTO>> Matches([FromBody] ParamsDTO param)
        {
            //Random Generator
            var random = new Random(2022); // seed = 2022

            //Array of matches
            List<MatchDTO> matches = new();

            var configCSV = new CsvConfiguration(System.Globalization.CultureInfo.InvariantCulture)
            {
                HasHeaderRecord = true,
                Encoding = Encoding.UTF8,
            };

            try
            {
                using var readerFileul = new StreamReader(Path.Combine(Constants.AbsoluteBasePath, @param.FileulFilePath), Encoding.UTF8, true);
                using var readerParrain = new StreamReader(Path.Combine(Constants.AbsoluteBasePath, @param.ParrainFilePath), Encoding.UTF8, true);
                using var csvFileul = new CsvReader(readerFileul, configCSV);
                using var csvParrain = new CsvReader(readerParrain, configCSV);

                csvFileul.Context?.RegisterClassMap<MapStudent>();
                csvParrain.Context?.RegisterClassMap<MapStudent>();

                var fileuls = csvFileul.GetRecords<Student>().ToList();
                var parrains = csvParrain.GetRecords<Student>().ToArray();
                var key = 0;

                List<Student> fileulParrain;


                while (fileuls.Count > 0)
                {

                    foreach (var parrain in parrains)
                    {

                        if (fileuls.Count <= 0)
                            break;

                        int randIndex = random.Next(0, fileuls.Count);
                        fileulParrain = new() { parrain, fileuls[randIndex] };
                        fileuls.Remove(fileuls[randIndex]);

                        var match = new MatchDTO
                        {
                            Key = key,
                            Matches = fileulParrain
                        };
                        matches.Add(match);
                        key++;
                    }
                }
                    
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
                return BadRequest(ex.Message);
            }

            return Ok(matches);
        }
    }
}