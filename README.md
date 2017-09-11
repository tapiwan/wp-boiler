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

- \_\_\_THEME_NAME\_\_\_
- \_\_\_THEME_SLUG\_\_\_
- \_\_\_THEME_URI\_\_\_
- \_\_\_THEME_AUTHOR\_\_\_
- \_\_\_THEME_AUTHOR_URI\_\_\_
- \_\_\_THEME_DESCRIPTION\_\_\_
- \_\_\_THEME_VERSION\_\_\_

2. Run ``npm install`` inside the theme folder, followed by ``npm run gulp watch``. This will install the node packages and start the file watcher for automatic compilation.

# How to use
Here are some basics to work with the boiler theme

## SCSS
All SCSS can be found in the folder ``/src/scss``. All SCSS components of your theme go inside the folder ``/src/scss/theme``. Note that you need to add new files as an import in ``styles.scss`` with ``@import "theme/component.scss"``

Once you change a SCSS file gulp will automatically concatenate all files and compile them. Output goes inside the folder ``/styles``. There will be an original and a minified version of your stylesheets.

## JavaScript
All scripts can be found in the folder ``/src/js``. All script components of your theme go inside the folder ``/src/js/theme``. Note that you need to add new files as an import in ``main.js`` with ``//=require theme/component.js``

Once you change a JS file gulp will automatically concatenate all files and compile them. Output goes inside the folder ``/scripts``. There will be an original and a minified version of your script.

## Language files
All PO language files can be found in the folder ``/languages``. Files with the extension ``.po`` in this folder will automatically compile to ``.mo`` files for use in your theme. Feel free to create your own language files.

## Functions
All the wordpress functions of your theme are done in the file ``/library/theme.php``. You can use alle available wordpress functions inside the class. Usually you add actions and filters inside the ``__construct()`` function and create a new function inside the class. This is to maintain clean code.

# Documentation

This area here is for your documentation :)