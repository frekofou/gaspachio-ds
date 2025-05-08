<template>
  <div 
    class="button-component" 
    :class="[
      `button-${type}`, 
      `button-${size}`, 
      `button-${shape}`,
      { 'button-disabled': disabled },
      { 'button-group': isGroup },
      { 'button-group-vertical': isGroup && layout === 'vertical' },
      { 'button-split': isSplit },
      { 'button-avatar-group': isAvatarGroup }
    ]"
  >
    <!-- Regular Button -->
    <button 
      v-if="!isGroup && !isSplit && !isAvatarGroup && !isNested"
      class="button"
      :class="{ 'has-icon': icon }"
      :disabled="disabled"
      @click="onClick"
    >
      <span v-if="icon" class="button-icon" v-html="iconHTML"></span>
      <span class="button-text">{{ content.text }}</span>
    </button>

    <!-- Button Group -->
    <template v-else-if="isGroup">
      <button 
        v-for="(button, index) in content.buttons" 
        :key="index"
        class="button group-button"
        :class="[
          `button-${button.type || type}`,
          { 'button-disabled': button.disabled || disabled }
        ]"
        :disabled="button.disabled || disabled"
        @click="onGroupButtonClick(button, index)"
      >
        <span v-if="button.icon" class="button-icon" v-html="getButtonIcon(button.icon)"></span>
        <span class="button-text">{{ button.text }}</span>
      </button>
    </template>

    <!-- Split Button -->
    <template v-else-if="isSplit">
      <button 
        class="button split-main"
        :disabled="disabled"
        @click="onClick"
      >
        <span class="button-text">{{ content.text }}</span>
      </button>
      <button 
        class="button split-dropdown"
        :disabled="disabled"
        @click="onDropdownClick"
      >
        <span class="button-icon" v-html="chevronDownIcon"></span>
      </button>
    </template>

    <!-- Nested Buttons -->
    <template v-else-if="isNested">
      <button 
        v-for="(button, index) in content.nestedButtons" 
        :key="index"
        class="button nested-button"
        :disabled="button.disabled || disabled"
        @click="onNestedButtonClick(button, index)"
      >
        <span class="button-text">{{ button.text }}</span>
      </button>
      <button 
        class="button nested-dropdown"
        :disabled="disabled"
        @click="onDropdownClick"
      >
        <span class="button-text">{{ content.dropdownText }}</span>
        <span class="button-icon" v-html="chevronDownIcon"></span>
      </button>
    </template>

    <!-- Avatar Group -->
    <template v-else-if="isAvatarGroup">
      <div 
        v-for="(avatar, index) in displayAvatars" 
        :key="index"
        class="avatar"
        @click="onAvatarClick(avatar, index)"
      >
        <img v-if="avatar.image" :src="avatar.image" :alt="avatar.name || 'Avatar'">
        <div v-else class="avatar-initials">{{ getInitials(avatar.name) }}</div>
      </div>
      <div v-if="hasMoreAvatars" class="avatar more-avatar">
        <div class="avatar-more">+{{ content.avatars.length - maxAvatars }}</div>
      </div>
    </template>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue';

export default {
  props: {
    content: { type: Object, required: true },
    uid: { type: String, required: true },
  },
  emits: ['trigger-event'],
  setup(props, { emit }) {
    // Editor state
    const isEditing = computed(() => {
      // eslint-disable-next-line no-unreachable
      return false;
    });

    // Component type
    const isGroup = computed(() => props.content?.isGroup === true);
    const isSplit = computed(() => props.content?.isSplit === true);
    const isNested = computed(() => props.content?.isNested === true);
    const isAvatarGroup = computed(() => props.content?.isAvatarGroup === true);

    // Button properties
    const type = computed(() => props.content?.type || 'solid');
    const size = computed(() => props.content?.size || 'default');
    const shape = computed(() => props.content?.shape || 'rounded');
    const disabled = computed(() => props.content?.disabled === true);
    const layout = computed(() => props.content?.layout || 'horizontal');
    const icon = computed(() => props.content?.icon);

    // Icon handling
    const iconHTML = ref('');
    const chevronDownIcon = ref('');
    
    watch(icon, async () => {
      if (icon.value) {
        const { getIcon } = wwLib.useIcons();
        iconHTML.value = await getIcon(icon.value);
      } else {
        iconHTML.value = '';
      }
    }, { immediate: true });

    // Initialize chevron down icon
    (async () => {
      const { getIcon } = wwLib.useIcons();
      chevronDownIcon.value = await getIcon('chevron-down');
    })();

    // Get icon for group buttons
    const getButtonIcon = async (iconName) => {
      if (!iconName) return '';
      const { getIcon } = wwLib.useIcons();
      return await getIcon(iconName);
    };

    // Avatar handling
    const maxAvatars = computed(() => props.content?.maxAvatars || 4);
    const displayAvatars = computed(() => {
      const avatars = props.content?.avatars || [];
      return avatars.slice(0, maxAvatars.value);
    });
    const hasMoreAvatars = computed(() => {
      const avatars = props.content?.avatars || [];
      return avatars.length > maxAvatars.value;
    });

    // Get initials from name
    const getInitials = (name) => {
      if (!name) return '';
      return name
        .split(' ')
        .map(part => part.charAt(0))
        .join('')
        .toUpperCase()
        .substring(0, 2);
    };

    // Internal variable for value
    const { value: internalValue, setValue: setInternalValue } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'value',
      type: 'string',
      defaultValue: '',
    });

    // Click handlers
    const onClick = (event) => {
      if (isEditing.value) return;
      
      setInternalValue(props.content?.value || props.content?.text || '');
      
      emit('trigger-event', {
        name: 'click',
        event: { value: props.content?.value || props.content?.text || '' }
      });
    };

    const onGroupButtonClick = (button, index) => {
      if (isEditing.value) return;
      
      setInternalValue(button.value || button.text || '');
      
      emit('trigger-event', {
        name: 'buttonClick',
        event: { 
          value: button.value || button.text || '',
          index,
          button
        }
      });
    };

    const onDropdownClick = (event) => {
      if (isEditing.value) return;
      
      emit('trigger-event', {
        name: 'dropdownClick',
        event: { value: 'dropdown' }
      });
    };

    const onNestedButtonClick = (button, index) => {
      if (isEditing.value) return;
      
      setInternalValue(button.value || button.text || '');
      
      emit('trigger-event', {
        name: 'nestedButtonClick',
        event: { 
          value: button.value || button.text || '',
          index,
          button
        }
      });
    };

    const onAvatarClick = (avatar, index) => {
      if (isEditing.value) return;
      
      emit('trigger-event', {
        name: 'avatarClick',
        event: { 
          value: avatar.value || avatar.name || '',
          index,
          avatar
        }
      });
    };

    return {
      // Properties
      type,
      size,
      shape,
      disabled,
      layout,
      icon,
      iconHTML,
      chevronDownIcon,
      isGroup,
      isSplit,
      isNested,
      isAvatarGroup,
      
      // Avatar related
      maxAvatars,
      displayAvatars,
      hasMoreAvatars,
      getInitials,
      
      // Methods
      onClick,
      onGroupButtonClick,
      onDropdownClick,
      onNestedButtonClick,
      onAvatarClick,
      getButtonIcon,
      
      // Internal state
      internalValue,
      setInternalValue,
      
      // Editor state
      isEditing
    };
  }
};
</script>

