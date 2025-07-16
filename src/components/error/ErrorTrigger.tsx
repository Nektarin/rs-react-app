import React from 'react';

class ErrorTrigger extends React.Component {
  state = { shouldThrowError: false };

  throwError = () => {
    this.setState({ shouldThrowError: true });
  };

  render(): React.ReactNode {
    if (this.state.shouldThrowError) {
      throw new Error('Error from ErrorTrigger!');
    }

    return (
      <div className="flex flex-row-reverse py-2 px-4">
        <button
          className="w-100 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={this.throwError}
        >
          Throw Error
        </button>
      </div>
    );
  }
}

export default ErrorTrigger;
