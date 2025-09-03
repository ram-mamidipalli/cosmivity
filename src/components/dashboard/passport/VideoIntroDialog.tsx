
"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, SkipForward, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface VideoIntroDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onVideoEnd: () => void;
    videoSrc: string;
}

export default function VideoIntroDialog({ isOpen, onClose, onVideoEnd, videoSrc }: VideoIntroDialogProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [showControls, setShowControls] = useState(true);
    let controlsTimeout: NodeJS.Timeout;

    useEffect(() => {
        if (isOpen && videoRef.current) {
            videoRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch(error => {
                console.error("Video autoplay failed:", error);
                setIsPlaying(false);
            });
        }
    }, [isOpen]);

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                setIsPlaying(false);
            } else {
                videoRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    const handleSkip = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
        onVideoEnd(); // Treat skipping as the video ending
    }

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const handleSeek = (value: number[]) => {
        if (videoRef.current) {
            videoRef.current.currentTime = value[0];
            setCurrentTime(value[0]);
        }
    };
    
    const handleVolumeChange = (value: number[]) => {
        if (videoRef.current) {
            const newVolume = value[0];
            videoRef.current.volume = newVolume;
            setVolume(newVolume);
            setIsMuted(newVolume === 0);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            if (isMuted) {
                videoRef.current.muted = false;
                setVolume(0.5); // Restore to a default volume
                videoRef.current.volume = 0.5;
                setIsMuted(false);
            } else {
                videoRef.current.muted = true;
                setVolume(0);
                setIsMuted(true);
            }
        }
    }
    
     const handleMouseMove = () => {
        setShowControls(true);
        clearTimeout(controlsTimeout);
        controlsTimeout = setTimeout(() => {
            if (isPlaying) {
                setShowControls(false);
            }
        }, 3000);
    };

    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };


    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl p-0 border-0 bg-black text-white" hideCloseButton>
                <div className="relative aspect-video group" onMouseMove={handleMouseMove}>
                    <video
                        ref={videoRef}
                        src={videoSrc}
                        onEnded={onVideoEnd}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        className="w-full h-full object-contain"
                        autoPlay
                        playsInline
                    />
                    <div className={cn(
                        "absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300",
                         showControls ? "opacity-100" : "opacity-0"
                    )}>
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" onClick={handlePlayPause} className="text-white hover:bg-white/10 hover:text-white">
                                {isPlaying ? <Pause /> : <Play />}
                            </Button>
                           <span className="text-xs font-mono">{formatTime(currentTime)}</span>
                            <Slider
                                value={[currentTime]}
                                max={duration}
                                step={1}
                                onValueChange={handleSeek}
                                className="w-full"
                            />
                            <span className="text-xs font-mono">{formatTime(duration)}</span>
                            <div className="flex items-center gap-2 w-32">
                                <Button variant="ghost" size="icon" onClick={toggleMute} className="text-white hover:bg-white/10 hover:text-white">
                                    {isMuted || volume === 0 ? <VolumeX /> : <Volume2 />}
                                </Button>
                                <Slider 
                                    value={[isMuted ? 0 : volume]}
                                    max={1}
                                    step={0.1}
                                    onValueChange={handleVolumeChange}
                                />
                            </div>
                        </div>
                    </div>
                     <div className={cn(
                        "absolute top-4 right-4 flex items-center gap-2 transition-opacity duration-300",
                        showControls ? "opacity-100" : "opacity-0"
                        )}>
                        <Button variant="outline" size="sm" onClick={handleSkip} className="bg-white/10 text-white hover:bg-white/20 hover:text-white">
                            Skip Intro <SkipForward className="ml-2 h-4 w-4"/>
                        </Button>
                     </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

// Add a prop to DialogContent to hide the default close button
declare module "@radix-ui/react-dialog" {
    interface DialogContentProps {
        hideCloseButton?: boolean;
    }
    interface DialogContentElement extends HTMLDivElement {
        hideCloseButton?: boolean;
    }
}
