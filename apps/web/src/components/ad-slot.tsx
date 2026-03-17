import { LinkButton } from '@/components/ui/link-button'
import { Panel } from '@/components/ui/panel'
import { useMonetization } from '@/state/monetization-context'

type AdSlotProps = {
  placement: 'deck-detail' | 'home-primary' | 'review'
}

const COPY: Record<
  AdSlotProps['placement'],
  { body: string; title: string }
> = {
  'deck-detail': {
    body: 'Free plan sessions stay sponsor-supported. Premium removes placements like this one and keeps the deck flow cleaner.',
    title: 'Sponsored placement',
  },
  'home-primary': {
    body: 'Prepdeck stays free on the ad-supported plan. Premium removes ads and helps fund automatic backup, sync, and deeper practice modes later on.',
    title: 'Ad-supported free plan',
  },
  review: {
    body: 'Quick review stays free with sponsor support. Premium removes ad slots and keeps the app focused end to end.',
    title: 'Sponsored review slot',
  },
}

export function AdSlot({ placement }: AdSlotProps) {
  const { isPremium } = useMonetization()

  if (isPremium) {
    return null
  }

  const copy = COPY[placement]

  return (
    <Panel className="border-[var(--retro-line)] bg-[color:rgba(255,255,255,0.03)] p-4">
      <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[var(--retro-line)]">
        {copy.title}
      </p>
      <p className="mt-3 text-sm leading-6 text-white/80">{copy.body}</p>
      <div className="mt-4">
        <LinkButton size="sm" to="/premium" variant="secondary">
          Remove ads with premium
        </LinkButton>
      </div>
    </Panel>
  )
}
