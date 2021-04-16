import { useState, useEffect } from "react";
import { TextField, MenuItem, Button } from "@material-ui/core";
import isPeselValid from "pesel-check";
import { TYPES } from "../../constants";
import { searchNip } from "../../apis";
import AddIcon from "@material-ui/icons/AddCircle";
import styled from "styled-components";

const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  margin: 5px;
  object-fit: cover;
`;

export const InputFirstname = ({ register, errors }) => {
  return (
    <TextField
      label="Imię"
      margin="normal"
      variant="outlined"
      fullWidth
      {...register("firstname", {
        required: "Podaj imię",
        pattern: {
          value: /^\D{3,150}$/,
          message: "Błędne imię",
        },
        minLength: {
          value: 3,
          message: "Za krótkie imię, min. 3 znaki",
        },
        maxLength: {
          value: 150,
          message: "Za długie imię, max. 150 znaków",
        },
      })}
      error={!!errors?.firstname}
      helperText={errors?.firstname?.message}
    />
  );
};

export const InputLastname = ({ register, errors }) => {
  return (
    <TextField
      label="Nazwisko"
      margin="normal"
      variant="outlined"
      fullWidth
      {...register("lastname", {
        required: "Podaj nazwisko",
        pattern: {
          value: /^\D{3,150}$/,
          message: "Błędne nazwisko",
        },
        minLength: {
          value: 3,
          message: "Za krótkie nazwisko, min. 3 znaki",
        },
        maxLength: {
          value: 150,
          message: "Za długie nazwisko, max. 150 znaków",
        },
      })}
      error={!!errors?.lastname}
      helperText={errors?.lastname?.message}
    />
  );
};

export const InputType = ({ register, value }) => {
  return (
    <TextField
      label="Typ"
      select
      margin="normal"
      variant="outlined"
      fullWidth
      value={value}
      {...register("type", {
        required: "Wybierz typ",
      })}
    >
      {TYPES.map(({ value, label }) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export const InputNip = ({ register, errors }) => {
  const validate = async (nip) => {
    try {
      await searchNip(nip);
      return true;
    } catch (error) {
      return false;
    }
  };
  return (
    <TextField
      label="NIP"
      margin="normal"
      variant="outlined"
      type="number"
      fullWidth
      {...register("id", {
        required: "Podaj NIP",
        pattern: {
          value: /^\d{10}$/,
          message: "NIP musi mieć 10 cyfr",
        },
        validate,
      })}
      error={!!errors?.id}
      helperText={errors?.id?.message}
    />
  );
};

export const InputPesel = ({ register, errors }) => {
  return (
    <TextField
      label="PESEL"
      margin="normal"
      variant="outlined"
      type="number"
      fullWidth
      {...register("id", {
        required: "Podaj PESEL",
        pattern: {
          value: /^\d{11}$/,
          message: "PESEL musi mieć 11 cyfr",
        },
        validate: (v) => isPeselValid(v) || "Błędny pesel",
      })}
      error={!!errors?.id}
      helperText={errors?.id?.message}
    />
  );
};

export const InputImage = ({ register, setValue }) => {
  const name = "image";
  const [imgData, setImgData] = useState("");
  const onChange = (e) => {
    const file = e.currentTarget.files[0];
    setImgData(URL.createObjectURL(file));
    setValue(name, file);
  };

  useEffect(() => {
    register(name);
  }, []);

  return (
    <>
      <Button variant="contained" color="primary">
        <Label>
          Dodaj zdjęcie &nbsp;
          <AddIcon />
          <input
            name={name}
            type="file"
            accept="image/jpg, image/jpeg"
            style={{ display: "none" }}
            onChange={onChange}
          />
        </Label>
      </Button>
      {imgData && <Image src={imgData} alt="" />}
    </>
  );
};
