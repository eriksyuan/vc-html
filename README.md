## vc-html

vue3 component replace v-html directive 
### Install
```
npm install @eriksyuan/vc-html
```
### Usage

```vue
<script setup>
import InnerHtml from '@eriksyuan/vc-html'
const html = '<div>hello world</div>'
</script>

<template>
  <InnerHtml :nodes="html" />
</template>
```

### Example
[SFC Playground](https://sfc.vuejs.org/#eNp9kE1uwkAMha8ymi7YkAzdRiFqd+0dZpMmJhmYP9mTIIS4e53QUGir7mw/+/PTO8vXGPNxAFnIkho0MQmCNMRKe+NiwCTevQd8S86KHQYnVi+A5kCnofbKLNJK+1Jdz/mQmwQu2joBd0KU3wgfWqCtlmVrxqoHa4MoKdZeUDpZ2K6aYAMWCO2qOga0LVNZrUo17Ws54xi44MXTLF+nOpXGdeJo2tTzi+fNRktB2HCtbOhCTmPH5cJQjx7VzST3d6Jcy2sQmatjvqfgOarzdKK/BNKyEPNkmnGWU69ln1KkQinaNVPAe8oDdoqrHAefjIMcyGUfGI4EyGAt1wvjr4gfoYOPhy5vglN3u2OT9fPmDcTfFNNHwAzBt4CA/5n7sfrL4IS9aH+Rl09NQcQ7)


demo
```vue
<script setup>
import InnerHtml from '@eriksyuan/vc-html'
const html = `
<div>
    <ul>
        <li id="main">1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
    </ul>
</div>
<div>hello world</div>`
</script>

<template>
  <InnerHtml :nodes="html">
    <template #li="{ node, render, childrenRender }">
      <template v-if="node.props.id === 'main'">
        <component :is="render" />
      </template>
      <li v-else>
        <component :is="childrenRender" />0
      </li>
    </template>
  </InnerHtml>
</template>
```
results
```
<div>
    <ul>
        <li id="main">1</li>
        <li>20</li>
        <li>30</li>
        <li>40</li> 
        <li>50</li>
    </ul>
</div>
```

### Props

| Name  | Type   | Default | Description |
| ----- | ------ | ------- | ----------- |
| nodes | string | ''      | html string |

### Slots
| Name      | Parameters                                                          | Description |
| --------- | ------------------------------------------------------------------- | ----------- |
| [key:tag] | `{ node:Node, render:renderFunction,childrenRender:renderFunction}` | -           |
