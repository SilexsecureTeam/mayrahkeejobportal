import React from 'react'
//import FullTxtSection from '../components/Landing/FullTxtSection';
import Hero from '../components/Landing/Hero';
import Navbar from '../components/Landing/Navbar'
// import TxtImgSection from '../components/Landing/TxtImgSection';
// import TxtImgSection2 from '../components/Landing/TxtImgSection2';
// import InfoSection from '../components/Landing/InfoSection';
// import Services from '../components/Landing/Services';
// import FAQs from '../components/Landing/FAQs';
// import Testimony from '../components/Landing/Testimony';
// import Footer from '../components/Landing/Footer';

const LandingPage = () => {
  return (
    <div className='relative max-w-[1200px] w-full mx-auto'>
      <Navbar />
      <main className="relative top-20 px-5">
        <Hero />
        {/* <TxtImgSection />
        <TxtImgSection2 />
        <FullTxtSection />
        <InfoSection />
        <Services />
        <FAQs />
        <Testimony />
        <Footer /> */}
      </main>
    </div>    
  )
}

export default LandingPage