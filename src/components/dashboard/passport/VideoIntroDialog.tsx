
"use client";

import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, SkipForward } from "lucide-react";
import { useEffect, useRef } from "react";

interface VideoIntroDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onVideoEnd: () => void;
    videoSrc: string;
}

export default function VideoIntroDialog({ isOpen, onClose, onVideoEnd, videoSrc }: VideoIntroDialogProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if(isOpen && videoRef.current) {
            videoRef.current.play().catch(error => {
                console.error("Video autoplay failed:", error)
            });
        }
    }, [isOpen]);

    const handleSkip = () => {
        if(videoRef.current) {
            videoRef.current.pause();
        }
        onVideoEnd(); // Treat skipping as the video ending
    }

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl p-0 border-0 bg-black text-white" hideCloseButton>
                <div className="relative aspect-video">
                    <video 
                        ref={videoRef}
                        src={videoSrc}
                        onEnded={onVideoEnd}
                        className="w-full h-full object-contain"
                        controls={false}
                        autoPlay
                        playsInline
                    />
                     <div className="absolute top-4 right-4 flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={handleSkip} className="bg-transparent text-white hover:bg-white/10 hover:text-white">
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

// Modify the DialogContent component to conditionally render the close button
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

const OriginalDialogContent = DialogPrimitive.Content;
const DialogCloseButton = DialogPrimitive.Close;

const NewDialogContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & { hideCloseButton?: boolean }
>(({ className, children, hideCloseButton, ...props }, ref) => (
    <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/90 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <OriginalDialogContent
            ref={ref}
            className={cn(
                "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
                className
            )}
            {...props}
        >
            {children}
            {!hideCloseButton && (
                <DialogCloseButton className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </DialogCloseButton>
            )}
        </OriginalDialogContent>
    </DialogPrimitive.Portal>
));
NewDialogContent.displayName = "NewDialogContent"

// @ts-ignore
Dialog.Content = NewDialogContent;
