import img1 from '../../assets/pngs/student.png';
import img2 from '../../assets/pngs/student2.png';
const Empowering=()=>{
    return(
        <div className="flex flex-col md: flex-row gap-2" >
            {/* Left */}
            <section className="w-1/2 flex flex-col gap-2" >
                <h4 className="capitalize text-xl">Redifining Recruitment. <span className="text-green-600">Empowering</span> potential</h4>
                <p>At Mayrahkee Anica, we are committed to providing cutting-edge industry-leading recnatment solutions online. Our unique culture and values stem from the tonats of our principles on leadership, which allows us to be relentless in our mission of becoming the preferred online recruitment solution provider in Arica and the employer of choice that imbibes and promotes thical business practices in a safe work environment We are accountable and demonstrate leadership principles in our search for the night human capital assets which are central to our business decisionn

AtMayrankee Afica, we thrive to harness full potentials, promote mental well-being, increase productivity and ultimately increase organizational capacity growth and sustainability</p>
            </section>
            {/* Right */}
            <section className="flex flex-col md:flex-row gap-3">
                <img className="w-48 h-48" src={img1} alt="image"/>
   <img className="w-48 h-48" src={img2} alt="image"/>
            </section>
        </div>
    );
}

export default Empowering;