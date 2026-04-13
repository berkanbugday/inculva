<?php
/**
 * Plugin Name: inculva Accessibility Widget
 * Plugin URI:  https://inculva.com
 * Description: Adds the inculva accessibility widget to your WordPress site.
 * Version:     1.0.0
 * Author:      inculva
 * Author URI:  https://inculva.com
 * License:     GPL-2.0+
 * Text Domain: inculva-widget
 * Domain Path: /languages
 */

if ( ! defined( 'ABSPATH' ) ) exit;

define( 'INCULVA_WIDGET_PATH', plugin_dir_path( __FILE__ ) );

/**
 * Returns a translated string for the given key.
 * Auto-detects WordPress locale — falls back to English for any non-Turkish locale.
 */
function inculva_t( string $key ): string {
    static $strings = null;
    if ( $strings === null ) {
        $lang    = strncmp( get_user_locale(), 'tr', 2 ) === 0 ? 'tr' : 'en';
        $strings = require INCULVA_WIDGET_PATH . 'languages/' . $lang . '.php';
    }
    return $strings[ $key ] ?? $key;
}

if ( is_admin() ) {
    require_once INCULVA_WIDGET_PATH . 'admin/settings.php';
}

/**
 * Translates the plugin Name and Description shown in the WP Plugins list
 * (these come from the file header comment, not inculva_t(), so we override them here).
 */
function inculva_translate_plugin_meta( array $plugins ): array {
    $file = plugin_basename( __FILE__ );
    if ( isset( $plugins[ $file ] ) && strncmp( get_user_locale(), 'tr', 2 ) === 0 ) {
        $plugins[ $file ]['Name']        = inculva_t( 'plugin_name' );
        $plugins[ $file ]['Description'] = inculva_t( 'plugin_desc' );
        $plugins[ $file ]['Author']      = inculva_t( 'author' );
        $plugins[ $file ]['AuthorName']  = inculva_t( 'author' );
    }
    return $plugins;
}
add_filter( 'all_plugins', 'inculva_translate_plugin_meta' );

function inculva_enqueue_widget() {
    $site_id = get_option( 'inculva_site_id', '' );
    if ( empty( $site_id ) ) return;

    $api_url = get_option( 'inculva_api_url', 'https://api.inculva.com' );

    // Version null — lets the CDN's own Cache-Control headers control freshness.
    wp_enqueue_script(
        'inculva-widget',
        'https://cdn.inculva.com/widget.js',
        [],
        null,
        [ 'strategy' => 'defer', 'in_footer' => true ]
    );

    wp_add_inline_script(
        'inculva-widget',
        'window.INCULVA_API_URL = ' . wp_json_encode( $api_url ) . ';' .
        'window.inculvaConfig = ' . wp_json_encode( [ 'siteId' => $site_id ] ) . ';',
        'before'
    );
}
add_action( 'wp_enqueue_scripts', 'inculva_enqueue_widget' );

function inculva_add_script_attributes( $tag, $handle, $src ) {
    if ( 'inculva-widget' !== $handle ) return $tag;
    $site_id = esc_attr( get_option( 'inculva_site_id', '' ) );
    return str_replace( ' src=', " data-site-id=\"{$site_id}\" src=", $tag );
}
add_filter( 'script_loader_tag', 'inculva_add_script_attributes', 10, 3 );
