<?php
if ( ! defined( 'ABSPATH' ) ) exit;

function inculva_register_settings() {
    register_setting( 'inculva_options', 'inculva_site_id', [ 'sanitize_callback' => 'sanitize_text_field' ] );
    register_setting( 'inculva_options', 'inculva_api_url', [ 'sanitize_callback' => 'esc_url_raw', 'default' => 'https://api.inculva.com' ] );
}
add_action( 'admin_init', 'inculva_register_settings' );

function inculva_add_admin_menu() {
    add_options_page(
        inculva_t( 'plugin_name' ),
        inculva_t( 'plugin_name' ),
        'manage_options',
        'inculva-widget',
        'inculva_settings_page'
    );
}
add_action( 'admin_menu', 'inculva_add_admin_menu' );

function inculva_settings_page() {
    if ( ! current_user_can( 'manage_options' ) ) return;
    $site_id = get_option( 'inculva_site_id', '' );
    ?>
    <div class="wrap">

        <div id="inculva-banner" style="
            background:#fff;border:1px solid #e2e4e7;border-radius:10px;
            padding:20px 24px;margin-bottom:24px;
            position:relative;box-shadow:0 1px 4px rgba(0,0,0,.06);
        ">
            <button onclick="
                document.getElementById('inculva-banner').style.display='none';
                localStorage.setItem('inculva_banner_dismissed','1');
            " style="
                position:absolute;top:12px;right:14px;background:none;border:none;
                cursor:pointer;font-size:18px;line-height:1;color:#888;padding:0;
            " aria-label="<?php echo esc_attr( inculva_t( 'dismiss' ) ); ?>">&#x2715;</button>

            <img src="https://cdn.inculva.com/logos/logo-dark.png" width="150" alt="inculva"
                 style="display:block;margin-bottom:10px;" />

            <p style="margin:0 0 16px;color:#3c434a;font-size:15px;line-height:1.5;">
                <?php echo esc_html( inculva_t( 'banner_text' ) ); ?>
            </p>

            <a href="https://app.inculva.com" target="_blank" rel="noopener" style="
                display:inline-flex;align-items:center;gap:8px;
                background:#111;color:#fff;padding:10px 20px;border-radius:50px;
                font-size:15px;font-weight:600;text-decoration:none;
            "><?php echo esc_html( inculva_t( 'go_to_dashboard' ) ); ?> &#8594;</a>
        </div>
        <script>
            if (localStorage.getItem('inculva_banner_dismissed') === '1') {
                document.getElementById('inculva-banner').style.display = 'none';
            }
        </script>

        <h1><?php echo esc_html( inculva_t( 'plugin_name' ) ); ?></h1>
        <p><?php echo esc_html( inculva_t( 'plugin_desc' ) ); ?></p>

        <form method="post" action="options.php">
            <?php settings_fields( 'inculva_options' ); ?>
            <table class="form-table" role="presentation">
                <tr>
                    <th scope="row"><label for="inculva_site_id"><?php echo esc_html( inculva_t( 'site_id' ) ); ?></label></th>
                    <td>
                        <input type="text" id="inculva_site_id" name="inculva_site_id"
                               value="<?php echo esc_attr( $site_id ); ?>"
                               class="regular-text" placeholder="<?php echo esc_attr( inculva_t( 'site_id_placeholder' ) ); ?>" />
                        <p class="description"><?php echo esc_html( inculva_t( 'site_id_desc' ) ); ?></p>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><label for="inculva_api_url"><?php echo esc_html( inculva_t( 'api_url' ) ); ?></label></th>
                    <td>
                        <input type="url" id="inculva_api_url" name="inculva_api_url"
                               value="<?php echo esc_attr( get_option( 'inculva_api_url', 'https://api.inculva.com' ) ); ?>"
                               class="large-text" />
                        <p class="description"><?php echo esc_html( inculva_t( 'api_url_desc' ) ); ?></p>
                    </td>
                </tr>
            </table>
            <?php submit_button( inculva_t( 'save' ) ); ?>
        </form>
    </div>
    <?php
}
