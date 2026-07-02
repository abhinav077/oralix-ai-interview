import { GoldTitle, GrayTitle, SectionLabel } from "@/components/reusables";
import Image from "next/image";
import Silk from '../components/Silk';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AVATARS } from "@/lib/data";


export default function Home() {
  return (
    <div className="bg-black overflow-x-hidden ">
      <section className="isolate relative min-h-screen overflow-hidden px-4 pb-20 pt-22 sm:px-8 sm:pt-24">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Silk
            speed={10.1}
            scale={0.7}
            color="#37363a"
            noiseIntensity={9.7}
            rotation={1.19}
          />
        </div>

        <div className="relative z-10 grid min-h-[calc(100vh-7rem)] grid-cols-1 lg:grid-cols-5">
          <div className="col-span-full flex flex-col items-center justify-center text-center lg:col-span-3">
            <Badge variant="outline">Powered by AI</Badge>

            <h1 className="font-heading relative text-5xl sm:text-6xl lg:text-7xl tracking-tighter max-w-4xl">
              <GrayTitle>Ace your Interviews</GrayTitle>
              <br />
              <GoldTitle>with Oralix</GoldTitle>
            </h1>

            <p className="relative text-sm sm:text-base md:text-lg text-stone-400 max-w-xl mt-6 leading-relaxed">
              Book your interview with Oralix and get ready to impress your future employer. Our AI-powered platform provides personalized feedback and guidance to help you ace your interviews and land your dream job.
            </p>

            <div className="relative flex justify-center gap-2 sm:gap-4 mt-10 sm:w-auto">
              <Link href="/onboarding">
                <Button variant="gold" size="lg">
                  Get started
                </Button>
              </Link>

              <Link href="/explore">
                <Button variant="outline" size="lg">
                  Browse Interviewers →
                </Button>
              </Link>
            </div>

            <div className="relative flex items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-16">
              <div className="flex">
                {AVATARS.map((av, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full border-2 border-[#0a0a0b] overflow-hidden ${
                      i > 0 ? "-ml-2" : ""
                    }`}
                  >
                    <Image
                      src={av.src}
                      alt="user avatar"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <p className="text-sm text-stone-500 text-center sm:text-left">
                <strong className="text-stone-400 font-medium">
                  2,400+ engineers
                </strong>{" "}
                cracked FAANG interviews via Oralix
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
