import { useState } from "react";
import logoEndpd from "./../assets/logoEnspd.png"
import InsertFiles from "../components/InsertFiles";
import Navbar from "../components/Navbar";

const Home = () => {
  const [started, setStarted] = useState(false)
  const [loading, setLoading] = useState(false)
  const toggleStates = (inputs) => {
    for(let i = 0; i < inputs.length; i++){
      const label = inputs[i].nextElementSibling
      label.classList.toggle('disabled')
      inputs[i].disabled = !inputs[i].disabled;
    }
  }
  const proceed = () => {
    // Disable les inputs
    const inputs = document.getElementsByClassName("input")
    toggleStates(inputs)

    // Lancer le loader
    setLoading(prv => !prv)

    // Envoyer la requete post

    // Arreter le loader lorsque la requette est effectuee et afficher les resultats
  }
  const start = () => {
    setStarted(prv => !prv)
  }

  return ( 
    <>
      <Navbar/>
      <div className="home view">
        <div className="content">
          <img src={ logoEndpd } alt="ENSPD"/>
          <h1>Parrainage ENSPD 2022</h1>
          {!started && <button className="btn btn-primary" onClick={start}>Commencer</button>}
          {started && <InsertFiles proceed = { proceed }/>}
          {loading && <p>Traitement . . .</p>}
        </div>
      </div>
    </>
   );
}

export default Home;