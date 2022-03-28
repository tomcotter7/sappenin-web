import React, { Component, KeyboardEventHandler, useState} from 'react';
import CreatableSelect from 'react-select/creatable';
import { ActionMeta, OnChangeValue } from 'react-select';

const createOption = (label: string) => ({
  label,
  value: label,
});

const components = {
  DropdownIndicator: null,
};

interface Option {
  label: string;
  value: string;
}

interface State {
  inputValue: string;
  value: Option[];
}

const TagsInput = (props) => {

  const [inputValue, setInputValue] = useState('')
  const [value, setValue] = useState([])

  const handleChange = (value: OnChangeValue<Option, true>, actionMeta: ActionMeta<Option>) => {
    console.group("Value Changed")
    console.log(value)
    console.log('action: ${actionMeta.action}')
    console.groupEnd()
    setValue(value)
  };

  const handleInputChange = (inputValue: string) => {
    console.log(inputValue)
    setInputValue(inputValue)
  }

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
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
