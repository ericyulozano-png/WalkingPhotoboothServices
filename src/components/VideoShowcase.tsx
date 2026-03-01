import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Play } from "lucide-react";

interface VideoCardProps {
  src?: string;          // direct media file url
  embed?: string;        // iframe embed url (e.g. Facebook)
  poster?: string;
  title: string;
  subtitle: string;
  delay?: number;
  onVideoMount?: (index: number, videoElement: HTMLVideoElement) => void;
  videoIndex?: number;
}

function VideoCard({ src, embed, poster, title, subtitle, delay = 0, onVideoMount, videoIndex }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Register video ref when mounted
  useEffect(() => {
    if (videoRef.current && onVideoMount && videoIndex !== undefined) {
      onVideoMount(videoIndex, videoRef.current);
    }
  }, [onVideoMount, videoIndex]);

  // Auto-pause when scrolled out of view (only applies to <video>)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && videoRef.current) {
          videoRef.current.pause();
        }
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // render iframe if an embed URL is provided
  if (embed) {
    return (
      <div className="flex flex-col">
        <div className="relative group overflow-hidden bg-[#0D0C0B]">
          <iframe
            src={embed}
            width="100%"
            height="100%"
            className="aspect-video"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="mt-5">
          <h3 className="font-['Fraunces'] text-xl font-bold text-[#F5F0E8] mb-1">{title}</h3>
          <p className="font-['Plus_Jakarta_Sans'] text-sm text-[#F5F0E8]/40">{subtitle}</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex flex-col">
      <div className="relative group overflow-hidden bg-[#0D0C0B]">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="w-full aspect-video object-contain bg-black opacity-80 group-hover:opacity-90 transition-opacity duration-300"
          controls={false}
          playsInline
          preload="none"
          loop
        />
        {/* Custom play button overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={() => {
            if (videoRef.current && videoRef.current.paused) {
              videoRef.current.play();
              videoRef.current.setAttribute("controls", "true");
            }
          }}
        >
          <div className="w-16 h-16 rounded-full bg-[#F5F0E8]/15 backdrop-blur-sm border border-[#F5F0E8]/20 flex items-center justify-center hover:bg-[#C0522B]/80 hover:border-[#C0522B] transition-all duration-300 group-hover:scale-110">
            <Play size={20} className="text-[#F5F0E8] ml-1" fill="currentColor" />
          </div>
        </div>
      </div>
      <div className="mt-5">
        <h3 className="font-['Fraunces'] text-xl font-bold text-[#F5F0E8] mb-1">{title}</h3>
        <p className="font-['Plus_Jakarta_Sans'] text-sm text-[#F5F0E8]/40">{subtitle}</p>
      </div>
    </div>
  );
}

export default function VideoShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const allVideosRef = useRef<(HTMLVideoElement | null)[]>([]);

  // Handle video mounting and auto-pause other videos when one plays
  const handleVideoMount = (index: number, videoElement: HTMLVideoElement) => {
    allVideosRef.current[index] = videoElement;

    // When a video plays, pause all others
    const handlePlay = () => {
      allVideosRef.current.forEach((video, idx) => {
        if (idx !== index && video) {
          video.pause();
        }
      });
    };

    videoElement.addEventListener("play", handlePlay);
    return () => videoElement.removeEventListener("play", handlePlay);
  };

  const videos = [
    {
      src: "/Recording%202026-03-01%20191941.mp4",
      poster: "/recording-poster.jpg",
      title: "My Video",
      subtitle: "Recorded March 1, 2026",
    },
    {
      src: "The Walking PhotoBooth PH featured on ABS-CBN (Kabuhayang Swak na Swak).mp4",
      poster: "https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=800&q=80",
      title: "Product Launch — Artefact Co.",
      subtitle: "Director: Sofia Mendes · 01:58",
    },
  ];

  return (
    <section id="video" ref={ref} className="bg-[#0D0C0B] py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-14"
        >
          <p className="font-['Space_Grotesk'] text-xs tracking-[0.2em] uppercase text-[#C0522B] mb-4">
            Motion & Film
          </p>
          <h2 className="font-['Fraunces'] text-4xl lg:text-5xl font-black text-[#F5F0E8] leading-tight max-w-lg">
            Stories in
            <span className="italic"> motion.</span>
          </h2>
        </motion.div>

        {/* Video grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {videos.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <VideoCard
                {...v}
                delay={i * 0.15}
                videoIndex={i}
                onVideoMount={handleVideoMount}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
