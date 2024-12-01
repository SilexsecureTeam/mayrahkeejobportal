import Banner from '../components/Landing/Banner';
import Footer from '../components/Landing/Footer';
import Navbar from '../components/Landing/Navbar';
import Empowering from '../components/Landing/Empowering';
import InfoSection from '../components/Landing/InfoSection';
import missionImg from '../assets/pngs/about3.png'
import visionImg from '../assets/pngs/about4.png'
const AboutUs = () => {
    window.scrollTo(0, 0)
    return (
        <>
            <div className='relative max-w-[1200px] w-full mx-auto'>
                <Navbar />
                <main className="relative my-20 px-5 h-auto flex flex-col gap-5">
                    <Banner title="About Us" desc="Connecting talent to opportunities with integrity and innovation." />
                    <Empowering />
                    <InfoSection
                        title="Our Mission"
                        description="Our mission is to become Africa’s most trusted and comprehensive online platform for recruitment. We strive to provide innovative and customized solutions that seamlessly connect employers, service providers, and job seekers."
                        buttonText="Get Started Now"
                        imageSrc={missionImg}
                        reverse={false}
                    />
                    <InfoSection
                        title="Vision Statement"
                        description="Our vision is to be recognized as Africa’s foremost recruitment partner and employer of choice. We aim to set new benchmarks for innovation, ethical practices, and leadership in the industry."
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