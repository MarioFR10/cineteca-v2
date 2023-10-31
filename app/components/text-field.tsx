import {
  FilledInputProps,
  InputProps,
  OutlinedInputProps,
  TextField as MUITextField,
} from "@mui/material";
import { tailwind } from "../utils/styles";

type Props = {
  label?: string;
  initialValue?: string;
  setInputValue: (value: string) => void;
  showPassword?: boolean;
  inputProps?:
    | Partial<FilledInputProps>
    | Partial<OutlinedInputProps>
    | Partial<InputProps>;
  className?: string;
};

export function TextField({
  label,
  initialValue,
  showPassword = true,
  inputProps,
  setInputValue,
  className,
}: Props) {
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  return (
    <div className={tailwind("w-80", className)}>
      <MUITextField
        fullWidth
        type={showPassword ? "text" : "password"}
        variant="outlined"
        label={label}
        value={initialValue}
        onChange={handleInputChange}
        InputProps={inputProps}
      />
    </div>
  );
}
