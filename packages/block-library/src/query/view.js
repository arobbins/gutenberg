/**
 * WordPress dependencies
 */
import { store, navigate, prefetch } from '@wordpress/interactivity';

const isValidLink = ( ref ) =>
	ref &&
	ref instanceof window.HTMLAnchorElement &&
	ref.href &&
	( ! ref.target || ref.target === '_self' ) &&
	ref.origin === window.location.origin;

const isValidEvent = ( event ) =>
	event.button === 0 && // left clicks only
	! event.metaKey && // open in new tab (mac)
	! event.ctrlKey && // open in new tab (windows)
	! event.altKey && // download
	! event.shiftKey &&
	! event.defaultPrevented;

const getVisibility = ( element ) => {
	const { innerWidth, innerHeight } = window;
	const rect = element.getBoundingClientRect();

	// Completely outside.
	if (
		rect.x > innerWidth ||
		rect.x + rect.width < 0 ||
		rect.y > innerHeight ||
		rect.y + rect.height < 0
	) {
		return 'none';
	}

	// Completely inside.
	if (
		rect.x + rect.width <= innerWidth &&
		rect.x >= 0 &&
		rect.y + rect.height <= innerHeight &&
		rect.y >= 0
	) {
		return 'total';
	}

	return 'partial';
};

store( {
	selectors: {
		core: {
			query: {
				startAnimation: ( { context } ) =>
					context.core.query.animation === 'start',
				finishAnimation: ( { context } ) =>
					context.core.query.animation === 'finish',
			},
		},
	},
	actions: {
		core: {
			query: {
				navigate: async ( { event, ref, context } ) => {
					if ( isValidLink( ref ) && isValidEvent( event ) ) {
						event.preventDefault();

						const id = ref.closest( '[data-wp-navigation-id]' )
							.dataset.wpNavigationId;

						// Don't announce the navigation immediately, wait 300 ms.
						const timeout = setTimeout( () => {
							context.core.query.message =
								context.core.query.loadingText;
							context.core.query.animation = 'start';
						}, 400 );

						await navigate( ref.href );

						// Dismiss loading message if it hasn't been added yet.
						clearTimeout( timeout );

						// Announce that the page has been loaded. If the message is the
						// same, we use a no-break space similar to the @wordpress/a11y
						// package: https://github.com/WordPress/gutenberg/blob/c395242b8e6ee20f8b06c199e4fc2920d7018af1/packages/a11y/src/filter-message.js#L20-L26
						context.core.query.message =
							context.core.query.loadedText +
							( context.core.query.message ===
							context.core.query.loadedText
								? '\u00A0'
								: '' );

						context.core.query.animation = 'finish';

						// Focus the first anchor of the Query block.
						const firstAnchor = document.querySelector(
							`[data-wp-navigation-id=${ id }] a[href]`
						);
						if ( firstAnchor ) {
							firstAnchor.focus( { preventScroll: true } );
							const visibility = getVisibility( firstAnchor );
							if ( visibility !== 'total' ) {
								const block =
									visibility === 'none'
										? 'center'
										: 'nearest';

								firstAnchor.scrollIntoView( {
									behavior: 'smooth',
									block,
								} );
							}
						}
					}
				},
				prefetch: async ( { ref } ) => {
					if ( isValidLink( ref ) ) {
						await prefetch( ref.href );
					}
				},
			},
		},
	},
} );
