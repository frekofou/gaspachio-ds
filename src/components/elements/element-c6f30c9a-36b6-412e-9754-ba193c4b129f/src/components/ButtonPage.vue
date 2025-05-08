<template>
<div class="button-page">
  <!-- Header -->
  <div class="header">
    <div class="components-badge">Components</div>
    <div class="preline-logo">
      <img src="https://preline.co/assets/svg/logos/logo.svg" alt="Preline" />
    </div>
  </div>

  <!-- Title Section -->
  <div class="title-section">
    <h1>Button Group</h1>
    <div class="global-component-badge">
      <span class="dot"></span>
      Global Component
    </div>
    <p class="description">Group a series of buttons together on a single line or stack them in a vertical column.</p>
  </div>

  <!-- Types Section -->
  <div class="section">
    <h2>Types</h2>
    
    <div class="types-grid">
      <!-- Solid -->
      <div class="type-container">
        <div class="type-label">Solid</div>
        <div class="button-container solid-container">
          <div class="button-group">
            <button class="button solid">Button</button>
            <button class="button solid">Button</button>
            <button class="button solid">Button</button>
          </div>
        </div>
      </div>
      
      <!-- Outline -->
      <div class="type-container">
        <div class="type-label">Outline</div>
        <div class="button-container">
          <div class="button-group">
            <button class="button outline">Button</button>
            <button class="button outline">Button</button>
            <button class="button outline">Button</button>
          </div>
        </div>
      </div>
      
      <!-- Soft -->
      <div class="type-container">
        <div class="type-label">Soft</div>
        <div class="button-container soft-container">
          <div class="button-group">
            <button class="button soft">Button</button>
            <button class="button soft">Button</button>
            <button class="button soft">Button</button>
          </div>
        </div>
      </div>
      
      <!-- White -->
      <div class="type-container">
        <div class="type-label">White</div>
        <div class="button-container white-container">
          <div class="button-group">
            <button class="button white">Button</button>
            <button class="button white">Button</button>
            <button class="button white">Button</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- States Section -->
  <div class="section">
    <h2>States</h2>
    
    <div class="types-grid">
      <!-- Default -->
      <div class="type-container">
        <div class="type-label">Default</div>
        <div class="button-container">
          <div class="button-group">
            <button class="button solid">Button</button>
            <button class="button solid">Button</button>
            <button class="button solid">Button</button>
          </div>
        </div>
      </div>
      
      <!-- Hover -->
      <div class="type-container">
        <div class="type-label">Hover</div>
        <div class="button-container">
          <div class="button-group">
            <button class="button solid">Button</button>
            <button class="button solid hover">Button</button>
            <button class="button solid">Button</button>
          </div>
        </div>
      </div>
      
      <!-- Focus -->
      <div class="type-container">
        <div class="type-label">Focus</div>
        <div class="button-container">
          <div class="button-group">
            <button class="button solid">Button</button>
            <button class="button solid focus">Button</button>
            <button class="button solid">Button</button>
          </div>
        </div>
      </div>
      
      <!-- Disabled -->
      <div class="type-container">
        <div class="type-label">Disabled</div>
        <div class="button-container">
          <div class="button-group">
            <button class="button solid">Button</button>
            <button class="button solid">Button</button>
            <button class="button solid disabled">Button</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Sizes Section -->
  <div class="section">
    <h2>Sizes</h2>
    
    <div class="types-grid">
      <!-- Small -->
      <div class="type-container">
        <div class="type-label">Small</div>
        <div class="button-container">
          <div class="button-group">
            <button class="button solid small">Button-sm</button>
            <button class="button solid small">Button-sm</button>
            <button class="button solid small">Button-sm</button>
          </div>
        </div>
      </div>
      
      <!-- Default -->
      <div class="type-container">
        <div class="type-label">Default</div>
        <div class="button-container">
          <div class="button-group">
            <button class="button solid">Button</button>
            <button class="button solid">Button</button>
            <button class="button solid">Button</button>
          </div>
        </div>
      </div>
      
      <!-- Large -->
      <div class="type-container">
        <div class="type-label">Large</div>
        <div class="button-container">
          <div class="button-group">
            <button class="button solid large">Button-lg</button>
            <button class="button solid large">Button-lg</button>
            <button class="button solid large">Button-lg</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Shapes Section -->
  <div class="section">
    <h2>Shapes</h2>
    
    <div class="types-grid">
      <!-- Rounded (Default) -->
      <div class="type-container">
        <div class="type-label">Rounded (Default)</div>
        <div class="button-container">
          <div class="button-group">
            <button class="button solid">Button</button>
            <button class="button solid">Button</button>
            <button class="button solid">Button</button>
          </div>
        </div>
      </div>
      
      <!-- Pilled -->
      <div class="type-container">
        <div class="type-label">Pilled</div>
        <div class="button-container">
          <div class="button-group">
            <button class="button solid pilled">Button</button>
            <button class="button solid pilled">Button</button>
            <button class="button solid pilled">Button</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Examples Section -->
  <div class="section">
    <h2>Examples</h2>
    
    <div class="examples-grid">
      <!-- Split Button -->
      <div class="example-container">
        <div class="example-label">Split Button</div>
        <div class="example-content">
          <div class="split-button">
            <button class="button solid">Action</button>
            <button class="button solid dropdown-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
              </svg>
            </button>
          </div>
          
          <div class="split-button outline-split">
            <button class="button outline">Action</button>
            <button class="button outline dropdown-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Nesting -->
      <div class="example-container">
        <div class="example-label">Nesting</div>
        <div class="example-content">
          <div class="nested-button-group">
            <button class="button solid">1</button>
            <button class="button solid">2</button>
            <button class="button solid dropdown-button">
              Dropdown
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
              </svg>
            </button>
          </div>
          
          <div class="nested-button-group outline-nested">
            <button class="button outline">1</button>
            <button class="button outline">2</button>
            <button class="button outline dropdown-button">
              Dropdown
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Avatar Group -->
      <div class="example-container">
        <div class="example-label">Avatar Group</div>
        <div class="example-content">
          <div class="avatar-group">
            <div class="avatar">
              <img src="https://i.pravatar.cc/150?img=1" alt="Avatar 1">
            </div>
            <div class="avatar">
              <img src="https://i.pravatar.cc/150?img=2" alt="Avatar 2">
            </div>
            <div class="avatar">
              <img src="https://i.pravatar.cc/150?img=3" alt="Avatar 3">
            </div>
            <div class="avatar">
              <img src="https://i.pravatar.cc/150?img=4" alt="Avatar 4">
            </div>
            <div class="avatar more-avatar">
              <span>9+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Vertical Section -->
  <div class="section">
    <h2>Vertical</h2>
    
    <div class="vertical-grid">
      <div class="vertical-column">
        <div class="type-label">Small</div>
        <div class="vertical-button-group">
          <button class="button solid small">Button-sm</button>
          <button class="button solid small">Button-sm</button>
          <button class="button solid small">Button-sm</button>
        </div>
      </div>
      
      <div class="vertical-column">
        <div class="type-label">Default</div>
        <div class="vertical-button-group">
          <button class="button solid">Button</button>
          <button class="button solid">Button</button>
          <button class="button solid">Button</button>
        </div>
      </div>
      
      <div class="vertical-column">
        <div class="type-label">Large</div>
        <div class="vertical-button-group">
          <button class="button solid large">Button-lg</button>
          <button class="button solid large">Button-lg</button>
          <button class="button solid large">Button-lg</button>
        </div>
      </div>
      
      <div class="vertical-column">
        <div class="type-label">Hover</div>
        <div class="vertical-button-group">
          <button class="button solid">Button</button>
          <button class="button solid hover">Button</button>
          <button class="button solid">Button</button>
        </div>
      </div>
      
      <div class="vertical-column">
        <div class="type-label">Focus</div>
        <div class="vertical-button-group">
          <button class="button solid">Button</button>
          <button class="button solid focus">Button</button>
          <button class="button solid">Button</button>
        </div>
      </div>
      
      <div class="vertical-column">
        <div class="type-label">Disabled</div>
        <div class="vertical-button-group">
          <button class="button solid">Button</button>
          <button class="button solid">Button</button>
          <button class="button solid disabled">Button</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div class="footer">
    <img src="https://preline.co/assets/svg/logos/logo.svg" alt="Preline" />
  </div>
