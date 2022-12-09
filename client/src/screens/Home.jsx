import { useEffect, useState } from "react";
import logoEndpd from "./../assets/logoEnspd.png"
import InsertFiles from "../components/InsertFiles";
import Navbar from "../components/Navbar";
import Matches from "../components/Matches";
import FetchMatches from "../api/MatchesAPI";
import Loader from "../components/Loader";
import { WriteToCSV } from "../utils/FileFormat";

const Home = () => {
  const [started, setStarted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [matches, setMatches] = useState(null)

  const getMatches = async (parrainPath, filleulPath) => {
    const data = await FetchMatches(parrainPath, filleulPath)
    setMatches(data)
  }

  const autoScroll = () => {
    const a = document.createElement('a');
    a.href = "/#matches";
    a.click();
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const toggleStates = (inputs, submitBtn) => {
    submitBtn.disabled = !submitBtn.disabled

    for (let i = 0; i < inputs.length; i++) {
      if (!inputs[i].data) {
      }
      const label = inputs[i].nextElementSibling
      label.classList.toggle('disabled')
      inputs[i].disabled = !inputs[i].disabled;
    }
  }

  const proceed = async (parrainPath, filleulPath) => {
    // Disable les inputs
    const inputs = document.getElementsByClassName("input")
    const submitBtn = document.querySelector('form button')

    toggleStates(inputs, submitBtn)

    // Lancer le loader
    setLoading(prv => !prv)

    // Envoyer la requete post
    try {
      await getMatches(parrainPath, filleulPath)
    }
    catch (err) {
      alert('Une erreur est survenue')
    }
    finally {
      // Arreter le loader lorsque la requette est effectuee et afficher les resultats
      toggleStates(inputs, submitBtn)
      autoScroll()
      setLoading(prev => !prev)
    }
  }
  const start = () => {
    setStarted(prv => !prv)
  }

  // Save to files

  const downloadToFile = async (content, filename, contentType) => {
    await WriteToCSV(content, filename, contentType)
  }

  const onDownloadClicked = () => {
    const data = JSON.stringify(matches)
    downloadToFile(data, "correspondance_parrainage", "application/json")
  }

  return (
    <>
      <Navbar />
      <div className="view">
        <div className="container">
          <div className="home">
            <div className="content">
              <img src={logoEndpd} alt="ENSPD" />
              <h1 className="title">Parrainage ENSPD 2022</h1>
              {!started && <button className="btn btn-primary" onClick={start}>Commencer</button>}
              {started && <InsertFiles proceed={proceed} />}
              {loading && <Loader />}
            </div>
          </div>
          {matches && <Matches matches={matches} downloadFile={onDownloadClicked} />}
        </div>
      </div>
    </>
  );
}

export default Home;