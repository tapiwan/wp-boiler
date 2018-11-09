<?php

class Theme {
	/**
	 * Singleton instance
	 *
	 * @var Theme
	 */
	private static $instance;

	/**
	 * Returns the singleton instance
	 *
	 * @return Theme
	 */
	public static function instance() {
		if (isset(self::$instance)) {
			return self::$instance;
		}

		self::$instance = new Theme;

		return self::$instance;
	}

	/**
	 * Theme constructor.
	 */
	public function __construct() {
		$this->addAction('init', 'loadLanguages');

		$this->addAction('after_setup_theme', 'enableThemeSupport');
		$this->addAction('after_setup_theme', 'registerNavMenus');

		$this->addAction('wp_enqueue_scripts', 'loadScripts', 900);
		$this->addAction('wp_enqueue_scripts', 'loadStyles', 910);
		$this->addAction('wp_enqueue_scripts', 'loadConditionalScripts', 920);
	}

	/**
	 * Loads the textdomain of the theme
	 */
	public function loadLanguages() {
		//Load Language File
		load_theme_textdomain('___THEME_SLUG___', get_template_directory() . '/languages');
	}

	/**
	 * Enables theme support for native features
	 */
	public function enableThemeSupport() {
		add_theme_support('title-tag');
		add_theme_support('post-thumbnails');

		add_theme_support('html5', [
			 'search-form',
			 'comment-form',
			 'comment-list',
			 'gallery',
			 'caption',
		]);
	}

	/**
	 * Registers navigation menus to the theme
	 */
	public function registerNavMenus() {
		register_nav_menus([
			 'primary' => __('Primary Menu', '___THEME_SLUG___'),
		]);
	}

	/**
	 * Load all the scripts of the theme
	 */
	public function loadScripts() {
		//Add Google Maps
		//wp_enqueue_script('googlemaps', 'https://maps.googleapis.com/maps/api/js?key=KEY');

		//Add Scripts
		wp_enqueue_script('___THEME_SLUG___-js', get_template_directory_uri() . '/scripts/main.min.js');

		//Print Localization JavaScript to the Frontend
		//wp_localize_script( '___THEME_SLUG___-js', 'NAME', array( 'KEY' => 'VALUE' ) );
	}

	/**
	 * Load all the stylesheets of the theme
	 */
	public function loadStyles() {
		//Add Stylesheets
		wp_enqueue_style('___THEME_SLUG___-css', get_template_directory_uri() . '/styles/styles.min.css');

		//Load Theme Style (enforced by wordpress conventions)
		wp_enqueue_style('___THEME_SLUG___-style', get_stylesheet_uri());
	}

	/**
	 * Add Bootstrap's IE conditional html5 shiv and respond.js to header
	 */
	public function loadConditionalScripts() {
		global $wp_scripts;

		wp_register_script('html5_shiv', 'https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js', '', '', false);
		wp_register_script('respond_js', 'https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js', '', '', false);

		$wp_scripts->add_data('html5_shiv', 'conditional', 'lt IE 9');
		$wp_scripts->add_data('respond_js', 'conditional', 'lt IE 9');
	}

	/**
	 * Adds a function to a hook
	 */
	private function addAction($hook, $function, $priority = 10, $accepted_args = 1) {
		add_action($hook, [&$this, $function], $priority, $accepted_args);
	}

	/**
	 * Adds a function to a filter
	 */
	private function addFilter($tag, $function, $priority = 10, $accepted_args = 1) {
		add_filter($tag, [&$this, $function], $priority, $accepted_args);
	}
}

$theme = Theme::instance();

?>