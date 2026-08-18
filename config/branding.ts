import jisrLogo from "@/assets/branding/jisr-logo.asset.json";
import kfuLogo from "@/assets/branding/kfu-logo.asset.json";
import instituteLogo from "@/assets/branding/institute-logo.asset.json";

/**
 * Official brand assets. Replace the .asset.json pointers to swap logos.
 * Never redraw, recolor or combine these marks.
 */
export const brandingConfig = {
  jisr: {
    src: jisrLogo.url,
    altAr: "شعار نادي جسر",
    altEn: "JISR Club logo",
  },
  kfu: {
    src: kfuLogo.url,
    altAr: "شعار جامعة الملك فيصل",
    altEn: "King Faisal University logo",
  },
  institute: {
    src: instituteLogo.url,
    altAr: "شعار معهد الجبيل التقني",
    altEn: "Jubail Technical Institute logo",
  },
} as const;

export const affiliationLogos = [brandingConfig.kfu, brandingConfig.institute];
