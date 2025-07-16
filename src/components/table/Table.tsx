import React from 'react';
import SearchBar from '../search/SearchBar';
import PokemonsGrid from '../result/PokemonsGrid';
import Spinner from '../spinner/Spinner';
import { searchKey } from '../../utils/Constants';
import ErrorBoundary from '../error/ErrorBoundary';
import ErrorTrigger from '../error/ErrorTrigger';

interface PokemonData {
  name: string;
  url: string;
}

class Table extends React.Component {
  state = {
    isLoading: false,
    pokemons: [],
  };
  searchText: string = '';

  definePokemons(data: Array<PokemonData>) {
    if (data != null) {
      this.setState({
        isLoading: false,
        pokemons: data.map((item) => item.name),
      });
    }
  }

  fetchData = (limit: string) => {
    this.setState({ isLoading: true });

    fetch(
      `https://pokeapi.co/api/v2/pokemon/?offset=40&limit=${limit == '' ? 10 : limit}`
    )
      .then((response) => {
        if (!response.ok) {
          this.setState({ isLoading: false });
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
      })
      .then((fetchedData) => {
        this.definePokemons(fetchedData.results);
      })
      .catch((err) => {
        this.setState({ isLoading: false });
        console.log(err);
      });
  };

  componentDidMount() {
    const lSValue = localStorage.getItem(searchKey);
    this.searchText = lSValue ? lSValue : '';

    this.fetchData(this.searchText);
  }

  handleClick = (limit: string) => {
    localStorage.setItem(searchKey, limit);

    this.fetchData(limit);
  };

  render(): React.ReactNode {
    return (
      <div className="relative items-center block">
        <SearchBar
          onBtnSearchClick={this.handleClick}
          searchText={this.searchText}
        />

        <ErrorBoundary
          fallback={
            <div className="flex items-center justify-center bg-amber-700">
              <div>Something went wrong!</div>
            </div>
          }
        >
          <div>
            {this.state.isLoading && <Spinner />}
            <PokemonsGrid pokemons={this.state.pokemons} />
          </div>

          <ErrorTrigger />
        </ErrorBoundary>
      </div>
    );
  }
}

export default Table;
