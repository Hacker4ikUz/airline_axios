let api = 'https://api.instantwebtools.net/v1/airlines'
let res = JSON.parse(localStorage.getItem('res')) || []
axios.get(api)
    .then(result => {
        res = result.data.filter(elem => elem.id < 100 && elem.id > 0)
        reload(res)
        localStorage.res = JSON.stringify(res)
    })
    .catch(error => console.log(error))
reload(res)

function reload(arr) {
    let container = document.querySelector('.container')
    container.innerHTML = ''
    for(let item of arr){
        let div = document.createElement('div')
        let image = document.createElement('div')
        let c = document.createElement('div')
        let p = document.createElement('p')
        let h4 = document.createElement('h4')
        let h5 = document.createElement('h5')
        let span = document.createElement('span')
        let spn = document.createElement('span')
        let img = document.createElement('img')
        let del = document.createElement('div')

        div.classList.add('item')
        c.classList.add('c')
        del.classList.add('del')
        image.classList.add('image')

        spn.innerHTML = 'Изменить'
        span.innerHTML = 'Удалить'
        h4.innerHTML = item.name
        h5.innerHTML = item.established
        div.id = item.id
        p.innerHTML = 'Sri Lanka'
        img.src = './img/more.png'

        container.append(div)
        div.append(image,c,img)
        c.append(h4,h5,p)
        del.append(spn,span)
        c.append(del)

        span.onclick = (event) => {
            let id = event.target.parentNode.parentNode.parentNode.id

            res = res.filter(element => element.id !== +id)
            localStorage.res = JSON.stringify(res)
            reload(res)
        }
        let active = document.querySelector('.active')
        let select = document.querySelector('select')
        let city = document.querySelector('.city')
        active.onclick = () => {
            active.src = './img/active.png'
            select.style.display = 'block'
            city.style.display = 'block'
        }
        img.onclick = () => {
            del.style.display = 'block'
            del.style.display = 'flex'
            del.style.opacity = '1'
        }

        //search 
        let searchinp = document.querySelector('.searchinp')
        searchinp.onkeyup = () => {
            let filtered = res.filter(elemm => elemm.name.toLowerCase().includes(searchinp.value.toLowerCase()))
            reload(filtered)      
        }

        //select
        select.onchange = () => {
            let arr2 = result.filter(elem => elem.established === select.value)
            console.log(arr2);
            reload(arr2)
        }

        //form 
        let form = document.forms.edit
        let modal = document.querySelector('.modal')
        let overlay = document.querySelector('.overlay')
        let btn = document.querySelector('.btn')
        btn.onclick = () => {
            modal.style.display = 'flex'
        }

        overlay.onclick = () => {
            modal.style.display = 'none'
        }
        // form.onsubmit = (e) => { 
        //     e.preventDefault()
            
        // }
    }
}
