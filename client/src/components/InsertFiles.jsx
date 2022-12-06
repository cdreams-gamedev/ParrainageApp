import InputFile from "./InputFile"

const InsertFiles = ({ proceed }) => {
  const handleLocalProceed = () => {
    const submitBtn = document.querySelector('form button')
    submitBtn.disabled = true
    proceed()
  }

  return ( 
    <>
      <div className="start-part">
        <form action="post" onSubmit={e => e.preventDefault()}>
          <h2>Ajoutez le fichier csv des aines academiques</h2>
          {/* <input className="input" type="file" name="aines" id="" /> */}
          <InputFile name="aines"/>
          <h2>Ajoutez le fichier csv des cadets</h2>
          <InputFile name="cadets"/>
          {/* <input className="input" type="file" name="cadets" /> */}
          <button className="btn btn-primary" onClick={ handleLocalProceed }>Proceder</button>
        </form>
      </div>
    </>
   );
}
 
export default InsertFiles;