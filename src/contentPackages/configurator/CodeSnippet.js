'use strict';

import React, {Component, PropTypes} from 'react';

class CodeSnippet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
      shouldTruncate: false,
      dirty: true
    }

    this.onClick = this.onClick.bind(this);
  }

  onClick(e){
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  // Truncation logic
  shouldTruncate() {
    const mobileWidth  = 480;
    const mobileValue  = 240;
    const desktopValue = 320;

    // get window width & height of codesnippetWrapper
    const width = window.innerWidth;
    const containerHeight = parseInt(window.getComputedStyle(this.refs.codesnippetWrapper).height);
    const isMobile = width < mobileWidth;

    // On small screens, truncate snippet when containerheight > 240px
    if(isMobile){
      return containerHeight > mobileValue;
    }
    // On large screens, truncate snippet when containerheight > 320px
    else {
      return containerHeight > desktopValue;
    }
  }

  componentDidMount(){
      this.setState({
        shouldTruncate: this.shouldTruncate(),
        collapsed: true,  // default is to collapse; if there's no need the button won't be shown anyways
        dirty: false
      })
  }

  componentWillReceiveProps(nextProps){
      this.setState({
        dirty: true
      });
  }

  componentDidUpdate(){
    if(this.state.dirty){
      this.setState({
        shouldTruncate: this.shouldTruncate(),
        dirty: false
      })
    }
  }

  // This minor witchcraft is needed to add html to the code snippet.
  // If we don't properly escape the html entities, the whole component breaks
  get codeString(){
    const start = `&#x3C;div data-pestle-module=&#x22;${this.props.componentName}&#x22;&#x3E;\n&#x3C;script type=&#x22;text/json&#x22; data-pestle-options&#x3E;\n`;
    const end = "\n&lt;script&gt;";

    return start + JSON.stringify(this.props.code, null, 2) + end;
  }

  renderSimpleState(){
    return (
      <div className="codesnippet-wrapper expandheight" ref="codesnippetWrapper">
        <pre className="codesnippet">
          <code className="language-markup" dangerouslySetInnerHTML={{__html: this.codeString }} />
        </pre>
      </div>
    )
  }

  renderComplexState(){
    let codeSnippetWrapperClass =
      this.state.collapsed ? "codesnippet-wrapper constrainheight" : "codesnippet-wrapper expandheight";

      return (
        <div className={codeSnippetWrapperClass} ref="codesnippetWrapper">
          <pre className="codesnippet">
            <code className="language-markup" dangerouslySetInnerHTML={{__html: this.codeString}} />
          </pre>
          {
              this.state.collapsed
              ? <button onClick={this.onClick} className="codesnippet-button mt3_col-12 mt3_h5 codesnippet-icon codesnippet-icon--expand">Expand</button>
              : <button onClick={this.onClick} className="codesnippet-button mt3_col-12 mt3_h5 codesnippet-icon codesnippet-icon--collapse">Collapse</button>
          }
        </div>
      )
  }

  render() {
    if(this.state.shouldTruncate === false){
        return this.renderSimpleState();
    }
    return this.renderComplexState();
  }
}

export default CodeSnippet;
