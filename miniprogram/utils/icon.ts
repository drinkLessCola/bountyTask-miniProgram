const svgToBase64 = (svg:string):string => {
  // 将被设置到 dataset 中的属性还原出来
  svg = svg.replace(/data-(.*?=(['"]).*?\2)/g, '$1');
  // 将被设置到 data-xlink-href 的属性还原出来
  svg = svg.replace(/xlink-href=/g, 'xlink:href=');
  // 将 dataset 中被变成 kebab-case 写法的 viewBox 还原出来
  svg = svg.replace(/view-box=/g, 'viewBox=');
  // 清除 SVG 中不应该显示的 title、desc、defs 元素
  svg = svg.replace(/<(title|desc|defs)>[\s\S]*?<\/\1>/g, '');
  // 为非标准 XML 的 SVG 添加 xmlns，防止视图层解析出错
  if (!/xmlns=/.test(svg)) svg = svg.replace(/<svg/, "<svg xmlns='http://www.w3.org/2000/svg'");
  // 对 SVG 中出现的浮点数统一取最多两位小数，缓解数据量过大问题
  svg = svg.replace(/\d+\.\d+/g, (match) => (parseFloat(match).toFixed(2)));
  // 清除注释，缓解数据量过大的问题
  svg = svg.replace(/<!--[\s\S]*?-->/g, '');
  // 模拟 HTML 的 white-space 行为，将多个空格或换行符换成一个空格，减少数据量
  svg = svg.replace(/\s+/g, " ");
  // 对特殊符号进行转义，这里参考了 https://github.com/bhovhannes/svg-url-loader/blob/master/src/loader.js
  svg = svg.replace(/[{}\|\\\^~\[\]`"<>#%]/g, function (match) {
    return '%' + match[0].charCodeAt(0).toString(16).toUpperCase();
  });
 
  // 单引号替换为 \'，由于 kbone 的 bug，节点属性中的双引号在生成 outerHTML 时不会被转义导致出错
  // 因此 background-image: url( 后面只能跟单引号，所以生成的 URI 内部也就只能用斜杠转义单引号了
  svg = svg.replace(/'/g, "\\'");
  // 最后添加 mime 头部，变成 Webview 可以识别的 Data URI
  return 'data:image/svg+xml,' + svg.trim();
}

const address = `<svg xmlns="http://www.w3.org/2000/svg" width="9.429" height="12" viewBox="0 0 9.429 12">
<path d="M164.686,63.989a4.719,4.719,0,0,0-4.713,4.713c0,2.509,4.225,6.964,4.4,7.153a.429.429,0,0,0,.311.134h.009a.415.415,0,0,0,.313-.147l1.463-1.675c1.944-2.38,2.928-4.218,2.928-5.462A4.72,4.72,0,0,0,164.686,63.989Zm0,6.856a2.142,2.142,0,1,1,2.142-2.142A2.141,2.141,0,0,1,164.686,70.845Z" transform="translate(-159.973 -63.989)" fill="#8a8a8a"/>
</svg>`

const time = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
<path d="M68.989,63.989a5,5,0,1,0,5,5A5.005,5.005,0,0,0,68.989,63.989ZM70.767,69.7H68.636a.36.36,0,0,1-.359-.359V66.5a.357.357,0,0,1,.714,0v2.488h1.778a.356.356,0,1,1,0,.712Z" transform="translate(-63.989 -63.989)" fill="#8a8a8a"/>
</svg>`

export const icon_address = svgToBase64(address)

export const icon_time = svgToBase64(time)