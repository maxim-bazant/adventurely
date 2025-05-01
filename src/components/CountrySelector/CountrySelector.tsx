import Select from "react-select";
import countries from "../CountriesList";

interface CountrySelectProps {
  value: string[]; // Now accepts an array of selected country names
  onChange: (selectedCountries: string[]) => void; // Expects an array of country names
}

const CountrySelect= ({ value, onChange }: CountrySelectProps) => {
    const countryOptions: { [key: string]: string } = countries; // This hook provides a list of countries
    const options = Object.keys(countryOptions).map((key) => ({
        value: key,
        label: countryOptions[key],
    }));

    return (
        <Select
            options={options}
            value={options.filter((c) => value.includes(c.label))} // Filter selected countries
            onChange={(selected) => onChange(selected ? selected.map((option) => option.label) : [])} // Pass selected countries array
            placeholder="Select Countries"
            styles={{
                menu: (provided) => ({ ...provided, zIndex: 2 }),
            }}
            isSearchable
            isMulti // Enable multi-select
            required
        />
    );
};

export default CountrySelect;
