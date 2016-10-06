'use strict';

import React, {Component, PropTypes} from 'react';
import * as Prism from 'prismjs';

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

  get codeString(){
    let start = `<div data-pestle-module="${this.props.componentName}">\n<script type="text/json" data-pestle-options>\n`;
    let end = "\n</script>\n</div>";

    const code = Prism.highlight(JSON.stringify(this.props.code, null, 2), Prism.languages.javascript);
    start = Prism.highlight(start, Prism.languages.markup)
    end = Prism.highlight(end, Prism.languages.markup)
    return start + code + end;
  }

  renderSimpleState(){
    return (
      <div className="codesnippet-wrapper expandheight" ref="codesnippetWrapper">
        <pre className="configurator-codesnippet">
          <code className="configurator-markup" dangerouslySetInnerHTML={{__html: this.codeString }} />
        </pre>
      </div>
    )
  }

  renderComplexState(){
    let codeSnippetWrapperClass =
      this.state.collapsed ? "codesnippet-wrapper constrainheight" : "codesnippet-wrapper expandheight";

      return (
        <div className={codeSnippetWrapperClass} ref="codesnippetWrapper">
          <pre className="configurator-codesnippet">
            <code className="configurator-markup" dangerouslySetInnerHTML={{__html: this.codeString}} />
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
