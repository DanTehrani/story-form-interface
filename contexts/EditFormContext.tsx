import { createContext, useCallback, useState } from "react";
import {
  CreateFormInput,
  FormQuestion,
  FormSettings,
  IEditFormContext
} from "../types";
import { getForm as _getForm } from "../lib/form";

const defaultState = {
  formInput: {
    title: "",
    questions: [
      {
        label: "",
        type: "text",
        customAttributes: []
      }
    ],
    settings: {
      requireEthereumWallet: false
    }
  },
  setFormInput: () => null,
  updateQuestion: () => null,
  updateSettings: () => null,
  getForm: () => null,
  formNotFound: false
};

const EditFormContext = createContext<IEditFormContext>(defaultState);

export const EditFormContextProvider = ({ children }) => {
  const [formInput, setFormInput] = useState<CreateFormInput>(
    defaultState.formInput
  );

  const [formNotFound, setFormNotFound] = useState<boolean>(false);

  const updateQuestion = (question: FormQuestion, questionIndex) => {
    setFormInput({
      ...formInput,
      questions: formInput.questions.map((q, i) =>
        i === questionIndex ? question : q
      )
    });
  };

  const updateSettings = (settings: FormSettings) => {
    setFormInput({
      ...formInput,
      settings
    });
  };

  const getForm = useCallback(async (formId: string) => {
    const _form = await _getForm(formId);

    if (_form) {
      setFormInput({
        title: _form.title,
        questions: _form.questions,
        settings: _form.settings || {}
      });
    } else {
      setFormNotFound(true);
    }
  }, []);

  return (
    <EditFormContext.Provider
      value={{
        formInput,
        setFormInput,
        updateQuestion,
        updateSettings,
        getForm,
        formNotFound
      }}
    >
      {children}
    </EditFormContext.Provider>
  );
};

export default EditFormContext;
