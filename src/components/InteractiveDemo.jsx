import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

function FadeUp({ children, delay = 0, className = '' }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function InteractiveDemo() {
  // Communication Environment Controls
  const [cellularOnline, setCellularOnline] = useState(true);
  const [astraNearby, setAstraNearby] = useState(true);
  const [hubNearby, setHubNearby] = useState(true);

  // System Test State
  const [sosActive, setSosActive] = useState(false);
  const [simState, setSimState] = useState('IDLE'); // IDLE, TRIGGERED, GNSS_FIX, PACKET_BUILT, ROUTING, DELIVERED, FAILED
  const [activeRoute, setActiveRoute] = useState(null); // DIRECT, PEER, HUB, NONE
  const [logs, setLogs] = useState([]);
  const logContainerRef = useRef(null);

  const addLog = (time, subsystem, event, status = 'info') => {
    setLogs((prev) => [...prev, { time, subsystem, event, status }]);
  };

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Execute Routing Simulation Sequence
  const runSimulation = () => {
    if (sosActive) return;
    setSosActive(true);
    setSimState('TRIGGERED');
    setActiveRoute(null);
    setLogs([]);

    addLog('00:00.000', 'SOS_INPUT', 'PHYSICAL INTERRUPT TRIGGERED', 'alert');

    setTimeout(() => {
      setSimState('GNSS_FIX');
      addLog('00:00.142', 'GNSS', 'REQUEST_SATELLITE_FIX', 'info');
    }, 400);

    setTimeout(() => {
      addLog('00:01.840', 'GNSS', 'FIX_ACQUIRED [28.6219° N, 77.0878° E]', 'success');
    }, 1200);

    setTimeout(() => {
      setSimState('PACKET_BUILT');
      addLog('00:01.844', 'PACKET', 'ENCRYPTED SOS PAYLOAD ASSEMBLED', 'info');
    }, 1800);

    setTimeout(() => {
      setSimState('ROUTING');
      evaluateRouting(cellularOnline, astraNearby, hubNearby);
    }, 2500);
  };

  // Evaluate Routing Priority Matrix
  const evaluateRouting = (cell, peer, hub) => {
    if (cell) {
      setActiveRoute('DIRECT');
      addLog('00:01.912', 'CELLULAR', '4G LTE LINK ACTIVE (SIMCom A7670C)', 'success');
      addLog('00:02.400', 'TRANSMIT', 'DIRECT SMS DISPATCH TO CONTACT', 'info');
      setTimeout(() => {
        setSimState('DELIVERED');
        addLog('00:03.250', 'ALERT', 'DIRECT CELLULAR ALERT DELIVERED ✓', 'success');
      }, 1000);
    } else if (peer) {
      setActiveRoute('PEER');
      addLog('00:01.912', 'CELLULAR', 'NO_SERVICE (PRIMARY PATH OFFLINE)', 'error');
      addLog('00:01.918', 'ROUTER', 'SEARCHING_NEARBY_PEERS', 'alert');
      addLog('00:02.481', 'LORA', 'ASTRA_02_FOUND (RSSI: -82dBm)', 'success');
      addLog('00:02.602', 'PACKET', 'RELAY_TX OVER 868MHz LORA MESH', 'info');
      addLog('00:03.104', 'ASTRA_02', 'PACKET_RECEIVED & FORWARDING', 'info');
      setTimeout(() => {
        setSimState('DELIVERED');
        addLog('00:04.082', 'ALERT', 'RELAYED ALERT DELIVERED VIA ASTRA-TO-ASTRA ✓', 'success');
      }, 1200);
    } else if (hub) {
      setActiveRoute('HUB');
      addLog('00:01.912', 'CELLULAR', 'NO_SERVICE (PRIMARY PATH OFFLINE)', 'error');
      addLog('00:01.918', 'ROUTER', 'SEARCHING_NEARBY_PEERS', 'alert');
      addLog('00:02.210', 'PEER', 'PEER_NOT_FOUND', 'error');
      addLog('00:02.340', 'ROUTER', 'SEARCHING_ASTRA_HUB', 'alert');
      addLog('00:02.890', 'LORA', 'HUB_RECEIVER_01_FOUND', 'success');
      addLog('00:03.120', 'PACKET', 'HUB_RELAY_TRANSMIT', 'info');
      setTimeout(() => {
        setSimState('DELIVERED');
        addLog('00:04.150', 'ALERT', 'ALERT DELIVERED VIA ASTRA HUB RELAY ✓', 'success');
      }, 1200);
    } else {
      setActiveRoute('NONE');
      addLog('00:01.912', 'CELLULAR', 'NO_SERVICE (PRIMARY PATH OFFLINE)', 'error');
      addLog('00:02.210', 'PEER', 'NO_PEER_FOUND', 'error');
      addLog('00:02.540', 'HUB', 'NO_HUB_FOUND', 'error');
      addLog('00:02.800', 'ROUTER', 'NO_PATH_AVAILABLE — RETRYING ROUTES...', 'error');
      setTimeout(() => {
        setSimState('FAILED');
      }, 800);
    }
  };

  // Dynamically re-evaluate if user toggles environment switches during an active run
  useEffect(() => {
    if (sosActive && simState === 'DELIVERED' || simState === 'FAILED' || simState === 'ROUTING') {
      evaluateRouting(cellularOnline, astraNearby, hubNearby);
    }
  }, [cellularOnline, astraNearby, hubNearby]);

  const resetDemo = () => {
    setSosActive(false);
    setSimState('IDLE');
    setActiveRoute(null);
    setLogs([]);
  };

  return (
    <section id="demo" className="py-24 md:py-36 px-6 max-w-[1440px] mx-auto border-t border-[var(--border)] relative overflow-hidden">
      <FadeUp className="text-center mb-16">
        <div className="font-mono text-[10px] tracking-[0.25em] text-[var(--signal-red)] uppercase mb-4 font-bold">
          / INTERACTIVE DEMONSTRATION
        </div>
        <h2 className="font-space text-[40px] md:text-[68px] text-[var(--text-primary)] font-bold leading-[1.0] mb-6">
          ASTRA // EMERGENCY<br />ROUTING SIMULATOR
        </h2>
        <p className="font-inter text-[17px] text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
          "Trigger an SOS. Then start removing communication paths."
        </p>
      </FadeUp>

      {/* Main 3-Zone Control System Container */}
      <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xs p-6 md:p-10 max-w-6xl mx-auto shadow-2xl relative">
        
        {/* Top Telemetry Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--border)] font-mono text-[11px]">
          <div className="flex items-center gap-3">
            <span className="text-[var(--text-primary)] font-bold tracking-wider">SYSTEM MONITOR</span>
            <span className="text-[var(--text-muted)]">|</span>
            <span className="text-[var(--text-secondary)]">DEVICE: ASTRA_01</span>
          </div>

          <div className="flex items-center gap-5 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="text-[var(--text-muted)]">GNSS:</span>
              <span className={simState !== 'IDLE' && simState !== 'TRIGGERED' ? 'text-[var(--green)] font-bold' : 'text-[var(--text-muted)]'}>
                {simState !== 'IDLE' && simState !== 'TRIGGERED' ? 'FIX ✓' : 'STANDBY'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[var(--text-muted)]">CELLULAR:</span>
              <span className={cellularOnline ? 'text-[var(--green)] font-bold' : 'text-[var(--signal-red)] font-bold'}>
                {cellularOnline ? 'ONLINE' : 'OFFLINE ✕'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[var(--text-muted)]">PEER RELAY:</span>
              <span className={astraNearby ? 'text-[var(--text-primary)] font-bold' : 'text-[var(--text-muted)]'}>
                {astraNearby ? 'AVAILABLE' : 'NOT FOUND ✕'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[var(--text-muted)]">HUB RELAY:</span>
              <span className={hubNearby ? 'text-[var(--text-primary)] font-bold' : 'text-[var(--text-muted)]'}>
                {hubNearby ? 'AVAILABLE' : 'NOT FOUND ✕'}
              </span>
            </div>
          </div>
        </div>

        {/* 3-Zone Layout Grid */}
        <div className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-[var(--border)]">
          
          {/* ZONE 1 (LEFT): PHYSICAL SOS CONTROL */}
          <div className="lg:col-span-3 flex flex-col items-center justify-center p-4 border-b lg:border-b-0 lg:border-r border-[var(--border)]">
            <div className="font-mono text-[10px] text-[var(--text-secondary)] tracking-widest uppercase mb-4 font-bold">
              PHYSICAL HARDWARE SOS
            </div>
            
            <button
              onClick={runSimulation}
              disabled={sosActive}
              className={`relative group w-36 h-36 rounded-full border-4 flex flex-col items-center justify-center font-space font-bold text-[18px] tracking-wider transition-all duration-200 active:scale-95 ${
                sosActive
                  ? 'border-[var(--signal-red)] bg-[var(--signal-red)] text-white shadow-[0_0_35px_rgba(204,43,43,0.6)]'
                  : 'border-[var(--signal-red)] text-[var(--signal-red)] hover:bg-[var(--signal-red)] hover:text-white hover:shadow-[0_0_25px_rgba(204,43,43,0.35)]'
              }`}
            >
              {/* LED ring */}
              <span
                className={`absolute top-3 w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                  sosActive ? 'bg-white animate-ping' : 'bg-[var(--signal-red)] opacity-50'
                }`}
              />
              <span className="mt-2">{sosActive ? 'ACTIVE' : 'PRESS SOS'}</span>
            </button>

            <button
              onClick={resetDemo}
              className="mt-6 font-mono text-[10px] text-[var(--text-muted)] hover:text-[var(--text-primary)] tracking-widest uppercase underline"
            >
              RESET SIMULATION
            </button>
          </div>

          {/* ZONE 2 (CENTER): LIVE ROUTING VISUALIZATION */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-2 min-h-[300px] relative">
            <div className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase mb-6 font-bold">
              LIVE SIGNAL ROUTING VISUALIZATION
            </div>

            {/* SVG Interactive Architecture Network Nodes */}
            <div className="w-full flex flex-col items-center gap-6 font-mono text-[11px] relative">
              
              {/* End Point / Contact */}
              <div className={`px-5 py-2.5 border rounded-xs transition-all duration-500 font-bold ${
                simState === 'DELIVERED' ? 'border-[var(--green)] text-[var(--green)] bg-green-500/10 shadow-lg' : 'border-[var(--border)] text-[var(--text-muted)]'
              }`}>
                [ EMERGENCY CONTACT / AUTHORIZED ENDPOINT ]
              </div>

              {/* Direct Cellular Link */}
              <div className="w-full flex items-center justify-center gap-2">
                <div className={`h-12 w-0.5 transition-colors duration-500 ${activeRoute === 'DIRECT' ? 'bg-[var(--signal-red)]' : 'bg-[var(--border)]'}`} />
              </div>

              {/* Middle Layer Nodes: Cellular / Peers / Hub */}
              <div className="grid grid-cols-3 gap-3 w-full text-center">
                {/* 4G Cellular Node */}
                <div className={`p-3 border rounded-xs transition-all duration-500 ${
                  cellularOnline
                    ? activeRoute === 'DIRECT' ? 'border-[var(--signal-red)] text-[var(--signal-red)] bg-[var(--signal-red-bg)] font-bold' : 'border-[var(--border)] text-[var(--text-primary)]'
                    : 'border-red-900/40 text-red-900/60 line-through bg-red-950/20'
                }`}>
                  <div className="font-bold">4G LTE</div>
                  <div className="text-[9px] text-[var(--text-muted)] mt-0.5">{cellularOnline ? 'CELLULAR ONLINE' : 'NO SERVICE'}</div>
                </div>

                {/* Peer Relay Node */}
                <div className={`p-3 border rounded-xs transition-all duration-500 ${
                  astraNearby
                    ? activeRoute === 'PEER' ? 'border-[var(--signal-red)] text-[var(--signal-red)] bg-[var(--signal-red-bg)] font-bold' : 'border-[var(--border)] text-[var(--text-primary)]'
                    : 'border-[var(--border)] text-[var(--text-muted)] opacity-50'
                }`}>
                  <div className="font-bold">ASTRA B</div>
                  <div className="text-[9px] text-[var(--text-muted)] mt-0.5">{astraNearby ? 'PEER RELAY READY' : 'NOT NEARBY'}</div>
                </div>

                {/* Hub Node */}
                <div className={`p-3 border rounded-xs transition-all duration-500 ${
                  hubNearby
                    ? activeRoute === 'HUB' ? 'border-[var(--signal-red)] text-[var(--signal-red)] bg-[var(--signal-red-bg)] font-bold' : 'border-[var(--border)] text-[var(--text-primary)]'
                    : 'border-[var(--border)] text-[var(--text-muted)] opacity-50'
                }`}>
                  <div className="font-bold">ASTRA HUB</div>
                  <div className="text-[9px] text-[var(--text-muted)] mt-0.5">{hubNearby ? 'HUB RECEIVER READY' : 'NOT IN RANGE'}</div>
                </div>
              </div>

              {/* Lines down to Source ASTRA A */}
              <div className="w-full flex justify-between px-8">
                <div className={`h-8 w-0.5 transition-colors ${activeRoute === 'DIRECT' ? 'bg-[var(--signal-red)]' : 'bg-[var(--border)]'}`} />
                <div className={`h-8 w-0.5 transition-colors ${activeRoute === 'PEER' ? 'bg-[var(--signal-red)]' : 'bg-[var(--border)]'}`} />
                <div className={`h-8 w-0.5 transition-colors ${activeRoute === 'HUB' ? 'bg-[var(--signal-red)]' : 'bg-[var(--border)]'}`} />
              </div>

              {/* Source Node: ASTRA A */}
              <div className={`px-6 py-3 border rounded-xs font-bold transition-all duration-500 ${
                sosActive ? 'border-[var(--signal-red)] text-[var(--signal-red)] bg-[var(--signal-red-bg)]' : 'border-[var(--border)] text-[var(--text-primary)]'
              }`}>
                [ SOURCE: ASTRA_01 DEVICE ]
              </div>
            </div>
          </div>

          {/* ZONE 3 (RIGHT): COMMUNICATION ENVIRONMENT CONTROLS */}
          <div className="lg:col-span-3 flex flex-col gap-4 p-4 border-t lg:border-t-0 lg:border-l border-[var(--border)]">
            <div className="font-mono text-[10px] text-[var(--text-secondary)] tracking-widest uppercase mb-2 font-bold text-center">
              COMMUNICATION ENVIRONMENT
            </div>

            {/* Toggle 1: Cellular */}
            <button
              onClick={() => setCellularOnline(!cellularOnline)}
              className={`p-3 border rounded-xs font-mono text-[11px] text-left transition-all duration-300 flex items-center justify-between ${
                cellularOnline
                  ? 'border-[var(--border)] bg-[var(--bg)] text-[var(--text-primary)] hover:border-[var(--border-strong)]'
                  : 'border-[var(--signal-red)] bg-[var(--signal-red-bg)] text-[var(--signal-red)] font-bold'
              }`}
            >
              <div>
                <div className="text-[9px] text-[var(--text-muted)] uppercase">01 / PRIMARY ROUTE</div>
                <div>CELLULAR (4G)</div>
              </div>
              <span className={`px-2 py-0.5 text-[9px] rounded-xs font-bold ${cellularOnline ? 'bg-green-500/20 text-[var(--green)]' : 'bg-red-500/20 text-[var(--signal-red)]'}`}>
                {cellularOnline ? 'ONLINE' : 'OFFLINE'}
              </span>
            </button>

            {/* Toggle 2: Nearby ASTRA */}
            <button
              onClick={() => setAstraNearby(!astraNearby)}
              className={`p-3 border rounded-xs font-mono text-[11px] text-left transition-all duration-300 flex items-center justify-between ${
                astraNearby
                  ? 'border-[var(--border)] bg-[var(--bg)] text-[var(--text-primary)] hover:border-[var(--border-strong)]'
                  : 'border-amber-500/60 bg-amber-500/10 text-amber-500 font-bold'
              }`}
            >
              <div>
                <div className="text-[9px] text-[var(--text-muted)] uppercase">02 / PEER LORA RELAY</div>
                <div>NEARBY ASTRA</div>
              </div>
              <span className={`px-2 py-0.5 text-[9px] rounded-xs font-bold ${astraNearby ? 'bg-green-500/20 text-[var(--green)]' : 'bg-amber-500/20 text-amber-500'}`}>
                {astraNearby ? 'AVAILABLE' : 'ABSENT'}
              </span>
            </button>

            {/* Toggle 3: ASTRA Hub */}
            <button
              onClick={() => setHubNearby(!hubNearby)}
              className={`p-3 border rounded-xs font-mono text-[11px] text-left transition-all duration-300 flex items-center justify-between ${
                hubNearby
                  ? 'border-[var(--border)] bg-[var(--bg)] text-[var(--text-primary)] hover:border-[var(--border-strong)]'
                  : 'border-amber-500/60 bg-amber-500/10 text-amber-500 font-bold'
              }`}
            >
              <div>
                <div className="text-[9px] text-[var(--text-muted)] uppercase">03 / LOCAL INFRASTRUCTURE</div>
                <div>ASTRA HUB</div>
              </div>
              <span className={`px-2 py-0.5 text-[9px] rounded-xs font-bold ${hubNearby ? 'bg-green-500/20 text-[var(--green)]' : 'bg-amber-500/20 text-amber-500'}`}>
                {hubNearby ? 'AVAILABLE' : 'ABSENT'}
              </span>
            </button>

            <div className="font-mono text-[9px] text-[var(--text-muted)] text-center mt-2 leading-relaxed">
              Click toggles above to simulate path outages & test automatic rerouting logic.
            </div>
          </div>
        </div>

        {/* TELEMETRY TERMINAL LOG AREA */}
        <div className="mt-6 bg-[var(--bg)] border border-[var(--border)] p-4 font-mono text-[11px] h-44 overflow-y-auto rounded-xs" ref={logContainerRef}>
          <div className="text-[var(--text-muted)] mb-2 tracking-widest font-bold">// SIMULATION TELEMETRY (UI ROUTING SEQUENCE)</div>
          {logs.length === 0 ? (
            <div className="text-[var(--text-muted)] italic">Awaiting SOS trigger... Press "PRESS SOS" to test emergency routing sequence.</div>
          ) : (
            logs.map((log, i) => (
              <div key={i} className="flex items-start gap-4 py-0.5">
                <span className="text-[var(--text-muted)] flex-shrink-0">{log.time}</span>
                <span className="text-[var(--text-secondary)] font-bold w-20 flex-shrink-0">{log.subsystem}</span>
                <span className={
                  log.status === 'error' ? 'text-[var(--signal-red)] font-bold' :
                  log.status === 'success' ? 'text-[var(--green)] font-bold' :
                  log.status === 'alert' ? 'text-amber-500 font-bold' :
                  'text-[var(--text-primary)]'
                }>
                  {log.event}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Dynamic Status / Result Banners */}
        {simState === 'DELIVERED' && (
          <div className="mt-6 p-4 border border-[var(--green)] bg-green-500/10 text-center font-mono text-[12px] text-[var(--green)] font-bold rounded-xs">
            ALERT DELIVERED ✓ &nbsp;·&nbsp; ROUTE: {
              activeRoute === 'DIRECT' ? 'DIRECT CELLULAR (4G)' :
              activeRoute === 'PEER' ? 'ASTRA-TO-ASTRA LORA RELAY' :
              'ASTRA HUB RELAY'
            }
          </div>
        )}

        {simState === 'FAILED' && (
          <div className="mt-6 p-4 border border-[var(--signal-red)] bg-[var(--signal-red-bg)] text-center font-mono text-[12px] text-[var(--signal-red)] font-bold rounded-xs animate-pulse">
            NO COMMUNICATION PATH AVAILABLE · SOS REMAINS ACTIVE · RETRYING AVAILABLE ROUTES...
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-6 text-center font-mono text-[10px] text-[var(--text-muted)]">
          Simulation of ASTRA's multi-path communication architecture. Timings represent UI simulation sequence.
        </div>
      </div>
    </section>
  );
}