</div>
</template>

<script>
export default {
name: 'ButtonPage'
};
</script>

<style lang="scss" scoped>
.button-page {
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
max-width: 1200px;
margin: 0 auto;
padding: 20px;
color: #333;
background-color: #f8f9fa;
}

.header {
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 30px;
}

.components-badge {
background-color: #f0f0f0;
border-radius: 20px;
padding: 6px 16px;
font-size: 14px;
font-weight: 500;
}

.preline-logo img {
height: 30px;
}

.title-section {
margin-bottom: 40px;
}

h1 {
font-size: 32px;
font-weight: 700;
margin-bottom: 10px;
}

.global-component-badge {
display: inline-flex;
align-items: center;
background-color: #e6f7f0;
color: #10b981;
border-radius: 20px;
padding: 4px 12px;
font-size: 12px;
font-weight: 500;
margin-bottom: 15px;
}

.dot {
width: 8px;
height: 8px;
background-color: #10b981;
border-radius: 50%;
margin-right: 6px;
}

.description {
color: #6b7280;
font-size: 16px;
line-height: 1.5;
max-width: 600px;
}

.section {
margin-bottom: 50px;
}

h2 {
font-size: 24px;
font-weight: 600;
margin-bottom: 20px;
}

.types-grid {
display: grid;
grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
gap: 30px;
}

