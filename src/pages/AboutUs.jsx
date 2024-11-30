
import Banner from '../components/Landing/Banner';
import Empowering from '../components/Landing/Empowering';
const AboutUs=()=>{
    return(
        <div className="flex flex-col gap-4 justify-center items-center min-h-32">
            <Banner title="About Us" desc="Connecting talent to opportunities with integrity and innovation." />
            <Empowering />
        </div>
    )
}

export default AboutUs;