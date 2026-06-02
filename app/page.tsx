import { GatefoldEntrance } from "@/components/GatefoldEntrance";
import { SiteNav } from "@/components/SiteNav";
import { MusicToggle } from "@/components/MusicToggle";
import { RsvpFab } from "@/components/RsvpFab";
import { Invitation } from "@/components/sections/Invitation";
import { Countdown } from "@/components/sections/Countdown";
import { Story } from "@/components/sections/Story";
import { Celebrations } from "@/components/sections/Celebrations";
import { OrderOfDay } from "@/components/sections/OrderOfDay";
import { DressCode } from "@/components/sections/DressCode";
import { Stay } from "@/components/sections/Stay";
import { Rsvp } from "@/components/sections/Rsvp";
import { Gifts } from "@/components/sections/Gifts";
import { Venue } from "@/components/sections/Venue";
import { Closing } from "@/components/sections/Closing";
import { SiteFooter } from "@/components/sections/SiteFooter";

export default function Page() {
  return (
    <main id="top" className="relative scroll-smooth">
      <SiteNav />
      <GatefoldEntrance />
      <Invitation />
      <Countdown />
      <Story />
      <Celebrations />
      <OrderOfDay />
      <DressCode />
      <Stay />
      <Rsvp />
      <Gifts />
      <Venue />
      <Closing />
      <SiteFooter />
      <MusicToggle />
      <RsvpFab />
    </main>
  );
}
