
import Banner from '../components/Landing/Banner';
import Footer from '../components/Landing/Footer';
import Navbar from '../components/Landing/Navbar';
import Empowering from '../components/Landing/Empowering';
const AboutUs=()=>{
    return(
    <div className='relative max-w-[1200px] w-full mx-auto'>
      <Navbar />
      <main className="relative my-20 px-5 h-auto">
        <Banner title="About Us" desc="Connecting talent to opportunities with integrity and innovation." />
            <Empowering />
<Footer /> 
      </main>
    </div>    
    )
}

export default AboutUs;