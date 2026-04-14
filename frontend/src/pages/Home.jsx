import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import VisionMission from "../components/VisionMission";
import Features from "../components/Features";
import Introduction from "../components/Introduction";
import WhyChooseAcademy from "../components/WhyChooseAcademy";
import OurPrograms from "../components/OurPrograms";
import AdmissionPopup from "../components/AdmissionPopup";
import Courses from "../components/Courses";

export default function Home() {
  return (
    <div>
      <AdmissionPopup />
      <Carousel />
      <Introduction />
      <Courses />
      <WhyChooseAcademy />
      <VisionMission />
      <OurPrograms />
      <Features />
    </div>
  );
}