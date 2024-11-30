
import img1 from '../../assets/pngs/student.png';
import img2 from '../../assets/pngs/student2.png';

const Empowering = () => {
  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-6 lg:gap-8">
      <section className="w-full md:w-1/2 flex flex-col gap-2 md:gap-4 lg:gap-6">
        <h4 className="capitalize text-xl md:text-2xl lg:text-3xl">
          Redifining Recruitment. <span className="text-green-600">Empowering</span> potential
        </h4>
        <p className="text-sm md:text-base lg:text-lg">
          At Mayrahkee Anica, we are committed to providing cutting-edge industry-leading recruitment solutions online. Our unique culture and values stem from the tonats of our principles on leadership, which allows us to be relentless in our mission of becoming the preferred online recruitment solution provider in Africa and the employer of choice that imbibes and promotes ethical business practices in a safe work environment We are accountable and demonstrate leadership principles in our search for the right human capital assets which are central to our business decision. <br/> At Mayrankee Africa, we thrive to harness full potentials, promote mental well-being, increase productivity and ultimately increase organizational capacity growth and sustainability
        </p>
      </section>
      <section className="flex flex-col md:flex-row items-center gap-3 md:gap-6 lg:gap-8">
        <img className="w-48 h-48 md:w-64 md:h-64 object-cover" src={img1} alt="image" />
        <img className="w-48 h-48 md:w-64 md:h-64 object-cover" src={img2} alt="image" />
      </section>
    </div>
  );
};

export default Empowering;
