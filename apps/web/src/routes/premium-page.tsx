import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LinkButton } from '@/components/ui/link-button'
import { PageIntro } from '@/components/ui/page-intro'
import { Panel } from '@/components/ui/panel'
import { testIds } from '@/lib/test-ids'
import { useMonetization } from '@/state/monetization-context'

export function PremiumPage() {
  const { isPremium, membership, setMembershipTier } = useMonetization()

  return (
    <div className="space-y-6" data-testid={testIds.premium.page}>
      <PageIntro
        actions={
          <>
            <Button
              data-testid={testIds.premium.previewButton}
              onClick={() => setMembershipTier(isPremium ? 'free' : 'premium')}
              type="button"
              variant="primary"
            >
              {isPremium ? 'Switch to free preview' : 'Preview premium locally'}
            </Button>
            <LinkButton data-testid={testIds.premium.freePlanLink} to="/" variant="ghost">
              Keep using the free plan
            </LinkButton>
          </>
        }
        description="Free stays useful. Premium removes sponsor surfaces and opens the deeper practice loops."
        title="Premium"
      />

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <PlanCard
          items={[
            'All learning guides',
            'Starter practice decks',
            'Basic study and review loops',
            'Local notes per card',
            'Sponsor-supported surfaces',
          ]}
          title="Free"
          tone="default"
        />
        <PlanCard
          items={[
            'Everything in free',
            'No ad slots',
            'Interview mode and mock runs',
            'Weak-card loops and deeper practice presets',
            'Priority access to automatic backup and sync later',
          ]}
          title="Premium"
          tone="accent"
        />
      </section>

      <Panel className="p-5" data-testid={testIds.premium.statusPanel}>
        <div className="flex flex-wrap gap-2">
          <Badge tone={membership.tier === 'premium' ? 'accent' : 'default'}>
            {membership.tier === 'premium' ? 'Premium preview active' : 'Free plan active'}
          </Badge>
        </div>
        <h2 className="mt-4 text-2xl font-black text-[var(--retro-ink)]">
          {membership.tier === 'premium'
            ? 'Premium preview is active on this device.'
            : 'Premium checkout is not live yet.'}
        </h2>
        <p className="mt-3 text-sm leading-6 text-white/80">
          {membership.tier === 'premium'
            ? 'Ads are hidden while this device stays in premium preview mode.'
            : 'This open build keeps checkout out of the way for now. You can still preview the premium state locally on this device.'}
        </p>
      </Panel>
    </div>
  )
}

function PlanCard({
  items,
  title,
  tone,
}: {
  items: string[]
  title: string
  tone: 'accent' | 'default'
}) {
  return (
    <Panel
      className={
        tone === 'accent'
          ? 'border-[var(--retro-line-strong)] bg-[var(--retro-surface-strong)] p-5'
          : 'p-5'
      }
    >
      <p className="app-eyebrow">{tone === 'accent' ? 'Recommended' : 'Included'}</p>
      <h2 className="text-2xl font-black text-[var(--retro-ink)]">{title}</h2>
      <ul className="mt-5 space-y-3 text-sm leading-6 text-white/80">
        {items.map((item) => (
          <li key={item}>- {item}</li>
        ))}
      </ul>
    </Panel>
  )
}
