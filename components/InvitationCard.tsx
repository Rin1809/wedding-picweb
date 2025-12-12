import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Play, Pause, SkipForward, SkipBack, Disc, Music, ChevronDown } from 'lucide-react';
import { WEDDING_PHOTOS, MUSIC_PLAYLIST } from '../constants';

const InvitationCard: React.FC = () => {
    const featuredPhoto = WEDDING_PHOTOS.find(p => p.id === 'photo-32') || WEDDING_PHOTOS[0];

    // Music Player State
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [hasAutoPlayed, setHasAutoPlayed] = useState(false);

    const currentTrack = MUSIC_PLAYLIST[currentTrackIndex];

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(e => {
                    console.log("Auto-play blocked by browser policy:", e);
                    setIsPlaying(false);
                });
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentTrackIndex]);

    const togglePlay = () => setIsPlaying(!isPlaying);

    const nextTrack = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % MUSIC_PLAYLIST.length);
        setIsPlaying(true);
    };

    const prevTrack = () => {
        setCurrentTrackIndex((prev) => (prev - 1 + MUSIC_PLAYLIST.length) % MUSIC_PLAYLIST.length);
        setIsPlaying(true);
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const prog = (audioRef.current.currentTime / audioRef.current.duratio10) * 100;
            setProgress(prog || 0);
        }
    };

    const handleEnded = () => {
        nextTrack();
    };

    return (
        <section id="invitation" className="py-32 px-4 flex justify-center items-center bg-wedding-soft relative overflow-hidden min-h-[80vh]">
            {/* Hidden Audio Element */}
            <audio
                ref={audioRef}
                src={currentTrack.src}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
            />

            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-wedding-champagne/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-wedding-gold/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                onViewportEnter={() => {
                    if (!hasAutoPlayed) {
                        setIsPlaying(true);
                        setHasAutoPlayed(true);
                    }
                }}
                transition={{ duration: 0.8 }}
                className="relative max-w-5xl w-full flex flex-col md:flex-row items-stretch"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >

                {/* Main Card */}
                <div className="relative z-20 w-full bg-white p-6 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-sm md:rounded-r-none md:pr-0 border-r-0">
                    {/* Inner Border */}
                    <div className="border border-wedding-gold/30 p-4 md:p-8 h-full flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-20 bg-white">

                        {/* Text Section */}
                        <div className="flex-1 text-center md:text-left space-y-6 order-2 md:order-1">
                            <div className="flex justify-center md:justify-start items-center gap-3 text-wedding-gold mb-2">
                                <span className="h-[1px] w-12 bg-wedding-gold/50"></span>
                                <Heart size={16} className="fill-current" />
                                <span className="h-[1px] w-12 bg-wedding-gold/50"></span>
                            </div>

                            <h3 className="font-script text-5xl md:text-6xl text-wedding-text leading-tight">
                                Save the Date
                            </h3>

                            <div className="space-y-4 font-serif text-wedding-accent">
                                <p className="text-lg tracking-wide uppercase">
                                    Chủ nhật, Ngày 28 Tháng 12 Năm 2025
                                </p>
                                <div className="h-[1px] w-24 bg-wedding-accent/20 mx-auto md:mx-0"></div>
                                <p className="italic text-base leading-relaxed">
                                    "Chúng tôi thương mời bạn đến chung vui và chúc phúc cho tình yêu của chúng tôi."
                                </p>
                            </div>

                            <div className="pt-4">
                                <span className="inline-block px-8 py-3 border border-wedding-text/80 text-wedding-text font-serif text-sm tracking-widest hover:bg-wedding-text hover:text-white transition-all duration-300 cursor-default">
                                    HIEN & THU
                                </span>
                            </div>
                        </div>

                        {/* Image Section */}
                        <div className="flex-1 w-full max-w-sm order-1 md:order-2">
                            <div className="relative aspect-[3/4] p-3 bg-white shadow-lg rotate-2 hover:rotate-0 transition-transform duration-700">
                                {/* Tape effect */}
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-wedding-champagne/40 backdrop-blur-sm rotate-[-2deg] shadow-sm z-10"></div>

                                <img
                                    src={featuredPhoto.url}
                                    alt="Couple"
                                    className="w-full h-full object-cover grayscale-[10%] sepia-[20%]"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Music Player "Slide Out" Section */}
                <motion.div
                    className="md:w-80 w-full bg-wedding-text text-white p-6 md:rounded-r-sm shadow-2xl z-10 flex flex-col justify-center relative overflow-hidden"
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
                    viewport={{ once: true }}
                >
                    {/* Background Vinyl Animation */}
                    <div className="absolute -right-20 -top-20 opacity-10">
                        <Disc size={200} className={isPlaying ? "animate-spin-slow" : ""} />
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4 text-wedding-gold">
                            <Music size={18} />
                            <span className="text-xs uppercase tracking-widest">Now Playing</span>
                        </div>

                        <h4 className="font-serif text-xl mb-1 truncate">{currentTrack.title}</h4>
                        <p className="text-white/60 text-sm mb-6">{currentTrack.artist}</p>

                        {/* Progress Bar */}
                        <div className="w-full h-1 bg-white/20 rounded-full mb-6 relative hover:cursor-pointer group"
                            onClick={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const width = rect.width;
                                const newTime = (x / width) * (audioRef.current?.duration || 0);
                                if (audioRef.current) audioRef.current.currentTime = newTime;
                            }}
                        >
                            <div
                                className="h-full bg-wedding-gold rounded-full relative transition-all duration-100"
                                style={{ width: `${progress}%` }}
                            >
                                <div className="absolute right-0 -top-1 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between px-4 mb-8">
                            <button onClick={prevTrack} className="hover:text-wedding-gold transition-colors">
                                <SkipBack size={24} />
                            </button>
                            <button
                                onClick={togglePlay}
                                className="w-14 h-14 rounded-full bg-white text-wedding-text flex items-center justify-center hover:scale-105 hover:bg-wedding-gold hover:text-white transition-all shadow-lg"
                            >
                                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                            </button>
                            <button onClick={nextTrack} className="hover:text-wedding-gold transition-colors">
                                <SkipForward size={24} />
                            </button>
                        </div>

                        {/* Playlist */}
                        <div className="border-t border-white/10 pt-4">
                            <h5 className="text-xs uppercase tracking-widest text-white/40 mb-3">Playlist</h5>
                            <div className="space-y-3 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                                {MUSIC_PLAYLIST.map((track, index) => (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            setCurrentTrackIndex(index);
                                            setIsPlaying(true);
                                        }}
                                        className={`flex items-center gap-3 p-2 rounded cursor-pointer transition-colors ${currentTrackIndex === index ? 'bg-white/10' : 'hover:bg-white/5'}`}
                                    >
                                        <div className={`w-1 h-8 rounded-full ${currentTrackIndex === index ? 'bg-wedding-gold' : 'bg-transparent'}`} />
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-sm truncate ${currentTrackIndex === index ? 'text-wedding-gold' : 'text-white/80'}`}>
                                                {track.title}
                                            </p>
                                            <p className="text-xs text-white/50 truncate">
                                                {track.artist}
                                            </p>
                                        </div>
                                        {currentTrackIndex === index && isPlaying && (
                                            <div className="flex gap-[2px] items-end h-3">
                                                <div className="w-[2px] h-full bg-wedding-gold animate-bounce" style={{ animationDelay: '0ms' }} />
                                                <div className="w-[2px] h-full bg-wedding-gold animate-bounce" style={{ animationDelay: '150ms' }} />
                                                <div className="w-[2px] h-full bg-wedding-gold animate-bounce" style={{ animationDelay: '300ms' }} />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

            </motion.div>

            {/* Scroll Down Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
            >
                <span className="font-serif text-wedding-accent/60 text-xs tracking-[0.2em] uppercase">Scroll Down</span>
                <ChevronDown className="text-wedding-accent/60 animate-bounce" size={20} />
            </motion.div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-wedding-soft to-transparent pointer-events-none z-20" />
        </section>
    );
};
export default InvitationCard;
