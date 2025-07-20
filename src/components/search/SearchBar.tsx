import React from 'react';

interface SearchBarProps {
  searchText: string;
  onBtnSearchClick: (text: string) => void;
}

interface SearchBarState {
  searchText: string;
}

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);

    this.state = {
      searchText: props.searchText,
    };
  }

  componentDidUpdate(prevProps: SearchBarProps) {
    if (prevProps.searchText !== this.props.searchText) {
      this.setState({ searchText: this.props.searchText });
    }
  }

  render(): React.ReactNode {
    return (
      <div className="flex py-2 px-4 gap-4">
        <input
          id="SearchInput"
          type="text"
          value={this.state.searchText}
          className="w-3/4 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="input pokemons amount"
          onChange={(e) => {
            this.setState({
              searchText: e.target.value,
            });
          }}
        />
        <button
          className="w-1/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => this.props.onBtnSearchClick(this.state.searchText)}
        >
          Search
        </button>
      </div>
    );
  }
}

export default SearchBar;
