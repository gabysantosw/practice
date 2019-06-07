# Social Network Theme with Sass - Traversy Media 

## Part 1 
- We'll also use: font awesome, live sass compiler for vscode, google fonts, pexels/unsplash
- 8-10 single pages for each section, css grid
- live sass settings: 
```json
"liveSassCompile.settings.formats": {
  "format": "compressed",
  "extensionName": ".min.css",
  "savePath": "/dist/css"
},
"liveSassCompile.settings.generateMap": false,
```
- get font awesome free version and add to head tag 
- using font awesome: `<i class="fas fa-code"></i>`
- separate .scss called _config for colors, mixins, etc the _ means parcial file, these don't get compiled, they are made to be included in our main .scss file 
- to import scss partial files `@import 'config';` no _ needed
- get Raleway font from google fonts, uses style tag (maybe check the diference performance wise?)
- separate file for utilities
- tip: mixin to automatically make text color depending on background

## Part 2
- add and work on register.html
- good to have: a _boiler.html file that contains the basic template of all our pages, to copy and paste (added in templates folder)
- forms: we use 'required' and 'minlength' as html5 form validation 

## Part 3

## Part 4