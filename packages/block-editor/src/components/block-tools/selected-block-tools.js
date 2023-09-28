/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useRef, useEffect } from '@wordpress/element';
import { isUnmodifiedDefaultBlock } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';
import { useViewportMatch } from '@wordpress/compose';
import { useShortcut } from '@wordpress/keyboard-shortcuts';
import { getScrollContainer } from '@wordpress/dom';

/**
 * Internal dependencies
 */
import BlockSelectionButton from './block-selection-button';
import BlockContextualToolbar from './block-contextual-toolbar';
import { store as blockEditorStore } from '../../store';
import BlockPopover from '../block-popover';
import useBlockToolbarPopoverProps from './use-block-toolbar-popover-props';
import { useShouldContextualToolbarShow } from '../../utils/use-should-contextual-toolbar-show';

function selector( select ) {
	const {
		__unstableGetEditorMode,
		hasMultiSelection,
		isTyping,
		getLastMultiSelectedBlockClientId,
	} = select( blockEditorStore );

	return {
		editorMode: __unstableGetEditorMode(),
		hasMultiSelection: hasMultiSelection(),
		isTyping: isTyping(),
		lastClientId: hasMultiSelection()
			? getLastMultiSelectedBlockClientId()
			: null,
	};
}

function SelectedBlockTools( {
	clientId,
	rootClientId,
	isEmptyDefaultBlock,
	isFixed,
	capturingClientId,
} ) {
	const isLargeViewport = useViewportMatch( 'medium' );
	const { editorMode, hasMultiSelection, isTyping, lastClientId } = useSelect(
		selector,
		[]
	);

	const isInsertionPointVisible = useSelect(
		( select ) => {
			const {
				isBlockInsertionPointVisible,
				getBlockInsertionPoint,
				getBlockOrder,
			} = select( blockEditorStore );

			if ( ! isBlockInsertionPointVisible() ) {
				return false;
			}

			const insertionPoint = getBlockInsertionPoint();
			const order = getBlockOrder( insertionPoint.rootClientId );
			return order[ insertionPoint.index ] === clientId;
		},
		[ clientId ]
	);
	const isToolbarForced = useRef( false );
	const { shouldShowContextualToolbar, canFocusHiddenToolbar } =
		useShouldContextualToolbarShow();

	const { stopTyping } = useDispatch( blockEditorStore );

	const showEmptyBlockSideInserter =
		! isTyping && editorMode === 'edit' && isEmptyDefaultBlock;
	const shouldShowBreadcrumb =
		! hasMultiSelection &&
		( editorMode === 'navigation' || editorMode === 'zoom-out' );

	useShortcut(
		'core/block-editor/focus-toolbar',
		() => {
			isToolbarForced.current = true;
			stopTyping( true );
		},
		{
			isDisabled: ! canFocusHiddenToolbar,
		}
	);

	useEffect( () => {
		isToolbarForced.current = false;
	} );

	// Stores the active toolbar item index so the block toolbar can return focus
	// to it when re-mounting.
	const initialToolbarItemIndexRef = useRef();

	useEffect( () => {
		// Resets the index whenever the active block changes so this is not
		// persisted. See https://github.com/WordPress/gutenberg/pull/25760#issuecomment-717906169
		initialToolbarItemIndexRef.current = undefined;
	}, [ clientId ] );

	const popoverProps = useBlockToolbarPopoverProps( {
		contentElement: getScrollContainer(), // This is what useBlockToolbarPopoverProps does when the contentRef is undefined. This likely works by accident. It was being passed in via the BlockTools
		clientId,
	} );

	if ( isFixed || ! isLargeViewport ) {
		return (
			<BlockContextualToolbar
				// Needs to be passed as `true` so it can be set fixed smaller screens as well
				isFixed={ true }
				__experimentalInitialIndex={
					initialToolbarItemIndexRef.current
				}
				__experimentalOnIndexChange={ ( index ) => {
					initialToolbarItemIndexRef.current = index;
				} }
				// Resets the index whenever the active block changes so
				// this is not persisted. See https://github.com/WordPress/gutenberg/pull/25760#issuecomment-717906169
				key={ clientId }
			/>
		);
	}

	if ( showEmptyBlockSideInserter ) {
		return null;
	}

	if ( shouldShowBreadcrumb || shouldShowContextualToolbar ) {
		return (
			<BlockPopover
				clientId={ capturingClientId || clientId }
				bottomClientId={ lastClientId }
				className={ classnames(
					'block-editor-block-list__block-popover',
					{
						'is-insertion-point-visible': isInsertionPointVisible,
					}
				) }
				resize={ false }
				{ ...popoverProps }
			>
				{ shouldShowContextualToolbar && (
					<BlockContextualToolbar
						// If the toolbar is being shown because of being forced
						// it should focus the toolbar right after the mount.
						focusOnMount={ isToolbarForced.current }
						__experimentalInitialIndex={
							initialToolbarItemIndexRef.current
						}
						__experimentalOnIndexChange={ ( index ) => {
							initialToolbarItemIndexRef.current = index;
						} }
						// Resets the index whenever the active block changes so
						// this is not persisted. See https://github.com/WordPress/gutenberg/pull/25760#issuecomment-717906169
						key={ clientId }
					/>
				) }
				{ shouldShowBreadcrumb && (
					<BlockSelectionButton
						clientId={ clientId }
						rootClientId={ rootClientId }
					/>
				) }
			</BlockPopover>
		);
	}

	return null;
}

function wrapperSelector( select ) {
	const {
		getSelectedBlockClientId,
		getFirstMultiSelectedBlockClientId,
		getBlockRootClientId,
		getBlock,
		getBlockParents,
		__experimentalGetBlockListSettingsForBlocks,
	} = select( blockEditorStore );

	const clientId =
		getSelectedBlockClientId() || getFirstMultiSelectedBlockClientId();

	if ( ! clientId ) {
		return;
	}

	const { name, attributes = {} } = getBlock( clientId ) || {};
	const blockParentsClientIds = getBlockParents( clientId );

	// Get Block List Settings for all ancestors of the current Block clientId.
	const parentBlockListSettings = __experimentalGetBlockListSettingsForBlocks(
		blockParentsClientIds
	);

	// Get the clientId of the topmost parent with the capture toolbars setting.
	const capturingClientId = blockParentsClientIds.find(
		( parentClientId ) =>
			parentBlockListSettings[ parentClientId ]
				?.__experimentalCaptureToolbars
	);

	return {
		clientId,
		rootClientId: getBlockRootClientId( clientId ),
		name,
		isEmptyDefaultBlock:
			name && isUnmodifiedDefaultBlock( { name, attributes } ),
		capturingClientId,
	};
}

export default function WrappedSelectedBlockTools( { isFixed } ) {
	const selected = useSelect( wrapperSelector, [] );

	if ( ! selected ) {
		return null;
	}

	const {
		clientId,
		rootClientId,
		name,
		isEmptyDefaultBlock,
		capturingClientId,
	} = selected;

	if ( ! name ) {
		return null;
	}

	return (
		<SelectedBlockTools
			clientId={ clientId }
			rootClientId={ rootClientId }
			isEmptyDefaultBlock={ isEmptyDefaultBlock }
			isFixed={ isFixed }
			capturingClientId={ capturingClientId }
		/>
	);
}