.type-container {
}

.type-label {
font-size: 14px;
font-weight: 500;
margin-bottom: 10px;
}

.button-container {
background-color: white;
border-radius: 8px;
padding: 20px;
display: flex;
justify-content: center;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.soft-container {
background-color: #f8f9fa;
}

.white-container {
background-color: #f0f0f0;
}

.button-group {
display: inline-flex;
}

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

&:not(:first-child):not(:last-child) {
border-radius: 0;
}

&:first-child {
border-top-left-radius: 6px;
border-bottom-left-radius: 6px;
}

&:last-child {
border-top-right-radius: 6px;
border-bottom-right-radius: 6px;
}

&:not(:first-child) {
margin-left: -1px;
}

&.solid {
background-color: #4361ee;
color: white;
border-color: #4361ee;

&:hover, &.hover {
background-color: #3a56d4;
border-color: #3a56d4;
}

&:focus, &.focus {
box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.3);
outline: none;
z-index: 1;
}

&.disabled {
opacity: 0.6;
cursor: not-allowed;
}
}

&.outline {
background-color: transparent;
color: #4361ee;
border-color: #4361ee;

&:hover, &.hover {
background-color: rgba(67, 97, 238, 0.05);
}

&:focus, &.focus {
box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
outline: none;
z-index: 1;
}

&.disabled {
opacity: 0.6;
cursor: not-allowed;
}
}

&.soft {
background-color: rgba(67, 97, 238, 0.1);
color: #4361ee;
border-color: transparent;

&:hover, &.hover {
background-color: rgba(67, 97, 238, 0.2);
}

&:focus, &.focus {
box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
outline: none;
z-index: 1;
}

&.disabled {
opacity: 0.6;
cursor: not-allowed;
}
}

&.white {
background-color: white;
color: #333;
border-color: #e0e0e0;

&:hover, &.hover {
background-color: #f8f8f8;
}

&:focus, &.focus {
box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
outline: none;
z-index: 1;
}

&.disabled {
opacity: 0.6;
cursor: not-allowed;
}
}

&.small {
padding: 4px 12px;
font-size: 12px;
}

&.large {
padding: 10px 20px;
font-size: 16px;
}

&.pilled {
border-radius: 50px !important;
}
}

.examples-grid {
display: grid;
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
gap: 30px;
}

.example-container {
margin-bottom: 20px;
}

.example-label {
font-size: 14px;
font-weight: 500;
margin-bottom: 10px;
}

.example-content {
display: flex;
gap: 20px;
flex-wrap: wrap;
}

.split-button {
display: inline-flex;

.button:first-child {
border-top-right-radius: 0;
border-bottom-right-radius: 0;
}

.dropdown-button {
border-top-left-radius: 0;
border-bottom-left-radius: 0;
padding: 8px;
margin-left: -1px;
}
}

.outline-split {
.button {
background-color: transparent;
color: #4361ee;
border-color: #4361ee;
}
}

.nested-button-group {
display: inline-flex;

.button {
&:not(:first-child):not(:last-child) {
border-radius: 0;
}
}

.dropdown-button {
display: inline-flex;
align-items: center;
gap: 6px;

svg {
width: 12px;
height: 12px;
}
}
}

.outline-nested {
.button {
background-color: transparent;
color: #4361ee;
border-color: #4361ee;
}
}

.avatar-group {
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

&.more-avatar {
background-color: #f0f0f0;
font-size: 12px;
font-weight: 600;
color: #555;
}
}
}

.vertical-grid {
display: grid;
grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
gap: 30px;
}

.vertical-column {
}

.vertical-button-group {
display: flex;
flex-direction: column;
width: 100%;

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

.footer {
margin-top: 50px;
display: flex;
justify-content: center;
padding: 20px 0;

img {
height: 30px;
}
}
</style>