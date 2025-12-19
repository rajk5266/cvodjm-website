import { getStaticContent } from "@/lib/getStaticContent";
import VisionValues from "./components/ui/VisionValues";
import HeroBanner from "./components/ui/HeroBanner";
import ActivitiesCarousel from "./components/ui/Activities";
import CommunityGallery from "./components/ui/Gallery";
import FAQStatic from "./components/ui/FAQsStatic";
import AboutSection from "./components/ui/AboutSection";
import CentresBanner from "./components/ui/CenresBanners";
import GetInvolved from "./components/ui/DonateVolunteer";

type PageProps = {
  params: Promise<{ lang: string }>;
};

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;

  // Static JSON content
  const heroContent = getStaticContent(lang, "home/hero");
  const activitiesContent = getStaticContent(lang, "home/activities");
  const missioncontent = getStaticContent(lang, "home/mission");
  const faqContent = getStaticContent(lang, "home/faqs");
  const galleryComponent = getStaticContent(lang, "home/gallery");
  const aboutContent = getStaticContent(lang, "home/about");
  const centresContent = getStaticContent(lang, "home/centres");
  // console.log(statsContent);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <HeroBanner banners={heroContent.banners} />

      <AboutSection content={aboutContent.aboutSamaj} />

      <VisionValues visionValues={missioncontent.visionValues} />



      <ActivitiesCarousel
        content={activitiesContent}
        className="mt-12"
      />
      
<CentresBanner content={centresContent} />



      <FAQStatic faqs={faqContent.faqs} />


      {/* <CommunityCounter
        content={statsContent}
      /> */}

      <CommunityGallery
        content={galleryComponent}
      />

      <GetInvolved/>

    </div>
  );
}




