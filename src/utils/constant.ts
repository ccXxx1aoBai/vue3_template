export const MENU_FORM_ITEM = [
	{
		type: 'input',
		label: '菜单名称',
		prop: 'name',
		placeholder: '菜单名称',
		maxlength: 60,
	},
	{
		type: 'select',
		label: '菜单状态',
		prop: 'enabled',
		placeholder: '菜单状态',
		options: [
			{
				label: '正常',
				value: 1,
			},
			{
				label: '停用',
				value: 0,
			},
		],
	},
];

export const USER_FORM_ITEM = [
	{
		type: 'input',
		label: '姓名',
		prop: 'nickName',
		placeholder: '姓名',
		maxlength: 32,
	},
	{
		type: 'select',
		label: '用户状态',
		prop: 'state',
		placeholder: '用户状态',
		options: [
			{
				label: '正常',
				value: 1,
			},
			{
				label: '停用',
				value: 0,
			},
		],
	},
]

export const ROLE_FORM_ITEM = [
	{
		type: 'input',
		label: '角色名称',
		prop: 'roleName',
		placeholder: '角色名称',
		maxlength: 32,
	},
	{
		type: 'input',
		label: '角色标识',
		prop: 'roleKey',
		placeholder: '角色标识',
		maxlength: 32,
	},
]