<style lang="scss" scoped>
.button-component {
  display: inline-flex;
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  
  // Button Group Styles
  &.button-group {
    display: inline-flex;
    
    .button {
      &:not(:first-child):not(:last-child) {
        border-radius: 0;
      }
      
      &:first-child {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      
      &:last-child {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
      
      &:not(:first-child) {
        margin-left: -1px;
      }
    }
    
    &.button-group-vertical {
      flex-direction: column;
      
      .button {
        &:not(:first-child):not(:last-child) {
          border-radius: 0;
        }
        
        &:first-child {
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }
        
        &:last-child {
          border-top-left-radius: 0;
          border-top-right-radius: 0;
        }
        
        &:not(:first-child) {
          margin-top: -1px;
          margin-left: 0;
        }
      }
    }
  }
  
  // Split Button Styles
  &.button-split {
    display: inline-flex;
    
    .split-main {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    
    .split-dropdown {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      padding: 0 8px;
      margin-left: -1px;
    }
  }
  
  // Avatar Group Styles
  &.button-avatar-group {
    display: inline-flex;
    
    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #e0e0e0;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border: 2px solid white;
      margin-left: -8px;
      cursor: pointer;
      position: relative;
      
      &:first-child {
        margin-left: 0;
      }
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .avatar-initials {
        font-size: 12px;
        font-weight: 600;
        color: #555;
      }
      
      &.more-avatar {
        background-color: #f0f0f0;
        
        .avatar-more {
          font-size: 12px;
          font-weight: 600;
          color: #555;
        }
      }
    }
  }
}

// Base Button Styles
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  text-align: center;
  line-height: 1.5;
  white-space: nowrap;
  
  &.has-icon {
    padding-left: 12px;
  }
  
  .button-icon {
    display: inline-flex;
    margin-right: 8px;
    
    :deep(svg) {
      width: 16px;
      height: 16px;
    }
  }
}

// Button Types
.button-solid .button {
  background-color: #4361ee;
  color: white;
  border-color: #4361ee;
  
  &:hover:not(:disabled) {
    background-color: #3a56d4;
    border-color: #3a56d4;
  }
  
  &:focus:not(:disabled) {
    box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.3);
    outline: none;
  }
}

.button-outline .button {
  background-color: transparent;
  color: #4361ee;
  border-color: #4361ee;
  
  &:hover:not(:disabled) {
    background-color: rgba(67, 97, 238, 0.05);
  }
  
  &:focus:not(:disabled) {
    box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
    outline: none;
  }
}

.button-soft .button {
  background-color: rgba(67, 97, 238, 0.1);
  color: #4361ee;
  border-color: transparent;
  
  &:hover:not(:disabled) {
    background-color: rgba(67, 97, 238, 0.2);
  }
  
  &:focus:not(:disabled) {
    box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
    outline: none;
  }
}

.button-white .button {
  background-color: white;
  color: #333;
  border-color: #e0e0e0;
  
  &:hover:not(:disabled) {
    background-color: #f8f8f8;
  }
  
  &:focus:not(:disabled) {
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
    outline: none;
  }
}

// Button Sizes
.button-sm .button {
  padding: 4px 12px;
  font-size: 12px;
}

.button-default .button {
  // Default size is already defined in base styles
}

.button-lg .button {
  padding: 10px 20px;
  font-size: 16px;
}

// Button Shapes
.button-rounded .button {
  border-radius: 6px;
}

.button-pilled .button {
  border-radius: 50px;
}

// Button States
.button-disabled .button,
.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}

// Nested Button Styles
.button-nested {
  display: inline-flex;
  
  .nested-button {
    border-radius: 0;
    
    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }
  }
  
  .nested-dropdown {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    
    .button-icon {
      margin-left: 4px;
      margin-right: 0;
    }
  }
}
</style>