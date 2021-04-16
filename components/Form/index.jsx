import { useState } from "react";
import { Wrapper } from "./index.styles";
import { useForm } from "react-hook-form";
import { Button, CircularProgress } from "@material-ui/core";
import { TYPES } from "../../constants";
import { sendContractorData } from "../../apis";
import { objectToFormData } from "../../utils";
import { Alert } from "@material-ui/lab";
import {
  InputFirstname,
  InputLastname,
  InputType,
  InputNip,
  InputPesel,
  InputImage,
} from "../Inputs";

const sendWithSleep = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const result = await sendContractorData(data);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    }, 1000);
  });
};

export const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: { type: TYPES[0].value } });

  const [loading, setLoading] = useState(false);
  const [resultText, setResultText] = useState({ type: "", text: "" });
  const onSubmit = async (data) => {
    const form = objectToFormData(data);
    try {
      setLoading(true);
      await sendWithSleep(form);
      setResultText({ type: "success", text: "Dodano kontrahenta" });
    } catch (error) {
      setLoading(false);
      setResultText({ type: "error", text: "Nie znaleziono metody zapisu" });
    }
  };

  const type = watch("type");

  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <h1>Formularz</h1>
      <InputFirstname register={register} errors={errors} />
      <InputLastname register={register} errors={errors} />
      <InputType register={register} value={type} />
      {type === TYPES[0].value ? (
        <InputPesel register={register} errors={errors} />
      ) : (
        <InputNip register={register} errors={errors} />
      )}
      <InputImage register={register} setValue={setValue} />
      <hr />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
      >
        Dodaj kontrahenta
      </Button>
      <br />
      {loading ? (
        <CircularProgress color="inherit" />
      ) : (
        resultText.text && (
          <Alert variant="filled" severity={resultText.type}>
            {resultText.text}
          </Alert>
        )
      )}
    </Wrapper>
  );
};
