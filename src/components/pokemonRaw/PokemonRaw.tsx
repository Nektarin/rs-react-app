import React from 'react';

interface PokemonRawProps {
  index: number;
  name: string;
}

class PokemonRaw extends React.Component<PokemonRawProps> {
  render(): React.ReactNode {
    return (
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
        <td className="px-6 py-4">Pokemon - {this.props.index + 1}</td>
        <td className="px-6 py-4">{this.props.name}</td>
      </tr>
    );
  }
}

export default PokemonRaw;
