import carousel1_960 from "./optimized/carousel1-960.webp";
import carousel1_1440 from "./optimized/carousel1-1440.webp";
import carousel1_1920 from "./optimized/carousel1-1920.webp";
import carousel2_960 from "./optimized/carousel2-960.webp";
import carousel2_1440 from "./optimized/carousel2-1440.webp";
import carousel2_1920 from "./optimized/carousel2-1920.webp";
import carousel3_960 from "./optimized/carousel3-960.webp";
import carousel3_1440 from "./optimized/carousel3-1440.webp";
import carousel3_1920 from "./optimized/carousel3-1920.webp";
import hotel2_480 from "./optimized/hotel_management/hm2img-480.webp";
import hotel3_480 from "./optimized/hotel_management/hm3img-480.webp";
import hotel3_960 from "./optimized/hotel_management/hm3img-960.webp";
import hotel3_1440 from "./optimized/hotel_management/hm3img-1440.webp";
import hotel4_480 from "./optimized/hotel_management/hm4img-480.webp";
import hotel4_960 from "./optimized/hotel_management/hm4img-960.webp";
import hotel4_1440 from "./optimized/hotel_management/hm4img-1440.webp";
import science1_480 from "./optimized/science/sc1-480.webp";
import science1_960 from "./optimized/science/sc1-960.webp";
import science1_1440 from "./optimized/science/sc1-1440.webp";
import science2_480 from "./optimized/science/sc2-480.webp";
import science2_720 from "./optimized/science/sc2-720.webp";
import science3_480 from "./optimized/science/sc3-480.webp";
import science3_720 from "./optimized/science/sc3-720.webp";
import computerScience_480 from "./optimized/computer_science/cs1-480.webp";
import computerScience_960 from "./optimized/computer_science/cs1-960.webp";
import computerScience_1440 from "./optimized/computer_science/cs1-1440.webp";
import business_480 from "./optimized/business_studies/bus1-480.webp";
import business_960 from "./optimized/business_studies/bus1-960.webp";
import business_1440 from "./optimized/business_studies/bus1-1440.webp";
import tourism_480 from "./optimized/travel_tourism/tt1-480.webp";
import tourism_960 from "./optimized/travel_tourism/tt1-960.webp";
import tourism_1440 from "./optimized/travel_tourism/tt1-1440.webp";
import preschool_480 from "./optimized/preschool-480.webp";
import preschool_960 from "./optimized/preschool-960.webp";
import primary_480 from "./optimized/primary-480.webp";
import primary_960 from "./optimized/primary-960.webp";
import secondary_480 from "./optimized/secondary-480.webp";
import secondary_960 from "./optimized/secondary-960.webp";
import plus2_480 from "./optimized/plus2-480.webp";
import plus2_960 from "./optimized/plus2-960.webp";
import about_768 from "./optimized/aboutus-768.webp";
import about_1440 from "./optimized/aboutus-1440.webp";
import popup_480 from "./optimized/admissionPopup-480.webp";
import popup_960 from "./optimized/admissionPopup-960.webp";
import popupMobile_480 from "./optimized/admissionPopupMobile-480.webp";
import vision_360 from "./optimized/ourVision-360.webp";
import vision_720 from "./optimized/ourVision-720.webp";
import mission_360 from "./optimized/ourMission-360.webp";
import mission_720 from "./optimized/ourMission-720.webp";
import logo_128 from "./optimized/logo-128.webp";
import logo_256 from "./optimized/logo-256.webp";

const responsive = (...sources) => ({
  src: sources[0].src,
  srcSet: sources.map((source) => `${source.src} ${source.width}w`).join(", "),
});

export const carouselImages = [
  responsive(
    { src: carousel1_960, width: 960 },
    { src: carousel1_1440, width: 1440 },
    { src: carousel1_1920, width: 1920 }
  ),
  responsive(
    { src: carousel2_960, width: 960 },
    { src: carousel2_1440, width: 1440 },
    { src: carousel2_1920, width: 1920 }
  ),
  responsive(
    { src: carousel3_960, width: 960 },
    { src: carousel3_1440, width: 1440 },
    { src: carousel3_1920, width: 1920 }
  ),
];

export const courseImages = [
  [
    responsive({ src: hotel2_480, width: 480 }),
    responsive(
      { src: hotel3_480, width: 480 },
      { src: hotel3_960, width: 960 },
      { src: hotel3_1440, width: 1440 }
    ),
    responsive(
      { src: hotel4_480, width: 480 },
      { src: hotel4_960, width: 960 },
      { src: hotel4_1440, width: 1440 }
    ),
  ],
  [
    responsive(
      { src: science1_480, width: 480 },
      { src: science1_960, width: 960 },
      { src: science1_1440, width: 1440 }
    ),
    responsive(
      { src: science2_480, width: 480 },
      { src: science2_720, width: 720 }
    ),
    responsive(
      { src: science3_480, width: 480 },
      { src: science3_720, width: 720 }
    ),
  ],
  [
    responsive(
      { src: computerScience_480, width: 480 },
      { src: computerScience_960, width: 960 },
      { src: computerScience_1440, width: 1440 }
    ),
  ],
  [
    responsive(
      { src: business_480, width: 480 },
      { src: business_960, width: 960 },
      { src: business_1440, width: 1440 }
    ),
  ],
  [
    responsive(
      { src: tourism_480, width: 480 },
      { src: tourism_960, width: 960 },
      { src: tourism_1440, width: 1440 }
    ),
  ],
];

export const programImages = [
  responsive(
    { src: preschool_480, width: 480 },
    { src: preschool_960, width: 960 }
  ),
  responsive(
    { src: primary_480, width: 480 },
    { src: primary_960, width: 960 }
  ),
  responsive(
    { src: secondary_480, width: 480 },
    { src: secondary_960, width: 960 }
  ),
  responsive(
    { src: plus2_480, width: 480 },
    { src: plus2_960, width: 960 }
  ),
];

export const aboutImage = responsive(
  { src: about_768, width: 768 },
  { src: about_1440, width: 1440 }
);
export const desktopAdmissionImage = responsive(
  { src: popup_480, width: 480 },
  { src: popup_960, width: 960 }
);
export const mobileAdmissionImage = responsive(
  { src: popupMobile_480, width: 480 }
);
export const visionImage = responsive(
  { src: vision_360, width: 360 },
  { src: vision_720, width: 720 }
);
export const missionImage = responsive(
  { src: mission_360, width: 360 },
  { src: mission_720, width: 720 }
);
export const schoolLogo = responsive(
  { src: logo_128, width: 128 },
  { src: logo_256, width: 256 }
);
