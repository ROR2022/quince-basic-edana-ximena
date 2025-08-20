import {BasicHero} from '@/components/demo/quince/basic/BasicHero';
import {BasicCountdown} from '@/components/demo/quince/basic/BasicCountdown';
import {BasicEventDetails} from '@/components/demo/quince/basic/BasicEventDetails';
import {BasicAttendance} from '@/components/demo/quince/basic/BasicAttendance';
import {BasicGiftOptions} from '@/components/demo/quince/basic/BasicGiftOptions';
import BasicCTA from '@/components/demo/BasicCTA';
import { PremiumGallery, PremiumInvitation, PremiumMusicPlayer } from '@/components/demo/quince/premium';
import CustomInvitations from '@/components/demo/quince/premium/CustomInvitations/components/CustomInvitations';
import { MusicProvider } from '@/context/music-context';
import SimpleMusicPlayer from '@/components/demo/quince/premium/SimpleMusicPlayer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Componentes incluidos en el paquete básico */}
      <SimpleMusicPlayer />
      <BasicHero />
      <BasicCountdown />
      <PremiumInvitation />
      <BasicEventDetails />
      <PremiumGallery />
      <BasicAttendance />
      <BasicGiftOptions />
      <CustomInvitations />
      <BasicCTA />
      
      
    </div>
  )
}
