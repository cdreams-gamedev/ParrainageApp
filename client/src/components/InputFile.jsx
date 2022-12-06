import { useState } from "react";

const InputFile = ({ name }) => {
  const [text, setText] = useState("Aucun fichier ajouté")
  const handleChange = (e) => {
    let fileName = e.target.value.split('\\').pop()
    setText(fileName)
  }

  return ( 
    <>
      <input 
        className="input" 
        type="file" id={ name } 
        name={ name } 
        accept=".csv, .xlsx"
        onChange={ (e) => handleChange(e) }/>
      <label className="label-input" htmlFor={ name }>{ text }</label>
    </>
   );
}

export default InputFile;