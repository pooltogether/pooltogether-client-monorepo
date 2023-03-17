import { darkTheme, Theme } from '@rainbow-me/rainbowkit'
import { DeepPartial } from 'pt-types'

/**
 * Custom PoolTogether RainbowKit Theme
 */
export const ptRainbowTheme = (): Theme => {
  const theme: Theme = darkTheme()

  const ptTheme: DeepPartial<Theme> = {
    colors: {
      accentColor: '#8050E3',
      connectButtonBackground: 'transparent',
      connectButtonText: '#F5F0FF'
    },
    fonts: {
      body: 'Averta'
    },
    shadows: {
      connectButton: '0 0 0 transparent'
    }
  }

  Object.assign(theme.colors, ptTheme.colors)
  Object.assign(theme.fonts, ptTheme.fonts)
  Object.assign(theme.shadows, ptTheme.shadows)

  return theme
}
