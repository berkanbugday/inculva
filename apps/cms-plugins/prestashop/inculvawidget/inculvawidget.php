<?php
if (!defined('_PS_VERSION_')) exit;

class InculvaWidget extends Module {

    private static array $i18n = [
        'en' => [
            'plugin_name'     => 'Inculva Accessibility Widget',
            'plugin_desc'     => 'Adds the Inculva accessibility widget to your PrestaShop store.',
            'banner_text'     => 'Your accessibility widget is active. Manage settings, view reports, and monitor compliance from the Inculva Dashboard.',
            'go_to_dashboard' => 'Go to Dashboard',
            'dismiss'         => 'Dismiss',
            'site_id'         => 'Site ID',
            'site_id_desc'    => 'Find your Site ID in your Inculva dashboard.',
            'api_url'         => 'Widget API URL',
            'api_url_desc'    => 'Leave default unless you use a self-hosted API.',
            'save'            => 'Save',
        ],
        'tr' => [
            'plugin_name'     => 'Inculva Erişilebilirlik Widget\'ı',
            'plugin_desc'     => 'Inculva erişilebilirlik widget\'ını PrestaShop mağazanıza ekler.',
            'banner_text'     => 'Erişilebilirlik widget\'ınız aktif. Inculva Dashboard\'dan ayarları yönetin, raporları görüntüleyin ve uyumluluğu izleyin.',
            'go_to_dashboard' => 'Panele Git',
            'dismiss'         => 'Kapat',
            'site_id'         => 'Site ID',
            'site_id_desc'    => 'Site ID\'nizi Inculva panonuzda bulabilirsiniz.',
            'api_url'         => 'Widget API URL',
            'api_url_desc'    => 'Kendi API\'nizi barındırmıyorsanız varsayılanı bırakın.',
            'save'            => 'Kaydet',
        ],
    ];

    private function t(string $key): string {
        $lang = strncmp(Context::getContext()->language->iso_code ?? 'en', 'tr', 2) === 0 ? 'tr' : 'en';
        return self::$i18n[$lang][$key] ?? $key;
    }

    public function __construct() {
        $this->name          = 'inculvawidget';
        $this->tab           = 'front_office_features';
        $this->version       = '1.0.0';
        $this->author        = 'Inculva';
        $this->need_instance = 0;
        parent::__construct();
        $this->displayName = $this->t('plugin_name');
        $this->description = $this->t('plugin_desc');
    }

    public function install(): bool {
        return parent::install() && $this->registerHook('displayFooter');
    }

    public function hookDisplayFooter(): string {
        $siteId = Configuration::get('INCULVA_SITE_ID');
        if (empty($siteId)) return '';

        $apiUrl = Configuration::get('INCULVA_API_URL') ?: 'https://api.inculva.com';
        $inline = 'window.INCULVA_API_URL=' . json_encode($apiUrl) . ';'
                . 'window.InculvaConfig=' . json_encode(['siteId' => $siteId]) . ';';

        return '<script>' . $inline . '</script>'
             . '<script src="https://cdn.inculva.com/widget.js"'
             . ' data-site-id="' . htmlspecialchars($siteId, ENT_QUOTES) . '" defer></script>';
    }

    public function getContent(): string {
        if (Tools::isSubmit('submit_inculva')) {
            Configuration::updateValue('INCULVA_SITE_ID', Tools::getValue('inculva_site_id'));
            Configuration::updateValue('INCULVA_API_URL', Tools::getValue('inculva_api_url'));
        }

        $siteId = (string) Configuration::get('INCULVA_SITE_ID');
        $apiUrl = (string) Configuration::get('INCULVA_API_URL', 'https://api.inculva.com');

        $banner = '
        <div id="inculva-banner" style="
            background:#fff;border:1px solid #e2e4e7;border-radius:10px;
            padding:20px 24px;margin-bottom:24px;
            position:relative;box-shadow:0 1px 4px rgba(0,0,0,.06);
        ">
            <button onclick="
                document.getElementById(\'inculva-banner\').style.display=\'none\';
                localStorage.setItem(\'inculva_banner_dismissed\',\'1\');
            " style="
                position:absolute;top:12px;right:14px;background:none;border:none;
                cursor:pointer;font-size:18px;line-height:1;color:#888;padding:0;
            " aria-label="' . htmlspecialchars($this->t('dismiss'), ENT_QUOTES) . '">&#x2715;</button>
            <img src="https://cdn.inculva.com/logos/logo-dark.png" width="150" alt="Inculva"
                 style="display:block;margin-bottom:10px;" />
            <p style="margin:0 0 16px;color:#3c434a;font-size:15px;line-height:1.5;">'
                . htmlspecialchars($this->t('banner_text'), ENT_QUOTES) .
            '</p>
            <a href="https://app.inculva.com" target="_blank" rel="noopener" style="
                display:inline-flex;align-items:center;gap:8px;
                background:#111;color:#fff;padding:10px 20px;border-radius:50px;
                font-size:15px;font-weight:600;text-decoration:none;
            ">' . htmlspecialchars($this->t('go_to_dashboard'), ENT_QUOTES) . ' &#8594;</a>
        </div>
        <script>
            if (localStorage.getItem("inculva_banner_dismissed") === "1") {
                document.getElementById("inculva-banner").style.display = "none";
            }
        </script>';

        $output  = $banner;
        $output .= '<form method="post">';
        $output .= '<table style="width:100%;border-collapse:collapse;">';
        $output .= '<tr><td style="padding:8px 0;font-weight:600;">' . htmlspecialchars($this->t('site_id'), ENT_QUOTES) . '</td>';
        $output .= '<td><input type="text" name="inculva_site_id" value="' . htmlspecialchars($siteId, ENT_QUOTES) . '" style="width:100%;padding:8px;border:1px solid #ccc;border-radius:4px;">';
        $output .= '<p style="color:#666;font-size:13px;margin:4px 0 0;">' . htmlspecialchars($this->t('site_id_desc'), ENT_QUOTES) . '</p></td></tr>';
        $output .= '<tr><td style="padding:8px 0;font-weight:600;">' . htmlspecialchars($this->t('api_url'), ENT_QUOTES) . '</td>';
        $output .= '<td><input type="url" name="inculva_api_url" value="' . htmlspecialchars($apiUrl, ENT_QUOTES) . '" style="width:100%;padding:8px;border:1px solid #ccc;border-radius:4px;">';
        $output .= '<p style="color:#666;font-size:13px;margin:4px 0 0;">' . htmlspecialchars($this->t('api_url_desc'), ENT_QUOTES) . '</p></td></tr>';
        $output .= '</table>';
        $output .= '<br><input type="submit" name="submit_inculva" value="' . htmlspecialchars($this->t('save'), ENT_QUOTES) . '" style="background:#111;color:#fff;padding:10px 24px;border:none;border-radius:6px;cursor:pointer;font-size:15px;">';
        $output .= '</form>';

        return $output;
    }
}
