import Image from "next/image";
import Link from "next/link";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { ArrowRight, Wallet, BarChart2, Shield, Award } from 'lucide-react';

const stats = [
  { label: "Total Volume", value: "$243M+" },
  { label: "NFTs Created", value: "112K+" },
  { label: "Active Users", value: "54K+" },
  { label: "Artists", value: "8.2K+" },
];

const features = [
  {
    icon: Wallet,
    title: "Seamless Transactions",
    description: "Buy, sell, and manage your NFTs with ease using your preferred crypto wallet."
  },
  {
    icon: BarChart2,
    title: "Insightful Analytics",
    description: "Track market trends and collection performance in real-time for data-driven decisions."
  },
  {
    icon: Shield,
    title: "Robust Security",
    description: "Your digital assets are protected by advanced security measures for peace of mind."
  },
  {
    icon: Award,
    title: "Curated Collections",
    description: "Discover and invest in verified NFT collections from top artists and creators."
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      {/* Hero Section */}
      <main className="relative">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/10 to-indigo-800/10" />
        
        {/* Grid background */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

        <div className="container mx-auto px-4 pt-20 pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center relative">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500">
                Redefine Digital Ownership
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Unlock the future of collectibles and unleash your creativity at NFTmarket. Discover, create, and
                trade revolutionary NFTs that push the boundaries of innovation.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/marketplace" 
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl font-semibold 
                    hover:opacity-90 transition-all flex items-center gap-2 group">
                  Explore NFTs
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/sellNFT" 
                  className="px-8 py-4 bg-white/10 rounded-xl font-semibold hover:bg-white/20 
                    transition-all backdrop-blur-sm border border-white/10">
                  Start Creating
                </Link>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500">
                      {stat.value}
                    </div>
                    <div className="text-gray-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur-2xl opacity-30 animate-pulse" />
              <div className="relative">
                <Image
                  src="/pic1.png"
                  alt="NFTs"
                  width={1075}
                  height={650}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-24 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose NFTmarket</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover the cutting-edge features and secure platform that redefine the future of digital collectibles.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-2xl bg-gray-800/50 border border-gray-700 hover:border-blue-500 transition-colors">
                <feature.icon className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600" />
            <div className="relative p-12 md:p-20">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-6">Unleash Your Digital Creativity</h2>
                <p className="text-lg mb-8 text-gray-200">
                  Join the NFTmarket community and unlock a world of innovation, where your digital masterpieces
                  find their rightful place.
                </p>
                <Link href="/signup" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-xl 
                    font-semibold hover:bg-gray-100 transition-colors">
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}