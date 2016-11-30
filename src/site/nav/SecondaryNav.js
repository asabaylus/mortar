import React, { Component }  from 'react';
import { render as DOMrender } from 'react-dom';
import { zip } from 'lodash';

export default class SecondaryNav extends Component {
  render() {
    const navText = Array.from(document.querySelectorAll("h3.mt3_h3"))
                          .map(i => i.textContent.replace('In Development', ''));
    const navAnchors = Array.from(document.querySelectorAll(".anchor-link"))
                            .map(i => i.name);

    const items = zip(navText, navAnchors);

    const listItems = items.map(item => {
      const [text, anchor] = item;
      return (
        <li key={anchor} className="secondarynav-list-item mt3_row-gut-half">
          <a className="secondarynav-item-link"
            href={"#" + anchor}>
            {text}
          </a>
        </li>
      )
    });

    return (
      <div className="mt3_col-lg-3 secondarynav mt3_subh4">
        <ul className="secondarynav-list">
          {listItems}
        </ul>
      </div>
    )
  }
}

window.mortarSite = {
  renderSecondaryNavigation: function(el){
    DOMrender(<SecondaryNav />, el);
  }
}
