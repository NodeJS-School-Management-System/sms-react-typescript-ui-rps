import Select from "react-select";
import { Box } from "@chakra-ui/react";
import { useState } from "react";

// type SelectInputProps = {
//   options: any;
//   selectedOption?: string;
//   setSelectedOption?: any;
// };

export function SelectInput() {
  const options = [
    {
      label: "Apple",
      value: "apple",
    },
    {
      label: "Mango",
      value: "mango",
    },
    {
      label: "Banana",
      value: "banana",
    },
    {
      label: "Pineapple",
      value: "pineapple",
    },
  ];

  const [selectedOption, setSelectedOption] = useState<unknown>(null);

  return (
    <Box width="100%">
      <Select
        options={options}
        isSearchable={true}
        value={selectedOption}
        onChange={(e: any) => setSelectedOption(e.target.value)}
        menuPlacement="auto"
      />
    </Box>
  );
}
