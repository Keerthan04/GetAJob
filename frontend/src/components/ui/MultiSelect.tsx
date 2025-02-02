import Select from "react-select";

interface MultiSelectProps {
  selected: string[];
  options: { value: string; label: string }[];
  onChange: (selected: { value: string; label: string }[]) => void;
}

export function MultiSelect({ selected, options, onChange }: MultiSelectProps) {
  return (
    <Select
      isMulti
      options={options}
      value={options.filter((option) => selected.includes(option.value))}
      onChange={(selectedOptions) =>
        onChange(selectedOptions as { value: string; label: string }[])
      }
      className="react-select-container"
      classNamePrefix="react-select"
    />
  );
}
