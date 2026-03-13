<?php
defined('_JEXEC') or die;

use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;

class PlgSystemInculva extends CMSPlugin {

    public function __construct(&$subject, $config = []) {
        parent::__construct($subject, $config);
        Factory::getLanguage()->load('plg_system_inculva', JPATH_ADMINISTRATOR);
    }

    public function onBeforeCompileHead(): void {
        $app = Factory::getApplication();
        if ($app->isClient('administrator')) return;

        $site_id = $this->params->get('site_id', '');
        if (empty($site_id)) return;

        $api_url = $this->params->get('api_url', 'https://api.inculva.com');

        $doc = Factory::getDocument();
        $doc->addScriptDeclaration(
            'window.INCULVA_API_URL=' . json_encode($api_url) . ';'
          . 'window.InculvaConfig=' . json_encode(['siteId' => $site_id]) . ';'
        );
        $doc->addScript('https://cdn.inculva.com/widget.js', [], ['data-site-id' => $site_id, 'defer' => true]);
    }

    /**
     * Renders the settings banner in the admin plugin configuration page.
     */
    public function onContentPrepareForm($form, $data): bool {
        if (!($form instanceof \Joomla\CMS\Form\Form)) return true;
        if ($form->getName() !== 'com_plugins.plugin') return true;

        $banner_text     = htmlspecialchars(Text::_('PLG_SYSTEM_INCULVA_BANNER_TEXT'), ENT_QUOTES);
        $go_to_dashboard = htmlspecialchars(Text::_('PLG_SYSTEM_INCULVA_GO_TO_DASHBOARD'), ENT_QUOTES);
        $dismiss         = htmlspecialchars(Text::_('PLG_SYSTEM_INCULVA_DISMISS'), ENT_QUOTES);

        $bannerHtml = '<div id="inculva-banner" style="'
            . 'background:#fff;border:1px solid #e2e4e7;border-radius:10px;'
            . 'padding:20px 24px;position:relative;box-shadow:0 1px 4px rgba(0,0,0,.06);margin-bottom:8px;">'
            . '<button onclick="document.getElementById(\'inculva-banner\').style.display=\'none\';"'
            . ' localStorage.setItem(\'inculva_banner_dismissed\',\'1\');"'
            . ' style="position:absolute;top:12px;right:14px;background:none;border:none;'
            . 'cursor:pointer;font-size:18px;line-height:1;color:#888;padding:0;"'
            . ' aria-label="' . $dismiss . '">&#x2715;</button>'
            . '<img src="https://cdn.inculva.com/logos/logo-dark.png" width="150" alt="Inculva"'
            . ' style="display:block;margin-bottom:10px;" />'
            . '<p style="margin:0 0 16px;color:#3c434a;font-size:15px;line-height:1.5;">'
            . $banner_text . '</p>'
            . '<a href="https://app.inculva.com" target="_blank" rel="noopener" style="'
            . 'display:inline-flex;align-items:center;gap:8px;'
            . 'background:#111;color:#fff;padding:10px 20px;border-radius:50px;'
            . 'font-size:15px;font-weight:600;text-decoration:none;">'
            . $go_to_dashboard . ' &#8594;</a></div>'
            . '<script>if(localStorage.getItem("inculva_banner_dismissed")==="1"){'
            . 'document.getElementById("inculva-banner").style.display="none";}</script>';

        $xml = new \SimpleXMLElement('<form/>');
        $fields = $xml->addChild('fields');
        $fields->addAttribute('name', 'params');
        $fieldset = $fields->addChild('fieldset');
        $fieldset->addAttribute('name', 'basic');
        $noteField = $fieldset->addChild('field');
        $noteField->addAttribute('name', 'inculva_banner');
        $noteField->addAttribute('type', 'note');
        $noteField->addAttribute('description', $bannerHtml);

        $form->load($xml->asXML(), false);

        return true;
    }
}
