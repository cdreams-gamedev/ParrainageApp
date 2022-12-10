const removeKey = (jsonString) => {
  const pattern = /,(\w)*:/ig
  return jsonString.replaceAll(pattern, ",")
}

export const WriteToCSV = async (content, filename, contentType) => {
  const date = Date().replace(/GMT-.*\)/g, "").replaceAll(" ","_")

  const a = document.createElement('a');
  let file = new Blob([content], { type: contentType });

  // Download the plain json
  a.href = URL.createObjectURL(file);
  a.download = `${filename}_${date}.json`;
  a.click();
  URL.revokeObjectURL(a.href);

  // Convert to csv
  const items = JSON.parse(content)

  const replacer = function (key, value) { return value === null ? '' : value }

  const header = Object.keys(items[0])

  const header_csv = ["index",
    "Niveau filleul",
    "Nom Parrain",
    "Email parrain",
    "Domaines expertises",
    "Filiere",
    "Axe",
    "Matricule",
    "Sexe",
    "Photo parrain",
    "Niveau Filleul",
    "Nom Filleul",
    "Email Filleul",
    "Domaines expertises",
    "Filiere",
    "Axe",
    "Matricule",
    "Sexe",
    "Photo Filleul",
  ]
  const csv = [
    header_csv.join(','), // header row first
    ...items.map(
      row => header.map(fieldName => {
        console.log()
        let fieldValue = JSON.stringify(row[fieldName], replacer);

        let formattedValue = fieldValue
        formattedValue = formattedValue.replaceAll('{"level":', "")
        formattedValue = formattedValue.replaceAll("{", "")
        formattedValue = formattedValue.replaceAll("}", "")
        formattedValue = formattedValue.replaceAll('"', "")
        
        formattedValue = removeKey(formattedValue)
        formattedValue.replaceAll(":", "")
      
        return formattedValue 
      }
      ).join(',')
    )

  ].join('\r\n')

  console.log(`csv : ${csv}`)

  // Download the csv
  file = new Blob([csv],{type:"text/csv;charset=utf-8"});
  a.href = URL.createObjectURL(file)
  a.download = `${filename}_${date}.csv`
  a.click();
  URL.revokeObjectURL(a.href);
}