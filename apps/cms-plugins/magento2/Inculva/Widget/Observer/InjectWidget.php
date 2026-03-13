<?php
namespace Inculva\Widget\Observer;

use Magento\Framework\Event\ObserverInterface;
use Magento\Framework\Event\Observer;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\View\Page\Config as PageConfig;
use Magento\Store\Model\ScopeInterface;

class InjectWidget implements ObserverInterface {
    private ScopeConfigInterface $scopeConfig;
    private PageConfig $pageConfig;

    public function __construct(ScopeConfigInterface $scopeConfig, PageConfig $pageConfig) {
        $this->scopeConfig = $scopeConfig;
        $this->pageConfig  = $pageConfig;
    }

    public function execute(Observer $observer): void {
        $siteId = $this->scopeConfig->getValue('inculva_widget/general/site_id', ScopeInterface::SCOPE_STORE);
        if (empty($siteId)) return;

        $apiUrl = $this->scopeConfig->getValue('inculva_widget/general/api_url', ScopeInterface::SCOPE_STORE)
                  ?: 'https://api.inculva.com';

        $inline = 'window.INCULVA_API_URL=' . json_encode($apiUrl) . ';'
                . 'window.InculvaConfig=' . json_encode(['siteId' => $siteId]) . ';';

        $this->pageConfig->addScript(
            'https://cdn.inculva.com/widget.js',
            ['attributes' => ['data-site-id' => $siteId, 'defer' => 'defer']]
        );
        $this->pageConfig->addRemotePageAsset($inline, 'js');
    }
}
