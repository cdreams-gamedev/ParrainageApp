import { useEffect, useState } from "react";

const Matches = ({ matches, downloadFile, watching }) => {
  const [currentMatch, setCurrentMatch] = useState(matches[0]);
  const [parrainPictureURL, setParrainPictureURL] = useState(currentMatch.parrain.url)
  const [filleulPictureURL, setFilleulPictureURL] = useState(currentMatch.filleul.url)

  useEffect(() => {
    setCurrentMatch(matches[0])
    console.log(currentMatch.filleul.url)
  }, [matches])

  useEffect(() => {

    setFilleulPictureURL(currentMatch.filleul.url)
    setParrainPictureURL(currentMatch.parrain.url)

    updateSlideButtonState()

  }, [currentMatch])

  useEffect(() => {
    (async () => {
      const downloadBtn = document.getElementById("download")
      downloadBtn.addEventListener('click', downloadFile)
    })()
  }, [])

  const navigate = (i) => {
    window.stop()
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

  const updateSlideButtonState = async () => {
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
  }

  return (
    <>
      <div className="matches-wrapper">
        <div id="matches" className="matches">
          <div className="filleul">
            <div className="infos">
              <h1 className="center">Filleul</h1>
              <h2>{currentMatch.filleul.name ? currentMatch.filleul.name : "Pas de nom"}</h2>
              
            </div>
            <img onError={(e) => e.target.src = "/user_fill.svg"} src={filleulPictureURL} alt={currentMatch.filleul.name} />
          </div>
          <div className="parrain">
            <div className="infos">
              <h1 className="center">Parrain</h1>
              <h2>{currentMatch.parrain.name ? currentMatch.parrain.name : "Pas de nom"}</h2>
                {/* <li>Matricule: <span>{ currentMatch.parrain.matricule }</span></li> */}
            </div>
            <img onError={(e) => e.target.src = "/user_fill.svg"} src={parrainPictureURL} alt={currentMatch.parrain.name} />
          </div>
        </div>
        <div className="navigation">
          <button id="prev-btn" className="btn btn-primary" onClick={previous}>Precedent</button>
          <button id="next-btn" className="btn btn-primary" onClick={next}>Suivant</button>
        </div>
        {!watching && <button id="download" className="btn btn-primary">Telecharger</button>}
      </div>
    </>
  );
}

export default Matches;