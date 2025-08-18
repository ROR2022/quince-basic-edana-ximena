import {BasicHero} from '@/components/demo/quince/basic/BasicHero';
import {BasicCountdown} from '@/components/demo/quince/basic/BasicCountdown';
import {BasicEventDetails} from '@/components/demo/quince/basic/BasicEventDetails';
import {BasicAttendance} from '@/components/demo/quince/basic/BasicAttendance';
import {BasicGiftOptions} from '@/components/demo/quince/basic/BasicGiftOptions';
import BasicCTA from '@/components/demo/BasicCTA';
import { PremiumGallery, PremiumInvitation } from '@/components/demo/quince/premium';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Componentes incluidos en el paquete básico */}
      <BasicHero />
      <BasicCountdown />
      <PremiumInvitation />
      <BasicEventDetails />
      <PremiumGallery />
      <BasicAttendance />
      <BasicGiftOptions />
      <BasicCTA />
    </div>
  )
}
