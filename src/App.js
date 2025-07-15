import React, { useState }from 'react';
import './App.css';
import {marked} from 'marked';
import { FaSun, FaMoon } from 'react-icons/fa';

marked.setOptions({ breaks: true });

const defaultMarkdown = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Here's some code, \`<div></div>\`,
between 2 backticks.

\`\`\`
// this is a multi line code:
function anotherExample(firstLine,
lastLine) {
  if (firstLine === '\`\`\`' && lastLine === '\`\`\`') {
  return multiLineCode;
  }
};
\`\`\`

You can also make text **bold**...
whoa!
Or _italics_.
Or ... wait for it... **_bold!_**
And feel free to go crazy ~~crossing
stuff out~~.

There's also 
[links](https://www.freecodecamp.org)
, and
> Block Quotes!

And if you want to get really crazy,
even tables:

Wild Header   | Crazy Header  | Another Header
------------  | ------------  | -------------
content can   | be here, and  | here

- And of course there are lists.
  - Some are bulleted
    - With different indentation levels.
      - That looks like this.

1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freecodecampLogo](https://cdn.freecodecamp.org/testables-projects-free/images/fcc_secoundary.svg)
  
`;

function App() {

  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const [darkMode, setDarkMode] = useState(false);
  const [ showEditor, setshowEditor] = useState(true);
  const [ showPreview, setShowPreview] = useState(true);

  return (
  <div
  className={`app ${darkMode ? 'dark' : 'light'}`}
  >
    <div className='theme-toggle'
    onClick={() => setDarkMode(! darkMode)}>
      {darkMode ? <FaSun /> : <FaMoon />}
    </div>
    {showEditor && (
      <div className={`pane editor-pane ${ !showPreview ? 'full' : ''}`}>
      <div
      className='toolbar'>
        <span
        className='title'>
          Editor
        </span>
        <button
        className='close-btn'
        onClick={ () => setShowPreview(!showPreview)}>
          X
        </button>
      </div>
      <textarea
      id='editor'
      value={markdown}
      onChange={(e) => setMarkdown(e.target.value)}
      />
    </div>
    )}

    {showPreview && (

    <div
    className={`pane preview-pane ${!showEditor ? 'full' : '' }`}
    >
      <div className='toolbar'>
        <span className='title'>Previewer</span>
        <button
        className='close-btn'
        onClick={ () => setshowEditor(!showEditor(!showEditor))}>
          X
        </button>
      </div>
      <div
      id='preview'
      dangerouslySetInnerHTML={{ __html: marked.parse(markdown) }} 
      />

    </div>
    )}

  </div>
  );
}

export default App