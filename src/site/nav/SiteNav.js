import React, {Component}  from 'react';
import {render as DOMrender} from 'react-dom';
import {zip} from 'lodash';
import Modal from '../../modules/modals/Modal';

export default class SiteNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    }

    this.toggleVisibility = ::this.toggleVisibility;
  }

  toggleVisibility() {
    this.setState({
      visible: !this.state.visible,
    })
  }

  renderModal() {
    const navLink = document.querySelectorAll('a.navlink');

    const anchor = Array.from(navLink).map(i => i.href);
    const navText = Array.from(navLink).map(i => i.textContent);

    const items = zip(navText, anchor);

    const listItems = items.map(item => {
      const [text, anchor] = item;
      return (
        <li key={text} className="mt3_col-gut-lg navlist-modal--item">
          <a href={anchor} className="navlist-modal--link">{text}</a>
        </li>
      )
    });

    return (
      <Modal onClose={this.toggleVisibility} renderNGSModal={this.state.visible}>
        <nav className="navcontainer">
          <ul className="navlist-modal mt3_color--gray--40">
            {listItems}
          </ul>
        </nav>
      </Modal>
    )
  }

  render() {
    return (
      <div>
        <div className="navicon mt3_col-gut" onClick={this.toggleVisibility}>
          <svg className="mt3_icon">
            <use xlinkHref="#menu"></use>
          </svg>
        </div>
        {this.renderModal()}
      </div>
    )
  }
}

window.mortarSite = window.mortarSite || {};
window.mortarSite.renderSiteNav = function (el) {
  if (!el) {
    return;
  }

  DOMrender(<SiteNav />, el);
}
