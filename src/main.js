const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
// 字符串
const x = localStorage.getItem('x')
// 字符串变对象
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: 'A', logoType: 'text', url: 'https://www.acfun.cn' },
    { logo: 'A', logoType: 'text', url: 'https://www.acfun.cn' },
    { logo: 'B', logoType: 'text', url: 'https://www.bilibili.com' },
];

// 删除显示块中,url的前缀
const simplifyURL = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '');//删除/开头的内容直到结尾
}

const render = () => {
    // 先删除
    $siteList.find('li:not(.last)').remove()
    // 再渲染新的
    hashMap.forEach((node, index) => {
        console.log(index)
        const $li = $(`
    <li>
        <div class="site">
            <div class="logo">${simplifyURL(node.url)[0]}</div>
            <div class="link">${simplifyURL(node.url)}</div>
            <div class="close">
                <svg class="icon">
                    <use xlink:href="#icon-close"></use>
                </svg>
            </div>   
        </div>  
    </li>
    `).insertBefore($lastLi)

        //打开标签，删除标签
        $li.on('click', () => {
            window.open(node.url)
        })

        $li.on('click', '.close', (e) => {
            console.log('执行了')
            e.stopPropagation()//阻止冒泡
            console.log(hashMap)
            hashMap.splice(index, 1)
            render()
        })

    });
}

render()
$('.addButton')
    .on('click', () => {
        let url = window.prompt('请问你要添加的网址是？')
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        hashMap.push({
            logo: simplifyURL(url)[0],
            logoType: 'text',
            url: url
        })


        render()
    });

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    //在本地的存储里面设置一个 x , 它的值就是 string
    localStorage.setItem('x', string)
}


$(document).on('keypress', (e) => {
    // const key = e.key
    // 当变量名等于属性名时可以简写成下面的式子
    const { key } = e
    for (let i = 0; i < hashMap.length; i++) {
        console.log(hashMap[i])
        if (hashMap[i].logo.toLowerCase() === key) {

            window.open(hashMap[i].url)
        }
    }
})