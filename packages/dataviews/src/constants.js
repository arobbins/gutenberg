/**
 * WordPress dependencies
 */
import { __, isRTL } from '@wordpress/i18n';
import {
	blockTable,
	category,
	formatListBullets,
	formatListBulletsRTL,
} from '@wordpress/icons';

/**
 * Internal dependencies
 */
import ViewTable from './view-table';
import ViewGrid from './view-grid';
import ViewList from './view-list';

// Field types.
export const ENUMERATION_TYPE = 'enumeration';

// Filter operators.
export const OPERATOR_IN = 'in';
export const OPERATOR_NOT_IN = 'notIn';

// View layouts.
export const LAYOUT_TABLE = 'table';
export const LAYOUT_GRID = 'grid';
export const LAYOUT_LIST = 'list';

export const VIEW_LAYOUTS = [
	{
		type: LAYOUT_TABLE,
		label: __( 'Table' ),
		component: ViewTable,
		icon: blockTable,
	},
	{
		type: LAYOUT_GRID,
		label: __( 'Grid' ),
		component: ViewGrid,
		icon: category,
	},
	{
		type: LAYOUT_LIST,
		label: __( 'List' ),
		component: ViewList,
		icon: isRTL() ? formatListBulletsRTL : formatListBullets,
	},
];
