import { useEffect, useState } from "react";

const Matches = ({ matches, downloadFile }) => {
  const [currentMatch, setCurrentMatch] = useState(matches[0]);

  useEffect(() => {
    setCurrentMatch(matches[0])
  }, [matches])

  useEffect(() => {
    const downloadBtn = document.getElementById("download")
    downloadBtn.addEventListener('click', downloadFile)
  }, [])

  const navigate = (i) => {
    let index = currentMatch.key
    index += i
    if (index >= 0 && index <= matches.length - 1) {
      setCurrentMatch(matches[index])
    }
  }

  const next = () => {
    navigate(1)
  }

  const previous = () => {
    navigate(-1)
  }

  useEffect(() => {
    const nextBtn = document.getElementById("next-btn")
    const prevBtn = document.getElementById("prev-btn")

    if (nextBtn === null || prevBtn === null) {
      return
    }
    prevBtn.disabled = false
    nextBtn.disabled = false

    if (currentMatch.key === 0) {
      prevBtn.disabled = true
    }

    if (currentMatch.key === matches.length - 1) {
      nextBtn.disabled = true
    }
  }, [currentMatch])

  return ( 
    <>
    <div className="matches-wrapper">
      <div id="matches" className="matches">
        <div className="filleul">
          <div className="infos">
            <h1 className="center">Filleul</h1>
            <ul>
              <li>Noms: <span>{ currentMatch.filleul.name }</span></li>
              <li>Matricule: <span>{ currentMatch.filleul.matricule }</span></li>
            </ul>
          </div>
          <img onError={(e) => e.target.src="/user_fill.svg"} src={ currentMatch.filleul.url } alt={ currentMatch.filleul.name } />
        </div>
        <div className="parrain">
          <div className="infos">
            <h1 className="center">Parrain</h1>
            <ul>
              <li>Noms: <span>{ currentMatch.parrain.name }</span></li>
              <li>Matricule: <span>{ currentMatch.parrain.matricule }</span></li>
            </ul>
          </div>
          <img onError={(e) => e.target.src="/user_fill.svg"} src={ currentMatch.parrain.url } alt={ currentMatch.parrain.name } />
        </div>
      </div>
      <div className="navigation">
        <button id="prev-btn" className="btn btn-primary" onClick={ previous }>Precedent</button>
        <button id="next-btn" className="btn btn-primary" onClick={ next }>Suivant</button>
      </div>
      <button id="download" className="btn btn-primary">Telecharger</button>
      </div>
    </>
   );
}
 
export default Matches;