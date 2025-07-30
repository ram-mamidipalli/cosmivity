
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Video, Mic, VideoOff, MicOff, Lightbulb, SkipForward, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function InterviewSession({ session }: { session: any }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [isMicOn, setIsMicOn] = useState(true);
    
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const router = useRouter();
    const { toast } = useToast();

    const currentQuestion = session.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / session.questions.length) * 100;

    useEffect(() => {
        const getCameraPermission = async () => {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            streamRef.current = stream;
            setHasCameraPermission(true);
    
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          } catch (error) {
            console.error('Error accessing camera:', error);
            setHasCameraPermission(false);
            toast({
              variant: 'destructive',
              title: 'Camera & Mic Access Denied',
              description: 'Please enable camera and microphone permissions in your browser settings to use this feature.',
            });
          }
        };
    
        getCameraPermission();

        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        }
    }, [toast]);
    
    const toggleCamera = () => {
        if (streamRef.current) {
            streamRef.current.getVideoTracks().forEach(track => track.enabled = !isCameraOn);
            setIsCameraOn(!isCameraOn);
        }
    }

    const toggleMic = () => {
        if (streamRef.current) {
            streamRef.current.getAudioTracks().forEach(track => track.enabled = !isMicOn);
            setIsMicOn(!isMicOn);
        }
    }

    const handleNextQuestion = () => {
        if (currentQuestionIndex < session.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            // End of interview, navigate to report page
            router.push(`/dashboard/interviews/report/${session.id}`);
        }
    }

    const handleEndInterview = () => {
        router.push('/dashboard/interviews');
    }

    return (
        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-screen bg-secondary/30">
            <div className="lg:col-span-2 flex flex-col gap-8">
                <header className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold font-headline">{session.type} Interview</h1>
                        <p className="text-muted-foreground">Question {currentQuestionIndex + 1} of {session.questions.length}</p>
                    </div>
                     <Button variant="outline" size="sm" onClick={handleEndInterview}>
                        <XCircle className="mr-2"/> End Interview
                    </Button>
                </header>

                <Card className="flex-grow">
                    <CardHeader>
                        <CardTitle className="text-2xl">{currentQuestion.text}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mt-6 flex items-center gap-4">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline">
                                        <Lightbulb className="mr-2"/> Expert Tip
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <p className="text-sm">{currentQuestion.expertTip}</p>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </CardContent>
                </Card>

                 <div className="space-y-2">
                    <Progress value={progress} />
                    <p className="text-sm text-center text-muted-foreground">Overall Progress</p>
                </div>

                <div className="flex justify-end">
                     <Button onClick={handleNextQuestion} size="lg">
                        {currentQuestionIndex === session.questions.length - 1 ? "Finish & View Report" : "Next Question"}
                        <SkipForward className="ml-2"/>
                    </Button>
                </div>
            </div>
            <div className="lg:col-span-1 space-y-4">
                 <Card>
                    <CardContent className="p-4">
                        <div className="aspect-video bg-background rounded-lg flex items-center justify-center relative overflow-hidden">
                            <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                             {!isCameraOn && (
                                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white">
                                    <VideoOff className="h-12 w-12"/>
                                    <p className="mt-2">Camera Off</p>
                                </div>
                            )}
                        </div>
                         {hasCameraPermission === false && (
                            <Alert variant="destructive" className="mt-4">
                                <AlertTitle>Camera Access Required</AlertTitle>
                                <AlertDescription>
                                    Please allow camera access to use this feature.
                                </AlertDescription>
                            </Alert>
                        )}
                        <div className="flex items-center justify-center gap-4 mt-4">
                            <Button variant={isMicOn ? "secondary" : "destructive"} size="icon" onClick={toggleMic} disabled={hasCameraPermission !== true} className="rounded-full h-12 w-12">
                                {isMicOn ? <Mic /> : <MicOff />}
                            </Button>
                             <Button variant={isCameraOn ? "secondary" : "destructive"} size="icon" onClick={toggleCamera} disabled={hasCameraPermission !== true} className="rounded-full h-12 w-12">
                                {isCameraOn ? <Video /> : <VideoOff/>}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
