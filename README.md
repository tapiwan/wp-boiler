# Wordpress Boiler

A very basic boiler plate for a wordpress theme.

# Features

- SCSS (shipped with bootstrap)
- jQuery
- All basic wordpress templates (no clutter)
- PHP class for easily setting up your theme
- Automatic concatenation and compilation of SCSS, JS and PO files via Gulp

# Getting started

1. Search and replace the following placeholders inside all of the theme files

Placeholder | Example
----------- | --------
``$$$THEME_NAME$$$`` | MyTheme (required)
``$$$THEME_SLUG$$$`` | my_theme (required)
``$$$THEME_JS_NAMESPACE$$$`` | mytheme (required, will be a global available JavaScript namespace for the theme)
``$$$THEME_URI$$$`` | www.my-theme.de (optional, style.css only)
``$$$THEME_AUTHOR$$$`` | Max Mustermann (optional, style.css only)
``$$$THEME_AUTHOR_URI$$$`` | www.max-mustermann.de (optional, style.css only)
``$$$THEME_DESCRIPTION$$$`` | One awesome theme (optional, style.css only)
``$$$THEME_VERSION$$$`` | 1.0.0 (optional, style.css only)

2. Run ``npm install`` inside the theme folder, followed by ``npm run gulp watch``. This will install the node packages and start the file watcher for automatic compilation.

# How to use
Here are some basics to work with the boiler theme

## SCSS
All theme SCSS can be found in the folder ``/src/scss``.  
All SCSS components of your theme go inside the folder ``/src/scss/theme``.  
To create new bundles add the main entry file (property 'file') in the assets.json and define an output file (property 'name').  
Restart the watch task if it was already running.  
After that each main entry file will compile automatically including all it's imports.  

Example that will compile "src/scss/main.scss" to "styles/main.css":
```
"scss": {
    "bundles": [
      {
        "name": "styles/main.css",
        "file": "src/scss/main.scss"
      }
    ]
  }
```

## JavaScript
All theme scripts can be found in the folder ``/src/js``.  
All script components of your theme go inside the folder ``/src/js/theme``.  
To create new bundles add the bundle file name (property 'name') in the assets.json and define the includes (property 'includes').  
Restart the watch task if it was already running.  
After that all the includes of each bundle will be compiled into one bundle with the provided bundle file name.  

Example that will collect all the files under "includes" and compile them to "scripts/main.js":
```
"js": {
    "bundles": [
      {
        "name": "scripts/main.js",
        "mangle": true,
        "includes": [
          "src/vendor/jquery/jquery-3.3.1.js",
          "src/vendor/bootstrap/js/bootstrap.bundle.js",
          "src/js/components/critical.js",
          "src/js/components/tools.js",
          "src/js/components/common.js"
        ]
      }
    ]
  },
```

## Language files
All PO language files can be found in the folder ``/languages``.  
You need to add new language files to the assets.json  
All language files listed in the assets.json with the extension ``.po`` will compile to ``.mo`` files.  
Restart the watch task if it was already running  

Example that will compile "languages/de_DE.po" to "languages/de_DE.mo":
```
"translations": {
    "files": [
      "languages/de_DE.po"
    ]
  }
```

## Functions
All the wordpress functions of your theme are done in the file ``/library/theme.php``. You can use all available WordPress functions inside the class. Usually you add actions and filters inside the ``__construct()`` function and create a new function inside the class. This is to maintain clean code.

# Documentation

This area here is for your documentation :)
