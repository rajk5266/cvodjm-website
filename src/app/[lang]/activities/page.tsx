import { getStaticContent } from "@/lib/getStaticContent";
import Image from "next/image";
import Head from "next/head";

type Props = {
    params: Promise<{ lang: string }>;
};

type ActivityItem = {
  title: string;
  description: string;
};

type ActivityCategory = {
  title: string;
  items: ActivityItem[];
  image?: string;   // optional image URL
  color?: string;   // optional gradient color
};

type ActivitiesContent = {
  page: { title: string };
  intro: { title: string; description: string };
  communication: ActivityCategory;
  health: ActivityCategory;
  youth_education: ActivityCategory;
  social_responsibility: ActivityCategory;
  faith_culture: ActivityCategory;
  charity: { title: string; description: string };
  conclusion: { description: string };
};

export default async function ActivitiesPage({ params }: Props) {
  const { lang } = await params;

  const Content: ActivitiesContent = await getStaticContent(
    lang,
    "activities/activities"
  );

  // Attach images, colors
  const categories: ActivityCategory[] = [
    {
      ...Content.communication,
      image:
        "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "from-blue-500 to-blue-700",
    },
    {
      ...Content.health,
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "from-green-500 to-green-700",
    },
    {
      ...Content.youth_education,
      image:
        "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "from-purple-500 to-purple-700",
    },
    {
      ...Content.social_responsibility,
      image:
        "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "from-orange-500 to-red-600",
    },
    {
      ...Content.faith_culture,
      image:
        "https://images.unsplash.com/photo-1604608672516-389320be7dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "from-yellow-500 to-orange-600",
    },
  ];

  return (
    <>
      <Head>
        <title>{Content.page.title} - Deravasi Mahajan</title>
        <meta
          name="description"
          content="Discover the continuous efforts of Deravasi Mahajan community in seva, sahyog, and sanskriti through various social, educational, and cultural activities."
        />
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
                "url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/80 to-red-900/80"></div>

          <div className="relative z-10 flex items-center justify-center h-full px-4">
            <div className="text-center text-white max-w-5xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-wide">
                {Content.intro.title}
              </h1>
              <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full mb-6"></div>
              <p className="text-lg md:text-2xl font-light opacity-90">
                {Content.intro.description}
              </p>
            </div>
          </div>
        </div>

        {/* Activity Categories */}
        <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">
          {categories.map((category, idx) => (
            <section key={idx} className="relative">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">
                      {category.title}
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {category.items.map((activity, activityIdx) => (
                      <div
                        key={activityIdx}
                        className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500"
                      >
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          {activity.title}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {activity.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image Side */}
                {category.image && (
                  <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="relative">
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-20 rounded-2xl transform rotate-3`}
                      ></div>
                      <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                          src={category.image}
                          alt={`${category.title} activities`}
                          width={600}
                          height={600}
                          className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-30`}
                        ></div>
                        <div className="absolute bottom-6 left-6 right-6">
                          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                            <h4 className="font-bold text-gray-800 text-lg">
                              {category.title}
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

          {/* Charity Section */}
          <section className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              {Content.charity.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {Content.charity.description}
            </p>
          </section>

          {/* Conclusion Section */}
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
