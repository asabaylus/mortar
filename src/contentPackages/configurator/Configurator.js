'use strict';

import React from 'react';

class Configurator extends React.Component {
    updateCodeSnippet(){
      // We're re-using the existing jQuery code for consistency.
      // Maybe one day this will all be done in React?

      var expButton = '<button class="codesnippet-button codesnippet-icon codesnippet-icon--expand mt3_col-12 mt3_h5">Expand</button>';

      $('.codesnippet-wrapper').each(function(index, value) {
        var container = $(value);
        var isMobile = $(window).width() <= 500;
        var showExpandButton = false;
        var constrainClass = '';

        // On large screens, truncate snippet when container > 320px & display expand button
        if (!isMobile && container.height() >= 320){
          showExpandButton = true;
          constrainClass = 'constrainheight';
        }

        // On small screens, truncate snippet when container > 240px & display expand button
        if (isMobile && container.height() >= 240){
          showExpandButton = true;
          constrainClass = 'constrainheight-mobile';
        }

        if (showExpandButton) {
          container.addClass(constrainClass)
            .removeClass('expandheight')
            .data('expanded', false)
            .append(expButton);
        }
      });

      // Expand the div when the button is clicked
      $('.codesnippet-button').click(function(e){
        var btn = $(e.target);
        var snippetContainer = btn.parent('.codesnippet-wrapper');

        var isMobile = $(window).width() <= 500;
        var constrainClass = isMobile ? 'constrainheight-mobile' : 'constrainheight';

        // Update styles
        if (snippetContainer.data('expanded') == true) {
            snippetContainer.addClass(constrainClass)
              .removeClass('expandheight')
              .data('expanded', false);
            $(this).text('Expand')
              .addClass('codesnippet-icon--expand')
              .removeClass('codesnippet-icon--collapse');
         }
         else {
            snippetContainer.removeClass(constrainClass)
              .addClass('expandheight')
              .data('expanded', true);
            $(this).text('Collapse')
              .addClass('codesnippet-icon--collapse')
              .removeClass('codesnippet-icon--expand');
         }
      });
    }

    componentDidMount(){
        this.updateCodeSnippet();
    }
    componentDidUpdate(){
        this.updateCodeSnippet();
    }

    render(){
        let {children, component} = this.props;

        return (
          <div>
            <fieldset className="mt3_bordercolor--gray40 mt3_row-gut-1 configurator__configuration">
              <h5 className="mt3_h5">Configuration</h5>
              {children}
            </fieldset>
            <fieldset className="mt3_bordercolor--gray40 mt3_row-gut-1 configurator__result">
              <h5 className="mt3_h5">Result</h5>
              {component}
            </fieldset>
            <fieldset className="mt3_bordercolor--gray40 configurator__properties">
              <h5 className="mt3_h5">Properties</h5>
              <div className="codesnippet-wrapper">
                <pre className="codesnippet"><code className="language-markup">
                    &lt;script&gt;
                      {JSON.stringify(component.props, null, 2)}
                    &lt;/script&gt;
                </code></pre>
              </div>
            </fieldset>
          </div>
        )
    }
}

export default Configurator;
