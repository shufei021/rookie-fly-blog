const svgModules = import.meta.glob('./svg/*.svg', { as: 'raw', eager: true })
const icons = {}

for (const [path, content] of Object.entries(svgModules)) {
  const iconName = path.replace(/^\.\/svg\/(.*)\.\w+$/, '$1')
  
  // 提取原始 viewBox
  const viewBoxMatch = content.match(/viewBox=["']([^"']+)["']/)
  let viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24'
  
  // 计算原始宽高比
  const [x, y, w, h] = viewBox.split(/\s+|\s*,\s*/).map(Number)
  const aspectRatio = w / h
  
  // 清理SVG内容
  const cleanedContent = content
    .replace(/(width|height)=["'][^"']*["']/g, '')
    .replace(/<svg([^>]+)>/, `<svg$1 viewBox="${viewBox}" preserveAspectRatio="xMidYMid meet">`)
  
  // 为sprite中的图标添加ID
  const svgContent = cleanedContent.replace(
    /<svg([^>]+)>/,
    `<svg$1 id="icon-${iconName}">`
  )
  
  icons[iconName] = {
    default: svgContent,
    viewBox,
    aspectRatio // 存储原始宽高比
  }
}
export function registerIcons() {
  // 创建 SVG sprite
  const sprite = Object.values(icons).map((icon) => icon.default).join('')

  // 将 sprite 插入到 body 中
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position:absolute;width:0;height:0;left: -999px;">
      ${sprite}
    </svg>
  `
  document.body.insertAdjacentHTML('afterbegin', svg)
}
