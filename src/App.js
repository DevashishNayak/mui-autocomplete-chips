import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";

function AutocompleteChips() {
  const [inputValue, setInputValue] = useState("");
  const [chips, setChips] = useState([]);

  const handleInputChange = (event, newValue) => {
    console.log({ newValue });
    setInputValue([" ", ","].includes(newValue) ? "" : newValue);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === " " || event.key === "Enter" || event.key === ",") {
      const chipValue = inputValue.trim();
      console.log({ chipValue, inputValue });
      if (chipValue) {
        setChips([...new Set([...chips, chipValue])]);
        setInputValue("");
      }
    }
  };

  const handleChipDelete = (chipToDelete) => {
    setChips(chips.filter((chip) => chip !== chipToDelete));
  };

  const handleInputPaste = (event) => {
    const pasteData = event.clipboardData.getData("text");
    const newChips = pasteData
      .replaceAll(",", " ")
      .split(" ")
      .map((value) => value.trim())
      .filter((value) => value);
    setChips([...new Set([...chips, ...newChips])]);
    event.preventDefault();
  };
  console.log({ inputValue });

  return (
    <Autocomplete
      multiple
      id="chips-autocomplete"
      options={[]} // Options can be left empty since we're handling input manually
      value={chips}
      inputValue={inputValue}
      onChange={(event, newValue) => setChips(newValue)}
      onInputChange={handleInputChange}
      freeSolo
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            key={index}
            label={option}
            onDelete={() => handleChipDelete(option)}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Enter values"
          onKeyDown={handleInputKeyDown}
          onPaste={handleInputPaste}
        />
      )}
    />
  );
}

export default AutocompleteChips;
