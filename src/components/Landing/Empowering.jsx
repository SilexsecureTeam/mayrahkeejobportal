import img1 from '../../assets/pngs/about2.png';
import img2 from '../../assets/pngs/about1.png';

const Empowering = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8">
      {/* Text Section */}
      <section className="w-full md:w-1/2 flex flex-col gap-2 md:gap-4 lg:gap-6">
        <h4 className="capitalize font-bold text-xl md:text-2xl lg:text-3xl">
          Redefining Recruitment. <span className="text-green-800 line-through">Empowering</span> potential
        </h4>
        <p className="text-sm md:text-base">
          At Mayrahkee Anica, we are committed to providing cutting-edge industry-leading recruitment solutions online. Our unique culture and values stem from the tenets of our principles on leadership, which allows us to be relentless in our mission of becoming the preferred online recruitment solution provider in Africa and the employer of choice that imbibes and promotes ethical business practices in a safe work environment. We are accountable and demonstrate leadership principles in our search for the right human capital assets, which are central to our business decisions. <br /> 
          At Mayrahkee Africa, we thrive to harness full potential, promote mental well-being, increase productivity, and ultimately increase organizational capacity, growth, and sustainability.
        </p>
      </section>

      {/* Image Section */}
      <section className="w-full md:w-1/2 flex flex-row gap-3 md:px-3 md:gap-6 lg:gap-8">
        <img
          className="w-1/2 h-auto object-cover rounded-xl"
          src={img1}
          alt="Empowering 1"
        />
        <img
          className="w-1/2 h-auto object-cover rounded-xl"
          src={img2}
          alt="Empowering 2"
        />
      </section>
    </div>
  );
};

export default Empowering;
