<?php
namespace inculva\Widget\Block\Adminhtml;

use Magento\Config\Block\System\Config\Form\Field;
use Magento\Backend\Block\Template\Context;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Store\Model\ScopeInterface;

class Banner extends Field {
    private ScopeConfigInterface $scopeConfig;

    public function __construct(Context $context, ScopeConfigInterface $scopeConfig, array $data = []) {
        $this->scopeConfig = $scopeConfig;
        parent::__construct($context, $data);
    }

    protected function _getElementHtml(\Magento\Framework\Data\Form\Element\AbstractElement $element): string {
        $bannerText    = $this->escapeHtml((string) __('Your accessibility widget is active. Manage settings, view reports, and monitor compliance from the inculva Dashboard.'));
        $goDashboard   = $this->escapeHtml((string) __('Go to Dashboard'));
        $dismiss       = $this->escapeHtmlAttr((string) __('Dismiss'));

        return '
        <div id="inculva-banner" style="
            background:#fff;border:1px solid #e2e4e7;border-radius:10px;
            padding:20px 24px;margin-bottom:8px;
            position:relative;box-shadow:0 1px 4px rgba(0,0,0,.06);
        ">
            <button onclick="
                document.getElementById(\'inculva-banner\').style.display=\'none\';
                localStorage.setItem(\'inculva_banner_dismissed\',\'1\');
            " style="
                position:absolute;top:12px;right:14px;background:none;border:none;
                cursor:pointer;font-size:18px;line-height:1;color:#888;padding:0;
            " type="button" aria-label="' . $dismiss . '">&#x2715;</button>
            <img src="https://cdn.inculva.com/logos/logo-dark.png" width="150" alt="inculva"
                 style="display:block;margin-bottom:10px;" />
            <p style="margin:0 0 16px;color:#3c434a;font-size:15px;line-height:1.5;">
                ' . $bannerText . '
            </p>
            <a href="https://app.inculva.com" target="_blank" rel="noopener" style="
                display:inline-flex;align-items:center;gap:8px;
                background:#111;color:#fff;padding:10px 20px;border-radius:50px;
                font-size:15px;font-weight:600;text-decoration:none;
            ">' . $goDashboard . ' &#8594;</a>
        </div>
        <script>
            if (localStorage.getItem("inculva_banner_dismissed") === "1") {
                document.getElementById("inculva-banner").style.display = "none";
            }
        </script>';
    }
}
