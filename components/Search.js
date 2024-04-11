import { SearchBar } from "react-native-elements";

export const Search = ({ searchText, onSearch }) => {
  const handleSearch = (text) => {
    onSearch(text);
  };

  return (
    <SearchBar
      placeholder="Sök"
      onChangeText={handleSearch}
      value={searchText}
      platform="android"
    />
  );
};
