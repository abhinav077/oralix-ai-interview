"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import { useRouter } from "next/navigation";

// Stream Video
import {
  StreamVideoClient,
  StreamVideo,
  StreamCall,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "stream-chat-react/dist/css/index.css";

import { Loader2, RefreshCw } from "lucide-react";
import CallUI from "./CallUI";

export default function CallRoom({
  callId,
  token,
  apiKey,
  currentUser,
  booking,
  isInterviewer,
}) {
  const router = useRouter();
  const [videoClient, setVideoClient] = useState(null);
  const [call, setCall] = useState(null);
  const [connectionError, setConnectionError] = useState(null);
  const [retryKey, setRetryKey] = useState(0);
  const clientRef = useRef(null);
  const joinedRef = useRef(false);

  useEffect(() => {
    // Guard against React StrictMode double-invoke in development
    if (joinedRef.current) return;
    joinedRef.current = true;
    setConnectionError(null);

    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: currentUser.id,
        name: currentUser.name,
        image: currentUser.imageUrl,
      },
      token,
    });

    const callInstance = client.call("default", callId);

    callInstance
      .join({ create: false })
      .then(() => {
        clientRef.current = client;
        setVideoClient(client);
        setCall(callInstance);
      })
      .catch((error) => {
        console.error(error);
        setConnectionError("We couldn't join this interview room. Check your connection and try again.");
        joinedRef.current = false;
      });

    return () => {
      callInstance.leave().catch(() => {});
      client.disconnectUser().catch(() => {});
      clientRef.current = null;
      joinedRef.current = false; // reset so hot reload works
    };
  }, [
    apiKey,
    callId,
    currentUser.id,
    currentUser.imageUrl,
    currentUser.name,
    token,
    retryKey,
  ]);

  const handleLeave = useCallback(() => {
    router.push(isInterviewer ? "/dashboard" : "/appointments");
  }, [isInterviewer, router]);

  if (connectionError) {
    return (
      <section role="alert" className="grid min-h-[calc(100dvh-4rem)] place-items-center bg-[#1a1a1a] px-5 text-[#ffffeb]">
        <div className="flex w-full max-w-sm flex-col items-center border border-red-300/15 bg-[#11120f] px-8 py-10 text-center">
          <h1 className="text-lg font-medium">Unable to join</h1>
          <p className="mt-2 text-sm leading-6 text-stone-400">{connectionError}</p>
          <button type="button" onClick={() => { setVideoClient(null); setCall(null); setRetryKey((key) => key + 1); }} className="mt-6 inline-flex items-center gap-2 rounded-[12px] border-2 border-[#ffffeb]/30 bg-[#f0d7ff] px-4 py-2 text-sm text-[#1a1a1a] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0d7ff]">
            <RefreshCw size={14} /> Try again
          </button>
        </div>
      </section>
    );
  }

  if (!videoClient || !call) {
    return (
      <section
        role="status"
        aria-live="polite"
        className="grid min-h-[calc(100dvh-4rem)] place-items-center bg-[#1a1a1a] px-5 text-[#ffffeb]"
      >
        <div className="flex w-full max-w-sm flex-col items-center rounded-[32px] border-2 border-[#ffffeb]/20 bg-[#034f46] px-8 py-10 text-center sm:px-10 sm:py-12">
          <span className="grid size-14 place-items-center rounded-full border-2 border-[#ffffeb]/20 bg-[#f0d7ff]">
            <Loader2
              size={22}
              aria-hidden="true"
              className="animate-spin text-[#034f46] motion-reduce:animate-none"
            />
          </span>
          <h1 className="mt-6 text-lg font-medium tracking-tight text-stone-100">
            Joining interview room
          </h1>
          <p className="mt-2 max-w-64 text-sm leading-6 text-stone-500">
            Securing your video, audio, and session chat.
          </p>
        </div>
      </section>
    );
  }

  return (
    <StreamVideo client={videoClient}>
      <StreamCall call={call}>
        <CallUI
          callId={callId}
          isInterviewer={isInterviewer}
          booking={booking}
          onLeave={handleLeave}
          apiKey={apiKey}
          token={token}
          currentUser={currentUser}
        />
      </StreamCall>
    </StreamVideo>
  );
}
