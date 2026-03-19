import { uiLayout } from '@/lib/ui-layout'
import { uiRecipes } from '@/lib/ui-recipes'
import { uiTypography } from '@/lib/ui-typography'

export const ui = {
  ...uiTypography,
  ...uiLayout,
  ...uiRecipes,
} as const
