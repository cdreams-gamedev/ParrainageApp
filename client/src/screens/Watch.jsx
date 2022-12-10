import { useState } from "react";
import InputFile from "../components/InputFile"
import Navbar from "../components/Navbar";
import Matches from "../components/Matches";

const Watch = () => {
  const [matches, setMatches] = useState(null);
  const [fileName, setFileName] = useState("Aucun fichier choisi")

  const onReaderLoad = (e) => {
    var obj = JSON.parse(e.target.result)
    setMatches(obj)
  }
  const chooseFile = (e) => {
    const label = document.querySelector(".json-input")
    const input = label.previousElementSibling
    var reader = new FileReader()

    reader.onload = onReaderLoad;
    reader.readAsText(input.files[0])
    // autoScroll()
  }
  return ( 
    <>
      <Navbar/>
      <div className="view">
        <div className="container">
          <div className="watch">
            <h1 className="title-sm center">Afficher les correspondances <span className="filleul-surligner bold">Filleul</span> - <span className="parrain-surligner bold">Parrain</span></h1>
            <form>
              <InputFile
                name="jsonFile" 
                className="bg-parrain json-input"
                text={ fileName }
                setText={ setFileName }
                accept=".json"
                onChange={ chooseFile }/>
            </form>
            { matches && <Matches watching={true} matches={ matches } /> }
          </div>
        </div>
      </div>
    </>
   );
}
 
export default Watch;