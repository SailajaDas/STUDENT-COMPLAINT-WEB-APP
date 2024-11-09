import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Building2 } from 'lucide-react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial state
    gsap.set([logoRef.current, textRef.current], { opacity: 0, y: 20 });
    gsap.set(progressRef.current, { scaleX: 0 });

    // Animation sequence
    tl.to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    })
    .to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.4")
    .to(progressRef.current, {
      scaleX: 1,
      duration: 1.2,
      ease: "power2.inOut"
    }, "-=0.2")
    .to([logoRef.current, textRef.current], {
      y: -20,
      opacity: 0,
      duration: 0.5,
      ease: "power2.in"
    })
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        // Ensure the container is hidden before calling onComplete
        if (containerRef.current) {
          containerRef.current.style.display = 'none';
        }
        onComplete();
      }
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center overflow-hidden z-50"
    >
      <div className="relative flex flex-col items-center">
        <div 
          ref={logoRef}
          className="relative z-10 bg-white/10 p-8 rounded-full backdrop-blur-sm"
        >
          <Building2 className="w-24 h-24 text-white" />
        </div>
        
        <div 
          ref={textRef}
          className="text-center mt-8 space-y-4"
        >
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Hostel Complaint System
          </h1>
          <p className="text-blue-100 text-lg">
            Streamlining your hostel experience
          </p>
        </div>

        <div className="w-64 h-1 bg-white/20 rounded-full mt-8 overflow-hidden">
          <div 
            ref={progressRef}
            className="h-full w-full bg-white rounded-full origin-left"
          />
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-[10px] opacity-30">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-purple-400 rounded-full filter blur-3xl animate-pulse delay-1000" />
          <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-indigo-400 rounded-full filter blur-3xl animate-pulse delay-500" />
        </div>
      </div>
    </div>
  );
}