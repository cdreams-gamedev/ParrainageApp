const removeKey = (jsonString) => {
  const pattern = /,(\w)*:/ig
  return jsonString.replaceAll(pattern, ",")
}

export const WriteToCSV = async (content, filename, contentType) => {
  const a = document.createElement('a');
  let file = new Blob([content], { type: contentType });

  // Download the plain json
  a.href = URL.createObjectURL(file);
  a.download = `${filename}_${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(a.href);

  // Convert to csv
  const items = JSON.parse(content)
  console.log(items)

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
        console.log(fieldValue)


        let formattedValue = fieldValue
        formattedValue = formattedValue.replaceAll('{"level":', "")
        formattedValue = formattedValue.replaceAll("{", "")
        formattedValue = formattedValue.replaceAll("}", "")
        formattedValue = formattedValue.replaceAll('"', "")
        
        formattedValue = removeKey(formattedValue)
        formattedValue.replaceAll(":", "")
        
        console.log(formattedValue)

        return formattedValue 
      }
      ).join(',')
    )

  ].join('\r\n')

  // Download the csv
  file = new Blob([csv]);
  a.href = URL.createObjectURL(file)
  a.download = `${filename}_${Date.now()}.csv`
  a.click();
  URL.revokeObjectURL(a.href);
}