import cx from 'classnames';
import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import throttle from 'lodash/throttle';
import zip from 'lodash/zip';

const SECONDARY_NAV_FIXED_TOP = 90; // px

export default class SecondaryNav extends Component {
  constructor(props) {
    super(props);

    this.setStickyMenu = ::this.setStickyMenu;
    this.handleStickyMenu = throttle(this.setStickyMenu, 50);

    this.state = {
      fixed: false,
    };
  }

  componentDidMount() {
    if(!this.props.sticky) {
      return;
    }

    this.secondaryNavEl = ReactDOM.findDOMNode(this);
    this.secondaryNavTop = this.secondaryNavEl.getBoundingClientRect().top;

    window.addEventListener('scroll', this.handleStickyMenu);
    this.setStickyMenu();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleStickyMenu);
  }

  render() {
    const navText = Array.from(document.querySelectorAll("h3.mt3_heading--h4--2"))
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

    const secondaryNavClass = cx(
      'mt3_col-lg-3',
      'secondarynav',
      'mt3_subh4', {
      'secondarynav-sticky': this.state.fixed
    });

    return (
      <div className={secondaryNavClass}>
        <ul className="secondarynav-list">
          {listItems}
        </ul>
      </div>
    )
  }

  setStickyMenu() {
    const windowTop = window.pageYOffset;
    const isFixed = windowTop + SECONDARY_NAV_FIXED_TOP > this.secondaryNavTop;

    this.setState({
      fixed: isFixed,
    });

    /*if (windowTop + SECONDARY_NAV_FIXED_TOP > this.secondaryNavTop) {
      Object.assign(this.secondaryNavEl.style, {
        position: 'fixed',
        top: SECONDARY_NAV_FIXED_TOP + 'px'
      });
    } else {
      Object.assign(this.secondaryNavEl.style, {
        position: 'relative',
        top: ''
      });
    }*/
  }
}

window.mortarSite = window.mortarSite || {};
window.mortarSite.renderSecondaryNavigation = function(el) {
  if (!el) {
    return;
  }

  if (el.classList.contains('secondary-nav-sticky')) {
    ReactDOM.render(<SecondaryNav sticky />, el);
  } else {
    ReactDOM.render(<SecondaryNav />, el);
  }
}
