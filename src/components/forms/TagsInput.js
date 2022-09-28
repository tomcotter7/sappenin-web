import React, { Component, KeyboardEventHandler, useState} from 'react'
import CreatableSelect from 'react-select/creatable'
import { ActionMeta, OnChangeValue } from 'react-select'

const createOption = (label) => ({
  label,
  value: label,
});

const components = {
  DropdownIndicator: null,
};

/*
interface Option {
  label: string;
  value: string;
}

interface State {
  inputValue: string;
  value: Option[];
}
*/

/*
 * @author: Thomas Cotter
 * @component
 */
const TagsInput = (props) => {

  const [inputValue, setInputValue] = useState('')
  const [value, setValue] = useState([])

  const handleChange = (value, actionMeta) => {
    setValue(value)
  };

  const handleInputChange = (inputValue) => {
    setInputValue(inputValue)
  }

  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        console.group("Value Added")
        console.log(value)
        console.groupEnd()
        setValue([...value, createOption(inputValue)])
        setInputValue('')
        event.preventDefault()
    }
  }

  return (
      <CreatableSelect
        components={components}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={(v, a) => handleChange(v, a)}
        onInputChange={(iv) => handleInputChange(iv)}
        onKeyDown={(e) => handleKeyDown(e)}
        placeholder="Type something and press enter..."
        value={value}
      />
    );
}


export default TagsInput
