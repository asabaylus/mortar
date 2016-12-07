'use strict';

import React from 'react';
import Prism from 'prismjs';


export default class CodeSnippet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
      dirty: true,
      shouldTruncate: false,
    }

    this.onClick = ::this.onClick;
  }

  onClick(e) {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  // Truncation logic
  shouldTruncate() {
    const mobileWidth  = 480,
          mobileValue  = 240,
          desktopValue = 320;

    // get window width & height of codesnippetWrapper
    const width = window.innerWidth,
          containerHeight = parseInt(window.getComputedStyle(this.codesnippetWrapper).height),
          isMobile = width < mobileWidth;

    // On small screens, truncate snippet when containerheight > 240px
    if (isMobile) {
      return containerHeight > mobileValue;

    // On large screens, truncate snippet when containerheight > 320px
    } else {
      return containerHeight > desktopValue;
    }
  }

  componentDidMount() {
    this.setState({
      collapsed: true,  // default is to collapse; if there's no need the button won't be shown anyways
      dirty: false,
      shouldTruncate: this.shouldTruncate(),
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dirty: true
    });
  }

  componentDidUpdate() {
    if (this.state.dirty) {
      this.setState({
        dirty: false,
        shouldTruncate: this.shouldTruncate(),
      })
    }
  }

  get codeString() {
    const { componentName, code } = this.props,
      hlCode = Prism.highlight(JSON.stringify(code, null, 2), Prism.languages.javascript);

    let start = `<div data-pestle-module="${componentName}">\n<script type="text/json" data-pestle-options>\n`,
        end = "\n</script>\n</div>";

    start = Prism.highlight(start, Prism.languages.markup);
    end = Prism.highlight(end, Prism.languages.markup);
    return start + hlCode + end;
  }

  renderSimpleState() {
    return (
      <div className="codesnippet-wrapper expandheight" ref={(ref) => {this.codesnippetWrapper = ref}}>
        <pre className="configurator-codesnippet">
          <code
            className="configurator-markup"
            dangerouslySetInnerHTML={{__html: this.codeString }} />
        </pre>
      </div>
    )
  }

  renderComplexState() {
    let codeSnippetWrapperClass =
      this.state.collapsed ? "codesnippet-wrapper constrainheight" : "codesnippet-wrapper expandheight";

    return (
      <div
        className={codeSnippetWrapperClass}
        ref={(ref) => {this.codesnippetWrapper = ref}}>

        <pre className="configurator-codesnippet">
          <code
            className="configurator-markup"
            dangerouslySetInnerHTML={{__html: this.codeString}} />
        </pre>

        {this.state.collapsed
          ? <button onClick={this.onClick} className="codesnippet-button mt3_col-12 mt3_h5 codesnippet-icon codesnippet-icon--expand">Expand</button>
          : <button onClick={this.onClick} className="codesnippet-button mt3_col-12 mt3_h5 codesnippet-icon codesnippet-icon--collapse">Collapse</button>}
      </div>
    )
  }

  render() {
    if (this.state.shouldTruncate === false) {
      return this.renderSimpleState();
    }
    return this.renderComplexState();
  }
}
