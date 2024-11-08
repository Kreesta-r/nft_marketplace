import Image from "next/image";
import Link from "next/link";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { ArrowRight, Wallet, BarChart2, Shield, Award, Zap, Globe, Users, Sparkles } from 'lucide-react';

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

const trendingCollections = [
  {
    name: "Cosmic Dreamers",
    creator: "ElectricVisions",
    price: "2.5 ETH",
    growth: "+124%",
    image: "https://img.freepik.com/free-vector/gradient-galaxy-background_52683-140335.jpg?t=st=1731049413~exp=1731053013~hmac=cc648d37af00675355256d5d4bf821f9cccc87be8afbf45bd6e246ab26a224de&w=740"
  },
  {
    name: "Neo Animals",
    creator: "CryptoArtLab",
    price: "1.8 ETH",
    growth: "+86%",
    image: "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149619505.jpg?t=st=1731049079~exp=1731052679~hmac=b4ab6103b3141bffe6fe6087805727a179f827386c7db61b8940c9f46f9c9b1d&w=740"
  },
  {
    name: "Digital Realms",
    creator: "FutureMinds",
    price: "3.2 ETH",
    growth: "+95%",
    image: "https://img.freepik.com/free-photo/cyberpunk-bitcoin-illustration_23-2151611198.jpg?t=st=1731049342~exp=1731052942~hmac=3868b302fbaa778feab508e29b21761167f630f8c62e130dfea9e93fe27a1364&w=360"
  }
];

const categories = [
  { name: "Art", icon: Sparkles, count: "32,449" },
  { name: "Gaming", icon: Zap, count: "18,753" },
  { name: "Collectibles", icon: Globe, count: "24,129" },
  { name: "Virtual Worlds", icon: Users, count: "9,871" },
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
                Redefine Digital <span className="text-yellow-400">Ownership</span>
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

      {/* Trending Collections Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Trending Collections</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore the most popular and fastest-growing NFT collections in the marketplace
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {trendingCollections.map((collection, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300" />
                <div className="relative bg-gray-800 rounded-xl p-4">
                  <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-cover transform group-hover:scale-110 transition duration-500"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{collection.name}</h3>
                  <div className="flex justify-between items-center">
                    <div className="text-gray-400">by {collection.creator}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-500 font-semibold">{collection.price}</span>
                      <span className="text-green-400 text-sm">{collection.growth}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Explore Categories</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Dive into diverse NFT categories and discover unique digital assets
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link href={`/category/${category.name.toLowerCase()}`} key={index}
                className="group relative overflow-hidden rounded-xl bg-gray-800/50 hover:bg-gray-800 
                  transition-all duration-300 border border-gray-700 hover:border-blue-500">
                <div className="p-6">
                  <category.icon className="w-12 h-12 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-gray-400">{category.count} items</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-indigo-500/0 
                  group-hover:from-blue-500/10 group-hover:to-indigo-500/10 transition-all duration-300" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[url('/community-bg.svg')] opacity-5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Join Our Growing Community</h2>
            <p className="text-lg text-gray-300 mb-12">
              Connect with fellow creators, collectors, and enthusiasts. Share your passion for NFTs
              and be part of the future of digital art and collectibles.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm">
                <div className="text-3xl font-bold text-blue-500 mb-2">100K+</div>
                <div className="text-gray-400">Discord Members</div>
              </div>
              <div className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm">
                <div className="text-3xl font-bold text-indigo-500 mb-2">50K+</div>
                <div className="text-gray-400">Twitter Followers</div>
              </div>
              <div className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm">
                <div className="text-3xl font-bold text-purple-500 mb-2">25K+</div>
                <div className="text-gray-400">Daily Active Users</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur-2xl opacity-20" />
            <div className="relative p-8 md:p-12 rounded-2xl bg-gray-800/90 border border-gray-700">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
                <p className="text-gray-400 mb-8">
                  Subscribe to our newsletter for the latest drops, trending collections, and exclusive insights.
                </p>
                <form className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-4 bg-gray-900 rounded-xl border border-gray-700 focus:border-blue-500 
                      outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl font-semibold 
                      hover:opacity-90 transition-all whitespace-nowrap"
                  >
                    Subscribe Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-800" />
            <div className="relative p-12 md:p-20">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-6">Unleash Your Digital Creativity</h2>
                <p className="text-lg mb-8 text-gray-200">
                  Join the NFTmarket community and unlock a world of innovation, where your digital masterpieces
                  find their rightful place.
                </p>
                <Link href="/marketplace" 
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