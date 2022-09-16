import Typography from 'typography'
import Wordpress2016 from 'typography-theme-wordpress-2016'

Wordpress2016.overrideThemeStyles = (
  { adjustFontSizeTo, rhythm },
  options,
  styles
) => ({
  'a:visited': {
    color: '#004c80',
  },
  'a.gatsby-resp-image-link': {
    boxShadow: 'none',
  },
  'a.anchor': {
    // Cancel out noticeable <a> styling
    boxShadow: `none`,
  },
  'li': {
    marginBottom: rhythm(1/2),
  },
  'li > ul': {
    marginTop: rhythm(1/4),
  },
  'li > p': {
    marginBottom: rhythm(1/4),
  },
})

delete Wordpress2016.googleFonts

const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
