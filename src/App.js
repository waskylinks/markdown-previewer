import React, { useState } from 'react';
import './App.css';
import { marked } from 'marked';

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
`;

function App() {
  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const [darkMode, setDarkMode] = useState(false);
  const [visiblePane, setVisiblePane] = useState('both'); // 'both' | 'editor' | 'preview'

  const toggleEditor = () => {
    setVisiblePane(prev => (prev === 'editor' ? 'both' : 'editor'));
  };

  const togglePreview = () => {
    setVisiblePane(prev => (prev === 'preview' ? 'both' : 'preview'));
  };

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <div className='theme-toggle'>
        <label>
          <input
            type='checkbox'
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          {darkMode ? ' Dark Mode' : ' Light Mode'}
        </label>
      </div>

      {(visiblePane === 'both' || visiblePane === 'editor') && (
        <div className={`pane editor-pane ${visiblePane === 'editor' ? 'full-width' : ''}`}>
          <div className='toolbar'>
            <span className='title'>Editor</span>
            <button className='close-btn' onClick={toggleEditor}>X</button>
          </div>
          <textarea
            id='editor'
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
          />
        </div>
      )}

      {(visiblePane === 'both' || visiblePane === 'preview') && (
        <div className={`pane preview-pane ${visiblePane === 'preview' ? 'full-width' : ''}`}>
          <div className='toolbar'>
            <span className='title'>Previewer</span>
            <button className='close-btn' onClick={togglePreview}>X</button>
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

export default App;
