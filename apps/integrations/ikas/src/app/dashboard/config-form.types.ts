export interface WidgetConfig {
  position: string;
  primaryColor: string;
  language: string;
  buttonSize: string;
  domain: string;
  scriptInstalled: boolean;
}

export const labels = {
  en: {
    dashboard: "inculva Dashboard",
    widgetSettings: "Widget Settings",
    position: "Position",
    primaryColor: "Primary Color",
    buttonSize: "Button Size",
    language: "Language",
    domain: "Website Domain",
    domainHint: "The domain where the widget will appear",
    save: "Save Changes",
    saving: "Saving...",
    saved: "Saved!",
    error: "Failed to save. Please try again.",
    loading: "Loading...",
    expired: "Your session has expired. Please reopen this app from your ikas admin panel.",
    scanReports: "View accessibility scan reports",
    widgetStatus: "Widget Status",
    scriptInstalled: "Widget script is installed on your storefront.",
    scriptNotInstalled: "Widget script is not installed on your storefront.",
    installScript: "Install Widget Script",
    installing: "Installing...",
    installSuccess: "Widget script installed successfully!",
    installError: "Failed to install. Please try again.",
    positions: {
      "top-left": "Top Left",
      "top-right": "Top Right",
      "bottom-left": "Bottom Left",
      "bottom-right": "Bottom Right",
    },
    sizes: { small: "Small", medium: "Medium", large: "Large" },
    languages: { en: "English", tr: "Türkçe" },
  },
  tr: {
    dashboard: "inculva Yönetim Paneli",
    widgetSettings: "Widget Ayarları",
    position: "Konum",
    primaryColor: "Ana Renk",
    buttonSize: "Buton Boyutu",
    language: "Dil",
    domain: "Web Sitesi Alan Adı",
    domainHint: "Widget'ın görüneceği alan adı",
    save: "Değişiklikleri Kaydet",
    saving: "Kaydediliyor...",
    saved: "Kaydedildi!",
    error: "Kaydetme başarısız. Lütfen tekrar deneyin.",
    loading: "Yükleniyor...",
    expired: "Oturumunuz sona erdi. Lütfen uygulamayı ikas yönetim panelinizden tekrar açın.",
    scanReports: "Erişilebilirlik tarama raporlarını görüntüle",
    widgetStatus: "Widget Durumu",
    scriptInstalled: "Widget scripti mağazanıza yüklenmiş durumda.",
    scriptNotInstalled: "Widget scripti mağazanıza henüz yüklenmedi.",
    installScript: "Widget Scriptini Yükle",
    installing: "Yükleniyor...",
    installSuccess: "Widget scripti başarıyla yüklendi!",
    installError: "Yükleme başarısız. Lütfen tekrar deneyin.",
    positions: {
      "top-left": "Sol Üst",
      "top-right": "Sağ Üst",
      "bottom-left": "Sol Alt",
      "bottom-right": "Sağ Alt",
    },
    sizes: { small: "Küçük", medium: "Orta", large: "Büyük" },
    languages: { en: "English", tr: "Türkçe" },
  },
};
