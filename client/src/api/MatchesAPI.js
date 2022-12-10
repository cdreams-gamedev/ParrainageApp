const baseURL = 'https://localhost:7265'

const FetchMatches = async (parrainFilePath, fileulFilePath) => {

  let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
  }

  let bodyContent = JSON.stringify({
    "parrainFilePath": parrainFilePath,
    "fileulFilePath": fileulFilePath
  });

  let response = await fetch(`${baseURL}/Matches`, {
    method: "POST",
    body: bodyContent,
    headers: headersList
  });

  console.log(response)

  let data = await response.text();
  console.log(data)
  return JSON.parse(data)

}

const formatData = (data) => {
  let formattedData = data.reduce((acc, obj) => {

    obj.matches[0].url = obj.matches[0].url.replace("open", "uc") 
    obj.matches[1].url = obj.matches[1].url.replace("open", "uc")

    console.log(data)

    return [...acc, {
      key: obj.key,
      parrain: obj.matches[0],
      filleul: obj.matches[1]
    }]
  }, [])

  return formattedData;
}

const FetchMatchesFormatted = async (parrainFilePath, fileulFilePath) => {
  const data = await FetchMatches(parrainFilePath, fileulFilePath)

  return formatData(data)
}

export default FetchMatchesFormatted