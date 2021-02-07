# snowpack-plugin-stylus
Use the [Stylus](https://github.com/stylus/stylus) compiler to build `.styl` files from source

## Usage

### Install
```bash
npm install --save-dev snowpack-plugin-stylus
```

### Config
add this plugin to your Snowpack config:  

**snowpack.config.json**
```json
{
  "plugins": [
    "snowpack-plugin-stylus"
  ]
}
```

### Use Custom Stylus Compile Options
**snowpack.config.js**
```javascript
const path = require("path");

module.exports = {
  // ...another config
  "plugins": [
    [
      "snowpack-plugin-stylus",
      { /* stylus render options */ }
    ]
  ]
}
```

