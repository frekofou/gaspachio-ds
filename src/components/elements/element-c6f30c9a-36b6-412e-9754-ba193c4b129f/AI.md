---
name: advanced-button
description: A highly customizable button component with support for various styles, states, sizes, and layouts including button groups, split buttons, and avatar groups
keywords: button, button group, split button, avatar group, nested button, UI component, interactive
---

#### Advanced Button

Properties:
- `type`: `'solid' | 'outline' | 'soft' | 'white'` - Visual style of the button. Default: `'solid'`
- `size`: `'sm' | 'default' | 'lg'` - Size of the button. Default: `'default'`
- `shape`: `'rounded' | 'pilled'` - Corner style of the button. Default: `'rounded'`
- `text`: `string` - Text displayed on the button. Default: `'Button'`
- `value`: `string` - Value emitted when button is clicked. Default: `''` (uses text if empty)
- `icon`: `string` - System icon to display before text. Default: `null`
- `disabled`: `boolean` - Whether the button is disabled. Default: `false`

Button Group Properties:
- `isGroup`: `boolean` - Enables button group mode. Default: `false`
- `layout`: `'horizontal' | 'vertical'` - Orientation of button group. Default: `'horizontal'`
- `buttons`: `Array<{text: string, value: string, type: string, icon: string, disabled: boolean}>` - Buttons in the group. Default: `[{text: 'Button 1'}, {text: 'Button 2'}, {text: 'Button 3'}]`

Split Button Properties:
- `isSplit`: `boolean` - Enables split button mode. Default: `false`

Nested Button Properties:
- `isNested`: `boolean` - Enables nested button mode. Default: `false`
- `nestedButtons`: `Array<{text: string, value: string, disabled: boolean}>` - Buttons in the nested group. Default: `[{text: '1'}, {text: '2'}]`
- `dropdownText`: `string` - Text for dropdown button. Default: `'Dropdown'`

Avatar Group Properties:
- `isAvatarGroup`: `boolean` - Enables avatar group mode. Default: `false`
- `avatars`: `Array<{name: string, image: string, value: string}>` - Avatars in the group. Default: `[5 sample avatars]`
- `maxAvatars`: `number` - Maximum number of avatars to display. Default: `4`

Form Properties:
- `initialValue`: `string` - Initial value for form integration. Default: `''`

Events:
- `click`: {value: string} - Triggered when button is clicked
- `buttonClick`: {value: string, index: number, button: object} - Triggered when a button in a group is clicked
- `dropdownClick`: {value: 'dropdown'} - Triggered when dropdown part of split button is clicked
- `nestedButtonClick`: {value: string, index: number, button: object} - Triggered when a nested button is clicked
- `avatarClick`: {value: string, index: number, avatar: object} - Triggered when an avatar is clicked
- `change`: {value: string} - Triggered when button value changes (for form integration)
- `initValueChange`: {value: string} - Triggered when initial value changes

Actions:
- `setValue`: Sets the button value. Args: value (string)

Variables:
- `value`: string - Current value of the button component

Special features:
- Supports multiple button types: solid, outline, soft, white
- Supports different states: default, hover, focus, disabled
- Supports different sizes: small, default, large
- Supports different shapes: rounded, pilled
- Can be configured as a button group with horizontal or vertical layout
- Can be configured as a split button with main action and dropdown
- Can be configured as a nested button with multiple options
- Can be configured as an avatar group with customizable max display count
- Fully customizable with various styling options
- Integrates with WeWeb form system through value and initialValue