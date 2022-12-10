import { useState } from "react"
import InputFile from "./InputFile"

const InsertFiles = ({ proceed }) => {
  const [parrainText, setParrainText] = useState("Aucun fichier ajouté")
  const [filleulText, setFilleulText] = useState("Aucun fichier ajouté")

  return (
    <>
      <div className="start-part">
        <form action="post" onSubmit={e => e.preventDefault()}>
          <div className="inputs">
            <div className="filleul">
              <h2>Fichier csv des fileuls</h2>
              <InputFile
                name="cadets"
                className="bg-fileul"
                text={filleulText}
                accept=".csv, .xlsx"
                setText={setFilleulText} />
            </div>
            <div className="parrain">
              <h2>Fichier csv des parrains</h2>
              <InputFile
                name="aines"
                className="bg-parrain"
                text={parrainText}
                accept=".csv, .xlsx"
                setText={setParrainText} />
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => proceed(parrainText, filleulText)}>Attribuer</button>
        </form>
      </div>
    </>
  );
}

export default InsertFiles;