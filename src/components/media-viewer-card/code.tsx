import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Props {
  url: string; // URL of the code file to fetch and display
}

const CodeViewer = (props: Props) => {
  const [code, setCode] = React.useState(''); // State variable to store the fetched code

  React.useEffect(() => {
    // Fetch the code file when the component mounts or when the URL changes
    fetch(props.url)
      .then((response) => response.text())
      .then((data) => setCode(data)) // Set the fetched code in the state
      .catch((error) => console.log(error)); // Log any errors that occur during the fetch
  }, [props.url]);

  return (
    <div className='w-full'>
      {/* Display the fetched code using SyntaxHighlighter component */}
      <SyntaxHighlighter wrapLines={true} language='javascript' style={darcula}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeViewer;
