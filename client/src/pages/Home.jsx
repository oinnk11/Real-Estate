import hero from "../assets/hero.jpg";
import Input from "../components/Input";
import Button from "../components/Button";
import { Building2, ChevronRight, House, Search } from "lucide-react";
import listings from "../assets/data/listings";
import PropertyCard from "../components/PropertyCard";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="space-y-32 mb-24">
      {/* HERO SECTION */}
      <section className="relative w-full py-6 flex flex-col gap-12 items-center max-md:justify-center lg:flex-row pt-12 fluid min-h-[calc(100vh-200px)] bg-gradient-to-b from-white to-sky-50">
        <div className="w-full lg:w-[50%] space-y-8 lg:pl-12">
          <h1 className="text-4xl font-bold leading-relaxed max-lg:text-center">
            Find Real Estate <br /> That Best Suits You. 👌
          </h1>

          <p className="leading-relaxed text-center lg:text-justify text-muted">
            Discover your dream home with ease. Our real estate platform offers
            a wide range of properties for sale, tailored to fit your needs.
            Browse listings, explore neighborhoods, and find the perfect place
            to call home today.
          </p>
        </div>
        <div className="overflow-hidden flex-1">
          <img src={hero} className="rounded-lg w-[400px] m-auto" />
        </div>

        {/* SEARCH */}
        <div className="absolute -bottom-[5%] left-1/2 transform -translate-x-1/2 w-[90%] lg:w-[60%] rounded-lg border shadow-md py-6 px-8 bg-white">
          <h1 className="font-semibold text-xl">
            Search from our wide range of listings! 🔍
          </h1>
          <div className="flex flex-col md:flex-row items-center gap-4 w-full mt-5">
            <Input width="100%" placeholder="Location" />
            <Input width="100%" placeholder="Budget (Rs.)" />
            <Button
              classname="w-full"
              placeholder={
                <>
                  <Search className="size-5" />
                  <p className="ml-1">Search</p>
                </>
              }
            />
          </div>
        </div>
      </section>

      {/* WHY CHOOSE USE SECTION */}
      <section className="fluid space-y-12  py-6">
        <h3 className="text-primary font-medium uppercase">
          Why Choose Restate
        </h3>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-12">
          <h1 className="font-bold text-2xl xl:text-4xl leading-snug w-full">
            Provides the most complete list of property
          </h1>

          <p className="text-lg text-muted">
            Find the ideal property that is most suitable for you. Starting from
            houses for sale that are minimalist, apartments for sale that are
            exclusive.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="border rounded-lg shadow-md flex-1 p-8 min-h-[250px] flex flex-col gap-3">
            <House className="text-primary size-12" />

            <h2 className="font-bold text-2xl mt-6">Find your dream house</h2>

            <p className="text-muted text-justify mt-3">
              Many ads for apartments and houses for sale in various locations.
              Tao your finger the screen then open the door of your dream house
              from here
            </p>
          </div>

          <div className="border rounded-lg shadow-md flex-1 p-8 min-h-[250px] flex flex-col gap-3">
            <Building2 className="text-primary size-12" />

            <h2 className="font-bold text-2xl mt-6">
              Find a place for your business
            </h2>

            <p className="text-muted text-justify mt-3">
              Renting a place of business and buying and selling shop houses
              becomes easier. Meet your business and investment needs foster.
            </p>
          </div>

          <div className="border rounded-lg shadow-md flex-1 p-8 min-h-[250px] flex flex-col gap-3">
            <Search className="text-primary size-12" />

            <h2 className="font-bold text-2xl mt-6">Smart Search</h2>

            <p className="text-muted text-justify mt-3">
              Restate’s Smart Search makes finding your dream home easy by
              letting you filter properties based on your ideal location and
              budget.
            </p>
          </div>
        </div>
      </section>

      {/* LISTINGS SECTION */}
      <section className="fluid space-y-12 py-6">
        <div>
          <h3 className="text-primary font-medium uppercase">Property</h3>
        </div>

        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl xl:text-4xl leading-snug w-full">
            Top Viewed Properties
          </h1>
          <Link
            to="/listings"
            className="flex items-center text-sky-600 underline underline-offset-4 flex-1"
          >
            Explore <ChevronRight className="size-5" />
          </Link>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {listings.map((item) => (
            <PropertyCard
              title={item.title}
              img={item.imageUrl}
              location={item.location}
              price={item.price}
              bathroom={item.bathrooms}
              bedrooms={item.bedrooms}
              key={item.id + item.title}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
