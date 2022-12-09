import { useState } from "react";

const InputFile = ({ name, className, text, setText, onChange, accept }) => {
  const handleChange = (e) => {
    console.log(e.target.value)
    let fileName = e.target.value.split('\\').pop()
    setText(fileName)

    if (onChange)
      onChange(e)
  }

  return ( 
    <>
      <input 
        className="input" 
        type="file" id={ name } 
        name={ name } 
        accept={ accept }
        required
        onChange={ (e) => handleChange(e) }/>
      <label className={`label-input ${className}`} htmlFor={ name }>{ text }</label>
    </>
   );
}

export default InputFile;