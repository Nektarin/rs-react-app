import React from 'react';
import PokemonRaw from '../pokemonRaw/PokemonRaw';

interface PokemonsGridProps {
  pokemons: string[];
}

class PokemonsGrid extends React.Component<PokemonsGridProps> {
  setRaws() {
    if (this.props.pokemons == null) {
      return;
    }

    return this.props.pokemons.map((name, indx): React.ReactNode => {
      return <PokemonRaw key={`Pokemon${indx}`} index={indx} name={name} />;
    });
  }

  render(): React.ReactNode {
    return (
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Index</th>
            <th className="px-6 py-3">Pokemon Name</th>
          </tr>
        </thead>
        <tbody>{this.setRaws()}</tbody>
      </table>
    );
  }
}

export default PokemonsGrid;
