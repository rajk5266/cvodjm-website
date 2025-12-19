
import { getStaticContent } from "@/lib/getStaticContent";
import Image from 'next/image'
import Head from 'next/head'

type Props = {
    params: Promise<{ lang: string }>;
};


type ValueItem = {
  title: string;
  description: string;
  icon?: string;
};


type JourneyItem = {
  description1: string;
  description2: string;
};



export default async function AboutUsPage({ params }: Props) {
    const { lang } = await params;

    const Content = getStaticContent(lang, "about/about");
    const {
        page,
        who_we_are,
        what_we_do,
        our_journey,
        our_values,
        organised,
        landmarks,
        cta
    } = Content;

    return (
        <>
            <Head>
                <title>{page.title} - Deravasi Mahajan</title>
                <meta
                    name="description"
                    content="Learn about the rich heritage and values of the Deravasi Mahajan community, serving since 1914."
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
                                "url('https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1600&q=80')",
                        }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-900/70 to-red-900/70"></div>

                    <div className="relative z-10 flex items-center justify-center h-full px-4">
                        <div className="text-center text-white max-w-4xl mx-auto">
                            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-wide">
                                {page.title}
                            </h1>
                            <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full mb-6"></div>
                     
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 py-16">
                    {/* Who We Are Section */}
                    <section className="mb-20">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-4xl font-bold text-gray-800 mb-6 border-l-4 border-orange-500 pl-6">
                                    {who_we_are.title}
                                </h2>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    {who_we_are.description}
                                </p>
                            </div>
                            <div className="relative">
                                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                                    <Image
                                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1600&q=80"
                                        alt="Traditional Jain Temple Architecture"
                                        width={600}
                                        height={600}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* What We Do Section */}
                    <section className="mb-20">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-800 mb-6">
                                {what_we_do.title}
                            </h2>
                            <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full mb-8"></div>
                            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                                {what_we_do.description}
                            </p>
                        </div>
                    </section>

                    {/* Our Values Section */}
                    <section className="mb-20">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-800 mb-6">
                                {our_values.title || "અમારા મૂલ્યો"}
                            </h2>
                            <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {our_values.items.map((value: ValueItem, index: number) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-transform duration-300"
                                >
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                        {value.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Our Journey Section */}
                    <section className="mb-20">
                        <div className="bg-gradient-to-r from-orange-100 to-yellow-50 rounded-3xl p-8 md:p-12">
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div className="relative">
                                    <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
                                        <Image
                                            src="https://images.unsplash.com/photo-1508931133557-3d1c6d1f74dc?auto=format&fit=crop&w=1600&q=80"
                                            alt="Community gathering and celebration"
                                            width={600}
                                            height={400}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-4xl font-bold text-gray-800 mb-6">
                                        {our_journey.title}
                                    </h2>
                                    {our_journey.content.map((item: JourneyItem, i: number) => (
                                        <div key={i}>
                                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                                {item.description1}
                                            </p>
                                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                                {item.description2}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Landmarks Section */}
                    <section className="mb-20">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-800 mb-6">
                                {landmarks.title}
                            </h2>
                            <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full mb-8"></div>
                            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                                {landmarks.description}
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {landmarks.items.map((landmark :string, index: number) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500 hover:shadow-lg transition-shadow duration-300"
                                >
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 bg-orange-500 rounded-full mr-4 flex-shrink-0"></div>
                                        <p className="text-gray-800 font-medium">{landmark}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Organisation Section */}
                    <section className="mb-20">
                        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
                            <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
                                {organised.title}
                            </h2>
                            <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full mb-8"></div>
                            <p className="text-xl text-gray-700 text-center max-w-4xl mx-auto leading-relaxed">
                                {organised.description}
                            </p>
                        </div>
                    </section>

                    {/* Looking Ahead Section */}
                    <section>
                        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl text-white p-8 md:p-12 text-center">
                            <h2 className="text-4xl font-bold mb-6">{cta.title}</h2>
                            <div className="w-20 h-1 bg-yellow-400 mx-auto rounded-full mb-8"></div>
                            <p className="text-xl leading-relaxed max-w-4xl mx-auto">
                                {cta.description}
                            </p>
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <p className="text-lg opacity-80">
                            © 2024 Deravasi Mahajan Community. Serving with faith since 1914.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}

