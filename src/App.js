import React from "react";
import Badge from "react-bootstrap/Badge";
// let marked = require("marked");
import { marked } from 'marked';


const projectName = 'markdown-previewer';

// ALLOWS LINE BREAKS WITH RETURN BUTTON
marked.setOptions({
  breaks: true,
//  highlight: function (code) {
//    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
//  }
});

// INSERTS target="_blank" INTO HREF TAGS (required for Codepen links)
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: placeholder,
      editorMaximized: false,
      previewMaximized: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorMaximize = this.handleEditorMaximize.bind(this);
    this.handlePreviewMaximize = this.handlePreviewMaximize.bind(this);
  }
  handleChange(e) {
    this.setState({
      markdown: e.target.value
    });
  }
  handleEditorMaximize() {
    this.setState({
      editorMaximized: !this.state.editorMaximized
    });
  }
  handlePreviewMaximize() {
    this.setState({
      previewMaximized: !this.state.previewMaximized
    });
  }
  render() {
    const classes = this.state.editorMaximized
      ? ['editorWrap maximized', 'previewWrap hide', 'fa fa-compress']
      : this.state.previewMaximized
      ? ['editorWrap hide', 'previewWrap maximized', 'fa fa-compress']
      : ['editorWrap', 'previewWrap', 'fa fa-arrows-alt'];
    return (
      <div>
        <div className={classes[0]}>
          <Toolbar
            icon={classes[2]}
            onClick={this.handleEditorMaximize}
            text="Editor"
          />
          <Editor markdown={this.state.markdown} onChange={this.handleChange} />
        </div>
        <div className="converter" />
        <div className={classes[1]}>
          <Toolbar
            icon={classes[2]}
            onClick={this.handlePreviewMaximize}
            text="Previewer"
          />
          <Preview markdown={this.state.markdown} />
        </div>
      </div>
    );
  }
}

const Toolbar = (props) => {
  return (
    <div className="toolbar">
      <i className="fa fa-free-code-camp" title="negina" />
      {props.text}
      <i className={props.icon} onClick={props.onClick} />
    </div>
  );
};

const Editor = (props) => {
  return (
    <textarea
      id="editor"
      onChange={props.onChange}
      type="text"
      value={props.markdown}
    />
  );
};

const Preview = (props) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: marked(props.markdown, { renderer: renderer })
      }}
      id="preview"
    />
  );
};

const placeholder = `
# React Markdown Previewer!
## This is a sub-heading...

Or... wait for it... **_both!_**

And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://ashusingh.me), and
> Block Quotes!

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.
![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`
