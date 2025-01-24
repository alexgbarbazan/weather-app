import {
  Select as SelectUI,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";

export type Option = {
  label: string;
  value: string | number;
};

type SelectInputProps<T extends Option> = {
  options: T[];
  updateSelection: (option: T) => void;
  placeholder?: string;
  selectedOption?: T;
  selectTriggerClassName?: string;
  prefix?: JSX.Element;
};

export default function Select<T extends Option>({
  options,
  updateSelection,
  selectedOption,
  placeholder,
  selectTriggerClassName,
  prefix,
}: SelectInputProps<T>) {
  function handleSelection(value: string) {
    // Find the selected option based on the value passed by onValueChange
    const option = options.find((option) => String(option.value) === value);
    
    if (option) {
      updateSelection(option); // Update the selection in the parent component
    }
  }

  return (
    <SelectUI
      value={String(selectedOption?.value)}
      onValueChange={handleSelection}
    >
      <SelectTrigger className={`${selectTriggerClassName}`}>
        <div className="flex items-center">
          {prefix} <SelectValue placeholder={placeholder} />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={String(option.value)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectUI>
  );
}
