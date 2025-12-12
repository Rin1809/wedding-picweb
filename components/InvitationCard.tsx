import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { WEDDING_PHOTOS } from '../constants';

const InvitationCard: React.FC = () => {
    // Use a specific photo for the card, maybe one of the portraits
    // Adjust index as needed to pick the best vertical/portrait shot
    const featuredPhoto = WEDDING_PHOTOS.find(p => p.id === 'photo-1') || WEDDING_PHOTOS[0];

    return (
        <section className="py-20 px-4 flex justify-center items-center bg-wedding-soft relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-wedding-champagne/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-wedding-gold/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="relative max-w-4xl w-full bg-white p-6 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-sm"
            >
                {/* Inner Border */}
                <div className="border border-wedding-gold/30 p-4 md:p-8 h-full flex flex-col md:flex-row items-center gap-8 md:gap-12">

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
                                Thứ Bảy, Ngày 15 Tháng 03 Năm 2025
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
            </motion.div>
        </section>
    );
};

export default InvitationCard;
