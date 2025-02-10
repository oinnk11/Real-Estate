import pic1 from "../../assets/about.jpeg";
import pic2 from "../../assets/about-bottom.jpg";

const About = () => {
  return (
    <div className="px-4 md:px-12 lg:px-40 xl:px-60 2xl:px-80 py-12">
      <div className="flex items-center justify-center relative mb-20">
        <h1 className="absolute text-white font-bold text-5xl leading-tight md:text-7xl max-w-[350px] md:max-w-[500px] bottom-5 left-5">
          We help you find your dream place
        </h1>
        <img src={pic1} className="h-[500px] w-full object-cover" />
      </div>
      <h1 className="text-5xl font-bold mb-8">About Us</h1>

      <p className="text-lg text-justify mb-20">
        Welcome to Re-state, a project crafted with passion and dedication to
        revolutionizing property booking. Re-state brings together modern
        technologies to create an efficient, user-friendly platform that
        simplifies the process of connecting buyers, sellers, and administrators
        in the real estate space.
      </p>

      <h1 className="text-5xl font-bold mb-8">Our Purpose</h1>

      <p className="text-lg text-justify mb-5">
        Re-state aims to bridge the gap between buyers and sellers in the real
        estate market. By offering a straightforward and intuitive platform,
        Re-state aims to:
      </p>

      <ul className="list-disc ml-8 mt text-xl mb-20 space-y-4">
        <li>
          Simplify Property Searches: Helping buyers find the right property
          with minimal effort.
        </li>
        <li>
          Enhance Seller Outreach: Providing sellers with a space to effectively
          present their listings to potential buyers.
        </li>
        <li>
          Streamline Management: Assisting administrators in ensuring smooth
          operations and efficient coordination between all users.
        </li>
      </ul>

      <h1 className="text-5xl font-bold mb-8">The Vision</h1>

      <p className="text-lg text-justify mb-12">
        Re-state is more than just a project; it’s a stepping stone toward
        mastering problem-solving through technology. It’s a testament to the
        power of curiosity, determination, and the willingness to create
        solutions that matter.
      </p>

      <p className="text-lg text-justify mb-20">
        We’re excited to share our journey with you and hope it inspires future
        endeavors in innovation and learning.
      </p>

      <div className="flex items-center justify-center relative">
        <h1 className="absolute text-white font-bold text-5xl leading-tight md:text-7xl max-w-[300px] md:max-w-[700px] bottom-5 left-5">
          Thank you for visiting Re-state.
        </h1>
        <img src={pic2} className="h-[500px] w-full object-cover" />
      </div>
    </div>
  );
};

export default About;
