/**
 * Internal dependencies
 */
import * as globalStyles from './components/global-styles';
import { ExperimentalBlockEditorProvider } from './components/provider';
import { lock } from './lock-unlock';
import { getRichTextValues } from './components/rich-text/get-rich-text-values';
import { kebabCase } from './utils/object';
import ResizableBoxPopover from './components/resizable-box-popover';
import { ComposedPrivateInserter as PrivateInserter } from './components/inserter';
import { PrivateListView } from './components/list-view';
import BlockInfo from './components/block-info-slot-fill';
import { useShouldContextualToolbarShow } from './utils/use-should-contextual-toolbar-show';
import { cleanEmptyObject, useStyleOverride } from './hooks/utils';
import BlockQuickNavigation from './components/block-quick-navigation';
import { LayoutStyle } from './components/block-list/layout';
import { BlockRemovalWarningModal } from './components/block-removal-warning-modal';
import { useLayoutClasses, useLayoutStyles } from './hooks';
import DimensionsTool from './components/dimensions-tool';
import ResolutionTool from './components/resolution-tool';
import {
	default as ReusableBlocksRenameHint,
	useReusableBlocksRenameHint,
} from './components/inserter/reusable-block-rename-hint';
import { usesContextKey } from './components/rich-text/format-edit';
import { ExperimentalBlockCanvas } from './components/block-canvas';
import { getDuotoneFilter } from './components/duotone/utils';

/**
 * Private @wordpress/block-editor APIs.
 */
export const privateApis = {};
lock( privateApis, {
	...globalStyles,
	ExperimentalBlockCanvas,
	ExperimentalBlockEditorProvider,
	getDuotoneFilter,
	getRichTextValues,
	kebabCase,
	PrivateInserter,
	PrivateListView,
	ResizableBoxPopover,
	BlockInfo,
	useShouldContextualToolbarShow,
	cleanEmptyObject,
	useStyleOverride,
	BlockQuickNavigation,
	LayoutStyle,
	BlockRemovalWarningModal,
	useLayoutClasses,
	useLayoutStyles,
	DimensionsTool,
	ResolutionTool,
	ReusableBlocksRenameHint,
	useReusableBlocksRenameHint,
	usesContextKey,
} );
