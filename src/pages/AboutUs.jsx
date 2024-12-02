import Banner from '../components/Landing/Banner';
import Footer from '../components/Landing/Footer';
import Navbar from '../components/Landing/Navbar';
import Empowering from '../components/Landing/Empowering';
import InfoSection from '../components/Landing/InfoSection';
import tunnel from '../assets/pngs/Tunnel2.png'
import missionImg from '../assets/pngs/about3.png'
import visionImg from '../assets/pngs/about4.png'
const AboutUs = () => {
    window.scrollTo(0, 0)
    return (
        <>
            <div className='relative max-w-[1400px] w-full mx-auto'
                style={{
                    backgroundImage: `linear-gradient(rgba(250,250,250,.6), rgba(250,250,250,.6)), url(${tunnel})`,
                    backgroundPosition: 'center',
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundBlendMode: "overlay",
                    backgroundAttachment: "fixed"
                }}>
                <Navbar />
                <main className="relative my-20 px-5 h-auto flex flex-col gap-5">
                    <Banner title="About Us" desc="Connecting talent to opportunities with integrity and innovation." />
                    <Empowering />
                    <InfoSection
                        title="Our Mission"
                        description="To be the preferred one-stop online talent search and human capital recruitment company that provides solutions which meet(s) the needs of employers, service providers and job seekers in Africa.​"
                        buttonText="Get Started Now"
                        imageSrc={missionImg}
                        reverse={false}
                    />
                    <InfoSection
                        title="Vision Statement"
                        description="To be the preferred one-stop online talent search and human capital recruitment company that provides solutions which meet(s) the needs of employers, service providers and job seekers in Africa.​"
                        buttonText="Get Started Now"
                        imageSrc={visionImg}
                        reverse={true}
                    />
                </main>
            </div>
            <Footer />
        </>
    )
}

export default AboutUs;