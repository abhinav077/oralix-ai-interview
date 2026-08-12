"use client";

import { useEffect, useCallback, useState } from "react";

// Stream Video
import {
  StreamTheme,
  SpeakerLayout,
  useCallStateHooks,
  useCall,
  CallingState,
  CallControls,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

// Stream Chat
import {
  Chat,
  Channel,
  MessageList,
  MessageComposer,
  Window,
  useCreateChatClient,
} from "stream-chat-react";
import "stream-chat-react/dist/css/index.css";

import {
  Loader2,
  MessageSquare,
  Sparkles,
  UsersRound,
  Video,
} from "lucide-react";
import AIQuestionsPanel from "./AIQuestions";

// ─── Call UI (inside StreamCall context) ─────────────────────────────────────

export default function CallUI({
  callId,
  isInterviewer,
  booking,
  onLeave,
  apiKey,
  token,
  currentUser,
}) {
  const { useCallCallingState } = useCallStateHooks();
  const call = useCall();
  const callingState = useCallCallingState();

  const [activeTab, setActiveTab] = useState("chat");

  // Auto-stop recording before leaving
  const handleLeave = useCallback(async () => {
    try {
      if (call) {
        const isRecording = call.state?.recording;
        if (isRecording) {
          await call.stopRecording().catch(() => {});
        }
        await call.leave().catch(() => {});
      }
    } finally {
      onLeave();
    }
  }, [call, onLeave]);

  // ── Chat client — same token works for both Video + Chat SDKs ──
  const chatClient = useCreateChatClient({
    apiKey,
    tokenOrProvider: token,
    userData: {
      id: currentUser.id,
      name: currentUser.name,
      image: currentUser.imageUrl,
    },
  });

  const [chatChannel, setChatChannel] = useState(null);
  const [chatError, setChatError] = useState(null);

  useEffect(() => {
    if (!chatClient) return;

    const channel = chatClient.channel("messaging", callId, {
      name: "Interview Chat",
      members: [
        booking.interviewer.clerkUserId,
        booking.interviewee.clerkUserId,
      ],
    });

    channel
      .watch()
      .then(() => {
        setChatError(null);
        setChatChannel(channel);
      })
      .catch((error) => {
        console.error(error);
        setChatError("Session chat could not connect. You can keep the video interview open.");
      });

    return () => {
      channel.stopWatching().catch(() => {});
    };
  }, [chatClient, callId, booking]);

  if (callingState === CallingState.LEFT) {
    return (
      <section
        role="status"
        aria-live="polite"
        className="grid min-h-[calc(100dvh-4rem)] place-items-center bg-[#1a1a1a] px-5 text-[#ffffeb]"
      >
        <div className="flex max-w-sm flex-col items-center text-center">
          <span className="grid size-12 place-items-center rounded-full border border-white/10 bg-white/4">
            <Loader2
              size={19}
              aria-hidden="true"
              className="animate-spin text-stone-300 motion-reduce:animate-none"
            />
          </span>
          <h1 className="mt-5 text-base font-medium text-stone-100">
            Leaving the interview room
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            Closing your media session safely.
          </p>
        </div>
      </section>
    );
  }

  return (
      <main className="live-room flex min-h-[calc(100dvh-4rem)] flex-col bg-[#1a1a1a] text-[#ffffeb] lg:h-[calc(100dvh-4rem)] lg:overflow-hidden">
      {/* Top bar */}
        <header className="flex shrink-0 flex-col gap-4 border-b border-[#ffffeb]/20 bg-[#1a1a1a] px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-[#1a1a1a] bg-[#f0d7ff] text-[#1a1a1a]">
            <Video size={18} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-sm font-semibold tracking-tight text-stone-100 sm:text-base">
                Live interview
              </h1>
              {isInterviewer && (
                <span className="teal-badge shrink-0 !px-2 !py-0.5 !text-[10px]">
                  Interviewer view
                </span>
              )}
            </div>
              <p className="mt-0.5 text-xs text-[#ffffeb]/55">
              Focused two-person session
            </p>
          </div>
        </div>

        <div
          aria-label="Interview participants"
          className="grid min-w-0 grid-cols-2 gap-2 overflow-hidden rounded-[16px] border-2 border-[#ffffeb]/20 bg-[#034f46] lg:w-[30rem]"
        >
          <div className="min-w-0 bg-[#034f46] px-3.5 py-2.5">
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#ffffeb]/55">
              Interviewer
            </p>
            <p className="mt-1 truncate text-xs font-medium text-[#ffffeb] sm:text-sm">
              {booking.interviewer.name}
            </p>
          </div>
          <div className="min-w-0 bg-[#034f46] px-3.5 py-2.5">
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#ffffeb]/55">
              Candidate
            </p>
            <p className="mt-1 truncate text-xs font-medium text-[#ffffeb] sm:text-sm">
              {booking.interviewee.name}
            </p>
          </div>
        </div>
      </header>

      {/* Body: video + side panel */}
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        {/* ── LEFT: Video ── */}
        <section
          aria-label="Video interview workspace"
          className="flex min-h-[28rem] min-w-0 flex-1 flex-col bg-[#1a1a1a] p-3 sm:p-4 lg:min-h-0 lg:p-5"
        >
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[32px] border-2 border-[#ffffeb]/20 bg-[#1a1a1a]">
            <div className="flex shrink-0 items-center justify-between border-b border-[#ffffeb]/20 px-4 py-3">
              <div className="flex items-center gap-2 text-xs font-medium text-[#ffffeb]/65">
                <UsersRound size={14} aria-hidden="true" />
                Interview workspace
              </div>
              <span className="text-[11px] text-[#ffffeb]/45">
                Session in progress
              </span>
            </div>

            <StreamTheme className="flex min-h-0 flex-1 flex-col bg-transparent">
              <SpeakerLayout participantBarPosition="bottom" />
              <CallControls onLeave={handleLeave} />
            </StreamTheme>
          </div>
        </section>

        {/* ── RIGHT: Chat / AI panel ── */}
        <aside
          aria-label="Interview support panel"
          className="flex min-h-[34rem] shrink-0 flex-col border-t border-[#ffffeb]/20 bg-[#034f46] lg:min-h-0 lg:w-[23.5rem] lg:border-l lg:border-t-0 xl:w-[25rem]"
        >
          <div className="shrink-0 px-4 pb-3 pt-4 sm:px-5">
            <p className="text-xs font-medium text-stone-300">Session support</p>
            <p className="mt-1 text-xs leading-5 text-stone-600">
              Keep conversation and interview prompts close at hand.
            </p>
          </div>

          {/* Tab switcher */}
          <div
            role="tablist"
            aria-label="Interview support tools"
            className="mx-4 mb-3 flex shrink-0 rounded-xl border border-white/8 bg-[#0b0c0a] p-1 sm:mx-5"
          >
            <button
              type="button"
              role="tab"
              id="interview-chat-tab"
              aria-selected={activeTab === "chat"}
              aria-controls="interview-support-panel"
              onClick={() => setActiveTab("chat")}
              className={`flex min-h-9 flex-1 items-center justify-center gap-2 rounded-lg px-3 text-xs font-medium outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-amber-200/70 focus-visible:ring-offset-1 focus-visible:ring-offset-[#0b0c0a] motion-reduce:transition-none ${
                activeTab === "chat"
                  ? "bg-[#202117] text-amber-100 shadow-sm shadow-black/20"
                  : "text-stone-500 hover:bg-white/4 hover:text-stone-300"
              }`}
            >
              <MessageSquare size={14} aria-hidden="true" />
              Chat
            </button>

            {/* AI Questions tab — interviewer only */}
            {isInterviewer && (
              <button
                type="button"
                role="tab"
                id="interview-ai-tab"
                aria-selected={activeTab === "ai"}
                aria-controls="interview-support-panel"
                onClick={() => setActiveTab("ai")}
                className={`flex min-h-9 flex-1 items-center justify-center gap-2 rounded-lg px-3 text-xs font-medium outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-amber-200/70 focus-visible:ring-offset-1 focus-visible:ring-offset-[#0b0c0a] motion-reduce:transition-none ${
                  activeTab === "ai"
                    ? "bg-[#202117] text-amber-100 shadow-sm shadow-black/20"
                    : "text-stone-500 hover:bg-white/4 hover:text-stone-300"
                }`}
              >
                <Sparkles size={14} aria-hidden="true" />
                AI Questions
              </button>
            )}
          </div>

          {/* Panel content */}
          <div
            id="interview-support-panel"
            role="tabpanel"
            aria-labelledby={
              activeTab === "chat" ? "interview-chat-tab" : "interview-ai-tab"
            }
            className="min-h-0 flex-1 overflow-hidden border-t border-white/6"
          >
            {activeTab === "chat" ? (
              chatError ? (
                <div role="alert" className="flex h-full flex-col items-center justify-center px-6 text-center">
                  <MessageSquare size={20} className="text-amber-200" />
                  <p className="mt-4 text-sm text-stone-300">Chat unavailable</p>
                  <p className="mt-2 text-xs leading-5 text-stone-500">{chatError}</p>
                </div>
              ) : chatClient && chatChannel ? (
                <div className="h-full min-h-0 bg-[#0d0e0c]">
                  <Chat client={chatClient} theme="str-chat__theme-dark">
                    <Channel channel={chatChannel}>
                      <Window>
                        <MessageList />
                        <MessageComposer />
                      </Window>
                    </Channel>
                  </Chat>
                </div>
              ) : (
                <div
                  role="status"
                  aria-live="polite"
                  className="flex h-full flex-col items-center justify-center px-8 text-center"
                >
                  <span className="grid size-11 place-items-center rounded-full border border-white/8 bg-white/4">
                    <Loader2
                      size={17}
                      aria-hidden="true"
                      className="animate-spin text-amber-200 motion-reduce:animate-none"
                    />
                  </span>
                  <p className="mt-4 text-sm font-medium text-stone-300">
                    Preparing session chat
                  </p>
                  <p className="mt-1.5 text-xs leading-5 text-stone-600">
                    Messages will appear here when the channel is ready.
                  </p>
                </div>
              )
            ) : (
              <div className="h-full overflow-y-auto p-4 sm:p-5">
                <AIQuestionsPanel categories={booking.categories} />
              </div>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}
