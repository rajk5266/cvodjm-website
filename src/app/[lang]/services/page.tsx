// app/[lang]/services/page.tsx
import { getStaticContent } from "@/lib/getStaticContent";
import Image from "next/image";
import Head from "next/head";

type Props = {
  params: Promise<{ lang: string }>;
};

type ServiceItem = {
  title: string;
  description: string;
  image?: string; // optional service image
  color?: string; // optional gradient color
};

type ServicesContent = {
  page: { title: string };
  intro: { title: string; description: string };
  services: ServiceItem[];
  conclusion: { description: string };
};

export default async function ServicesPage({ params }: Props) {
  const { lang } = await params;

  const Content: ServicesContent = await getStaticContent(
    lang,
    "services/services"
  );

  // Optional images and gradient colors for visual layout
  const servicesWithVisuals: ServiceItem[] = Content.services.map(
    (service) => ({
      ...service,
      image:
        service.image ||
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: service.color || "from-orange-400 to-red-500",
    })
  );

  return (
    <>
      <Head>
        <title>{Content.page.title} - Deravasi Mahajan</title>
        <meta name="description" content={Content.intro.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
        {/* Hero Section */}
        <div className="relative h-96 bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/80 to-red-900/80"></div>

          <div className="relative z-10 flex items-center justify-center h-full px-4">
            <div className="text-center text-white max-w-5xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-wide">
                {Content.page.title}
              </h1>
              <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full mb-6"></div>
              <p className="text-lg md:text-2xl font-light opacity-90">
                {Content.intro.description}
              </p>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">
          {servicesWithVisuals.map((service, idx) => (
            <section key={idx} className="relative">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                      {service.title}
                    </h2>
                    <p className="text-gray-700 text-lg">{service.description}</p>
                  </div>
                </div>

                {/* Image Side */}
                {service.image && (
                  <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="relative">
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-20 rounded-2xl transform rotate-3`}
                      ></div>
                      <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                          src={service.image}
                          alt={`${service.title} image`}
                          width={600}
                          height={600}
                          className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-30`}
                        ></div>
                        <div className="absolute bottom-6 left-6 right-6">
                          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                            <h4 className="font-bold text-gray-800 text-lg">
                              {service.title}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          ))}

          {/* Conclusion */}
          <section className="mt-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl text-white p-8 md:p-12 text-center">
            <p className="text-xl md:text-2xl leading-relaxed">
              {Content.conclusion.description}
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
