import { useContext } from "react";
import {
  Button,
  Stack,
  Input,
  Box,
  Select,
  IconButton,
  Switch,
  Text,
  Textarea
} from "@chakra-ui/react";
import {
  DeleteIcon,
  SmallCloseIcon,
  ChevronUpIcon,
  ChevronDownIcon
} from "@chakra-ui/icons";
import { FormQuestion } from "../types";
import EditFormContext from "../contexts/EditFormContext";
import CreateFormContext from "../contexts/CreateFormContext";

const SelectInput = ({
  options,
  addOption,
  deleteOption,
  updateOption
}: {
  options: string[];
  addOption: (option: string) => void;
  deleteOption: (optionIndex: number) => void;
  updateOption: (option: string, optionIndex) => void;
}) => {
  return (
    <>
      {options.map((option, i) => (
        <Stack direction="row" key={i}>
          <Input
            value={option}
            onChange={e => {
              updateOption(e.target.value, i);
            }}
            placeholder="your option"
          />
          <IconButton
            aria-label="delete option"
            variant="ghost"
            icon={<SmallCloseIcon></SmallCloseIcon>}
            onClick={() => {
              deleteOption(i);
            }}
          ></IconButton>
        </Stack>
      ))}
      <Button
        size="sm"
        onClick={() => {
          addOption("");
        }}
      >
        add option
      </Button>
    </>
  );
};

const TextInput = () => {
  return (
    <Input placeholder="Text input field" variant="filled" disabled></Input>
  );
};

const INPUT_TYPES = [
  {
    label: "Text",
    value: "text"
  },
  {
    label: "Select",
    value: "select"
  }
];

type Props = {
  formQuestion: FormQuestion;
  formQuestionIndex: number;
  deleteQuestion: () => void;
  moveQuestionUp: () => void;
  context: typeof EditFormContext | typeof CreateFormContext;
  moveQuestionDown: () => void;
};

const CreateFormQuestionCard: React.FC<Props> = ({
  context,
  formQuestion,
  formQuestionIndex,
  deleteQuestion,
  moveQuestionUp,
  moveQuestionDown
}) => {
  // Depending on the type, gotta show something different.
  // @ts-ignore
  const { formInput, setFormInput, updateQuestion } = useContext(context);

  if (!formInput) {
    return <></>;
  }

  const handleQuestionLabelChange = value => {
    setFormInput({
      ...formInput,
      questions: formInput.questions.map((q, i) =>
        i === formQuestionIndex
          ? {
              ...q,
              label: value
            }
          : q
      )
    });
  };

  const handleQuestionTypeChange = value => {
    updateQuestion({ ...formQuestion, type: value }, formQuestionIndex);
  };

  const handleAddOptionClick = (option: string) => {
    updateQuestion(
      {
        ...formQuestion,
        options: [
          ...(formQuestion?.options ? formQuestion.options : []),
          option
        ]
      },
      formQuestionIndex
    );
  };

  const handleDeleteOptionClick = (optionIndex: number) => {
    updateQuestion(
      {
        ...formQuestion,
        options: formQuestion.options?.filter((_, i) => i !== optionIndex) || []
      },
      formQuestionIndex
    );
  };

  const handleUpdateOption = (option, optionIndex) => {
    updateQuestion(
      {
        ...formQuestion,
        options:
          formQuestion.options?.map((o, i) =>
            i === optionIndex ? option : o
          ) || []
      },
      formQuestionIndex
    );
  };

  const handleToggleRequired = () => {
    updateQuestion(
      {
        ...formQuestion,
        required: !formQuestion.required
      },
      formQuestionIndex
    );
  };

  return (
    <Box borderWidth="2px" borderRadius="lg" p={6} boxShadow="sm">
      <Stack direction="row" justify="end"></Stack>
      <Stack direction="row" mt={4} alignItems="start">
        <Textarea
          overflow=""
          variant="outline"
          borderBottom="1px"
          borderColor="gray.500"
          placeholder="Question"
          value={formQuestion.label}
          onChange={e => {
            handleQuestionLabelChange(e.target.value);
          }}
        />
        <Select
          onChange={e => {
            handleQuestionTypeChange(e.target.value);
          }}
        >
          {INPUT_TYPES.map((inputType, i) => (
            <option
              key={i}
              label={inputType.label}
              value={inputType.value}
            ></option>
          ))}
        </Select>
      </Stack>
      <Stack gap={4} mt={4}>
        {formQuestion?.type === "select" ? (
          <SelectInput
            options={formQuestion?.options || []}
            addOption={handleAddOptionClick}
            deleteOption={handleDeleteOptionClick}
            updateOption={handleUpdateOption}
          ></SelectInput>
        ) : formQuestion?.type === "text" ? (
          <TextInput></TextInput>
        ) : (
          <></>
        )}
      </Stack>
      <Stack direction="row" justify="space-between" align="center" mt={4}>
        <Stack direction="row" align="center">
          <Switch
            size="sm"
            onChange={handleToggleRequired}
            isChecked={formQuestion.required}
          ></Switch>
          <Text>Required</Text>
        </Stack>
        <Stack direction="row" align="center">
          <IconButton
            aria-label="Move question up"
            variant="ghost"
            size="sm"
            _hover={{}}
            icon={<ChevronUpIcon></ChevronUpIcon>}
            onClick={moveQuestionUp}
          ></IconButton>
          <IconButton
            aria-label="Move question down"
            variant="ghost"
            size="sm"
            icon={<ChevronDownIcon></ChevronDownIcon>}
            _hover={{}}
            onClick={moveQuestionDown}
          ></IconButton>
          <IconButton
            aria-label="Delete question"
            icon={<DeleteIcon></DeleteIcon>}
            onClick={deleteQuestion}
          ></IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default CreateFormQuestionCard;
