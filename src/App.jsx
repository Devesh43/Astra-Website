import React from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import ScrollText from './components/ScrollText';
import ProblemSection from './components/ProblemSection';
import WhyItMatters from './components/WhyItMatters';
import TheQuestion from './components/TheQuestion';
import Origin from './components/Origin';
import TheRealization from './components/TheRealization';
import MultiPath from './components/MultiPath';
import AstraToAstra from './components/AstraToAstra';
import MiniHub from './components/MiniHub';
import DemoTransition from './components/DemoTransition';
import InteractiveDemo from './components/InteractiveDemo';
import SystemStatus from './components/SystemStatus';
import InsideAstra from './components/InsideAstra';
import WhyLora from './components/WhyLora';
import GpsSection from './components/GpsSection';
import WeBuiltIt from './components/WeBuiltIt';
import Gallery from './components/Gallery';
import Timeline from './components/Timeline';
import Milestone from './components/Milestone';
import Research from './components/Research';
import Team from './components/Team';
import Closing from './components/Closing';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-[var(--bg)] text-[var(--text-primary)] min-h-screen transition-colors duration-250">
      <Nav />
      <main>
        {/* 01: Hero */}
        <Hero />
        
        {/* 02: Problem */}
        <ScrollText />
        <ProblemSection />
        
        {/* 03: Why It Matters (Real-world cases with citations) */}
        <WhyItMatters />
        
        {/* 04: The Question */}
        <TheQuestion />
        
        {/* 05: Origin (ASTRA V1 Prototype) */}
        <Origin />
        
        {/* 06: The Realization (Single Point of Failure) */}
        <TheRealization />
        
        {/* 07: Multi-Path System */}
        <MultiPath />
        
        {/* 08 & 09: Path 02 Peer Relay & Path 03 Hub Relay */}
        <AstraToAstra />
        <MiniHub />
        
        {/* 10 & 11: Simulator Transition & Interactive Simulator */}
        <DemoTransition />
        <InteractiveDemo />
        
        {/* 12: System Status */}
        <SystemStatus />
        
        {/* 13: Inside Astra / Hardware Teardown */}
        <InsideAstra />
        
        {/* 14 & 15: Why LoRa & GPS without Internet */}
        <WhyLora />
        <GpsSection />
        
        {/* 16: We Built It */}
        <WeBuiltIt />
        
        {/* 17: Prototype Gallery */}
        <Gallery />
        
        {/* 18: Evolution Timeline */}
        <Timeline />
        
        {/* 19: Funding Milestone */}
        <Milestone />
        
        {/* 20: Research */}
        <Research />
        
        {/* 21: Team */}
        <Team />
        
        {/* 22: Closing */}
        <Closing />
      </main>
      <Footer />
    </div>
  );
}

export default App;
