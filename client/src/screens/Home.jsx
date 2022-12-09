import { useEffect, useState } from "react";
import logoEndpd from "./../assets/logoEnspd.png"
import InsertFiles from "../components/InsertFiles";
import Navbar from "../components/Navbar";
import Matches from "../components/Matches";
import FetchMatches from "../api/MatchesAPI";
import Loader from "../components/Loader";

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

  const downloadToFile = (content, filename, contentType) => {
    const a = document.createElement('a');
    let file = new Blob([content], { type: contentType });

    // Download the plain json
    a.href = URL.createObjectURL(file);
    a.download = `${filename}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    
    // Convert to csv
    const items = JSON.parse(content)
    const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    const header = Object.keys(items[0])
    const csv = [
      header.join(','), // header row first
      ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    ].join('\r\n')
    
    // Download the csv
    file = new Blob([csv]);
    a.href = URL.createObjectURL(file)
    a.download = `${filename}.csv`
    a.click();
    URL.revokeObjectURL(a.href);

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
              <h1>Parrainage ENSPD 2022</h1>
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