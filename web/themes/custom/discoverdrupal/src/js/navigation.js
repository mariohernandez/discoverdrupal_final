!((document, Drupal, $) => {
  'use strict';

  /**
   * Use this to describe what your behavior does.
   */
  Drupal.behaviors.navigationToggle = {

    attach: function(context) {
      /**
       * Bind open/close action to list containers.
       * @param {string} container - List conteainer.
       * @param {string} toggle - Trigger button.
       * @param {context} context - Drupal context.
       * @returns {void}
       */
      function navToggle(container, toggle, context) {
        const $container = $(container, context);
        const $button = $container.find(toggle);

        $container.each(function() {
          const $navContainer = $(this);
          $navContainer.find(toggle).on('click', function() {
            const $self = $(this);
            // Removes the 'is-open' class from all lists except the one
            // we are currently clicking on.
            $navContainer.toggleClass('is-open');

            $button.not($self).attr('aria-expanded', 'false');

            $self.attr('aria-expanded', 'true');
          });
        });
      }

      // Bind the function to the parent list.
      navToggle('.discoverdrupal__navigation', '.navigation__toggle', context);
    }
  };
})(document, Drupal, jQuery);
