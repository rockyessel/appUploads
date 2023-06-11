import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Props {
  url: string;
}

const CodeViewer = (props: Props) => {
  const [code, setCode] = React.useState('');

  React.useEffect(() => {
    fetch(props.url)
      .then((response) => response.text())
      .then((data) => setCode(data))
      .catch((error) => console.log(error));
  }, [props.url]);

  return (
    <div className='w-full'>
      <SyntaxHighlighter
        wrapLines={true}
        language='javascript'
        style={darcula}
     
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeViewer;
