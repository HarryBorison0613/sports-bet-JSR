// default value for apps, can be replaced by environment variable
// see '@lib/env.js`

const isProd = process.env.NODE_ENV === 'production'
const prefix = isProd ? '/artigos' : ''

// Defaults, if not configured in CMS
// Images can be fund in the /public folder
export const siteIcon = '/artigos/images/favicon.png'
export const siteImage = '/artigos/images/site-meta.jpg'
export const siteLogo = '/artigos/vectors/bets.svg'
export const siteUrl = 'https://bets.com.br/'
export const siteAccent = '#04315E'

//Defaults data for the blog
export const topTags = [
  'Futebol',
  'Basquete',
  'Tenis',
  'Futebol Americano',
  'Hoquei',
  'Hóquei',
  'Beisebol',
  'MMA',
  'UFC',
]
export const secondaryTags = [
  'Brasil',
  'Argentina',
  'Alemanha',
  'Franca',
  'Ingleterra',
  'Italia',
  'Colômbia',
  'USA',
  'Canada',
  'Espanha',
  'Brasileirao serie A',
  'Bundesliga',
  'La Liga',
  'Campeonato Espanhol',
  'Premier League',
  'MLS',
  'UEFA',
  'FIFA',
  'NCAA',
  'NFL',
  'NHL',
  'MLB',
  'Olympics',
  'NBA',
  'CFL',
  'KHL',
]
export const links = {
  home_sponsor: {
    name: 'Home sponsor',
    href: 'https://pro.bets.com.br/',
  },
}
