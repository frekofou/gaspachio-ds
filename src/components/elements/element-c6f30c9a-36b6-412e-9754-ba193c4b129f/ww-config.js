export default {
  options: {
    displayAllowedValues: ['flex', 'inline-flex'],
  },
  inherit: {
    type: 'ww-layout',
  },
  editor: {
    label: {
      en: 'Advanced Button',
    },
    icon: 'button',
  },
  properties: {
    // Button Type
    type: {
      label: { en: 'Type' },
      type: 'TextRadioGroup',
      section: 'settings',
      bindable: true,
      defaultValue: 'solid',
      options: {
        choices: [
          { value: 'solid', title: 'Solid', icon: 'background' },
          { value: 'outline', title: 'Outline', icon: 'options' },
          { value: 'soft', title: 'Soft', icon: 'color' },
          { value: 'white', title: 'White', icon: 'template' },
        ],
      },
    },
    
    // Button Size
    size: {
      label: { en: 'Size' },
      type: 'TextRadioGroup',
      section: 'settings',
      bindable: true,
      defaultValue: 'default',
      options: {
        choices: [
          { value: 'sm', title: 'Small', icon: 'zoom-out' },
          { value: 'default', title: 'Default', icon: 'options' },
          { value: 'lg', title: 'Large', icon: 'zoom-in' },
        ],
      },
    },
    
    // Button Shape
    shape: {
      label: { en: 'Shape' },
      type: 'TextRadioGroup',
      section: 'settings',
      bindable: true,
      defaultValue: 'rounded',
      options: {
        choices: [
          { value: 'rounded', title: 'Rounded', icon: 'object' },
          { value: 'pilled', title: 'Pilled', icon: 'pill' },
        ],
      },
    },
    
    // Button Text
    text: {
      label: { en: 'Text' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Button',
    },
    
    // Button Value
    value: {
      label: { en: 'Value' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: '',
    },
    
    // Button Icon
    icon: {
      label: { en: 'Icon' },
      type: 'SystemIcon',
      section: 'settings',
      bindable: true,
      defaultValue: null,
    },
    
    // Button State
    disabled: {
      label: { en: 'Disabled' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: false,
    },
    
    // Component Type
    isGroup: {
      label: { en: 'Is Button Group' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: false,
    },
    
    // Group Layout
    layout: {
      label: { en: 'Layout' },
      type: 'TextRadioGroup',
      section: 'settings',
      bindable: true,
      defaultValue: 'horizontal',
      options: {
        choices: [
          { value: 'horizontal', title: 'Horizontal', icon: 'align-left' },
          { value: 'vertical', title: 'Vertical', icon: 'align-top' },
        ],
      },
      hidden: content => !content.isGroup,
    },
    
    // Group Buttons
    buttons: {
      label: { en: 'Buttons' },
      type: 'Array',
      section: 'settings',
      bindable: true,
      defaultValue: [
        { text: 'Button 1', value: 'button1', type: null, disabled: false },
        { text: 'Button 2', value: 'button2', type: null, disabled: false },
        { text: 'Button 3', value: 'button3', type: null, disabled: false }
      ],
      options: {
        expandable: true,
        getItemLabel(item, index) {
          return item.text || `Button ${index + 1}`;
        },
        item: {
          type: 'Object',
          options: {
            item: {
              text: {
                label: 'Text',
                type: 'Text',
                options: { placeholder: 'Button text' }
              },
              value: {
                label: 'Value',
                type: 'Text',
                options: { placeholder: 'Button value' }
              },
              type: {
                label: 'Type',
                type: 'TextSelect',
                options: {
                  options: [
                    { value: null, label: 'Default' },
                    { value: 'solid', label: 'Solid' },
                    { value: 'outline', label: 'Outline' },
                    { value: 'soft', label: 'Soft' },
                    { value: 'white', label: 'White' }
                  ]
                }
              },
              icon: {
                label: 'Icon',
                type: 'SystemIcon'
              },
              disabled: {
                label: 'Disabled',
                type: 'OnOff'
              }
            }
          }
        }
      },
      hidden: content => !content.isGroup,
    },
    
    // Split Button
    isSplit: {
      label: { en: 'Is Split Button' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: false,
      hidden: content => content.isGroup || content.isNested || content.isAvatarGroup,
    },
    
    // Nested Button
    isNested: {
      label: { en: 'Is Nested Button' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: false,
      hidden: content => content.isGroup || content.isSplit || content.isAvatarGroup,
    },
    
    // Nested Buttons
    nestedButtons: {
      label: { en: 'Nested Buttons' },
      type: 'Array',
      section: 'settings',
      bindable: true,
      defaultValue: [
        { text: '1', value: '1', disabled: false },
        { text: '2', value: '2', disabled: false }
      ],
      options: {
        expandable: true,
        getItemLabel(item, index) {
          return item.text || `Button ${index + 1}`;
        },
        item: {
          type: 'Object',
          options: {
            item: {
              text: {
                label: 'Text',
                type: 'Text',
                options: { placeholder: 'Button text' }
              },
              value: {
                label: 'Value',
                type: 'Text',
                options: { placeholder: 'Button value' }
              },
              disabled: {
                label: 'Disabled',
                type: 'OnOff'
              }
            }
          }
        }
      },
      hidden: content => !content.isNested,
    },
    
    // Dropdown Text
    dropdownText: {
      label: { en: 'Dropdown Text' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Dropdown',
      hidden: content => !content.isNested,
    },
    
    // Avatar Group
    isAvatarGroup: {
      label: { en: 'Is Avatar Group' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: false,
      hidden: content => content.isGroup || content.isSplit || content.isNested,
    },
    
    // Avatars
    avatars: {
      label: { en: 'Avatars' },
      type: 'Array',
      section: 'settings',
      bindable: true,
      defaultValue: [
        { name: 'John Doe', image: 'https://i.pravatar.cc/150?img=1', value: 'user1' },
        { name: 'Jane Smith', image: 'https://i.pravatar.cc/150?img=2', value: 'user2' },
        { name: 'Bob Johnson', image: 'https://i.pravatar.cc/150?img=3', value: 'user3' },
        { name: 'Alice Brown', image: 'https://i.pravatar.cc/150?img=4', value: 'user4' },
        { name: 'Charlie Wilson', image: 'https://i.pravatar.cc/150?img=5', value: 'user5' }
      ],
      options: {
        expandable: true,
        getItemLabel(item, index) {
          return item.name || `Avatar ${index + 1}`;
        },
        item: {
          type: 'Object',
          options: {
            
item: {
name: {
label: 'Name',
type: 'Text',
options: { placeholder: 'User name' }
},
image: {
label: 'Image',
type: 'Image'
},
value: {
label: 'Value',
type: 'Text',
options: { placeholder: 'Avatar value' }
}
}
}
}
},
hidden: content => !content.isAvatarGroup,
},

// Max Avatars
maxAvatars: {
label: { en: 'Max Avatars' },
type: 'Number',
section: 'settings',
bindable: true,
defaultValue: 4,
options: {
min: 1,
max: 10,
step: 1
},
hidden: content => !content.isAvatarGroup,
},

// Initial Value (for form compatibility)
initialValue: {
label: { en: 'Initial value' },
type: 'Text',
bindable: true,
section: 'settings',
defaultValue: '',
},
},
triggerEvents: [
{ name: 'click', label: { en: 'On click' }, event: { value: '' } },
{ name: 'buttonClick', label: { en: 'On group button click' }, event: { value: '', index: 0, button: {} } },
{ name: 'dropdownClick', label: { en: 'On dropdown click' }, event: { value: 'dropdown' } },
{ name: 'nestedButtonClick', label: { en: 'On nested button click' }, event: { value: '', index: 0, button: {} } },
{ name: 'avatarClick', label: { en: 'On avatar click' }, event: { value: '', index: 0, avatar: {} } },
{ name: 'change', label: { en: 'On change' }, event: { value: '' }, default: true },
{ name: 'initValueChange', label: { en: 'On init value change' }, event: { value: '' } },
],
actions: [
{
label: { en: 'Set value' },
action: 'setValue',
args: [
{
name: 'value',
type: 'string'
}
]
}
]
};