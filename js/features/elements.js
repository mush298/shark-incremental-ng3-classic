


const ELEMENTS = {
    map: [
        `x_________________xvxx___________xxxxxxvxx___________xxxxxxvxx_xxxxxxxxxxxxxxxxvxx_xxxxxxxxxxxxxxxxvxx1xxxxxxxxxxxxxxxxvxx2xxxxxxxxxxxxxxxxv_v__3xxxxxxxxxxxxxx__v__4xxxxxxxxxxxxxx__`,
    ],
    la: [null,'','','',''],
    exp: [0,118,218,362,558,814,1138],
    max_hsize: [19],
    names: [
        null,
        'H','He','Li','Be','B','C','N','O','F','Ne',
        'Na','Mg','Al','Si','P','S','Cl','Ar','K','Ca',
        'Sc','Ti','V','Cr','Mn','Fe','Co','Ni','Cu','Zn',
        'Ga','Ge','As','Se','Br','Kr','Rb','Sr','Y','Zr',
        'Nb','Mo','Tc','Ru','Rh','Pd','Ag','Cd','In','Sn',
        'Sb','Te','I','Xe','Cs','Ba','La','Ce','Pr','Nd',
        'Pm','Sm','Eu','Gd','Tb','Dy','Ho','Er','Tm','Yb',
        'Lu','Hf','Ta','W','Re','Os','Ir','Pt','Au','Hg',
        'Tl','Pb','Bi','Po','At','Rn','Fr','Ra','Ac','Th',
        'Pa','U','Np','Pu','Am','Cm','Bk','Cf','Es','Fm',
        'Md','No','Lr','Rf','Db','Sg','Bh','Hs','Mt','Ds',
        'Rg','Cn','Nh','Fl','Mc','Lv','Ts','Og'
    ],
    fullNames: [
        null,
        'Hydrogen','Helium','Lithium','Beryllium','Boron','Carbon','Nitrogen','Oxygen','Fluorine','Neon',
        'Sodium','Magnesium','Aluminium','Silicon','Phosphorus','Sulfur','Chlorine','Argon','Potassium','Calcium',
        'Scandium','Titanium','Vanadium','Chromium','Manganese','Iron','Cobalt','Nickel','Copper','Zinc',
        'Gallium','Germanium','Arsenic','Selenium','Bromine','Krypton','Rubidium','Strontium','Yttrium','Zirconium',
        'Niobium','Molybdenum','Technetium','Ruthenium','Rhodium','Palladium','Silver','Cadmium','Indium','Tin',
        'Antimony','Tellurium','Iodine','Xenon','Caesium','Barium','Lanthanum','Cerium','Praseodymium','Neodymium',
        'Promethium','Samarium','Europium','Gadolinium','Terbium','Dysprosium','Holmium','Erbium','Thulium','Ytterbium',
        'Lutetium','Hafnium','Tantalum','Tungsten','Rhenium','Osmium','Iridium','Platinum','Gold','Mercury',
        'Thallium','Lead','Bismuth','Polonium','Astatine','Radon','Francium','Radium','Actinium','Thorium',
        'Protactinium','Uranium','Neptunium','Plutonium','Americium','Curium','Berkelium','Californium','Einsteinium','Fermium',
        'Mendelevium','Nobelium','Lawrencium','Rutherfordium','Dubnium','Seaborgium','Bohrium','Hassium','Meitnerium','Darmstadium',
        'Roeritgenium','Copernicium','Nihonium','Flerovium','Moscovium','Livermorium','Tennessine','Oganesson'
    ],
    canBuy(x) {
        let u = this.upgs[x]
        let res = player.quarks
        return res.gte(u.cost) && !hasElement(x)
    },
    buyUpg(x) {
        if (this.canBuy(x)) {
            let u = this.upgs[x]
            player.quarks = player.quarks.sub(u.cost)
            player.elements.push(x)

          

            tmp.pass = 2
        }
    },
    upgs: [
        null,
        {
            cost: E(100),
        },
        {
            cost: E(1000),
        },
        {
            cost: E('5e10'),
        },
        {
            cost: E('5e11'),
        },
        {
            cost: E('1e13'),
        },
        {
            cost: E('5e14'),
        },
        {
            cost: E('2.5e15'),
        },
        {
            cost: E('2.5e16'),
        },
        {
            cost: E('1e17'),
        },
        {
            cost: E('5e17'),
        },
        {
            cost: E('2.5e18'),
        },
        {
            cost: E('1e19'),
        },
        {
            cost: E('2.5e20'),
        },
        {
            cost: E('1e24'),
        },
        {
            cost: E('1e29'),
        },
        {
            cost: E('1e32'),
        },
        {
            cost: E('1e33'),
        },
        {
            cost: E('1e41'),
        },
        {
            cost: E('1e47'),
        },
        {
            cost: E('1e58'),
        },
        {
            cost: E('1e63'),
        },
        {
            cost: E('1e66'),
        },
        {
            cost: E('1e82'),
        },
        {
            cost: E('1e83'),
        },
        {
            cost: E('2.5e83'),
        },
        {
            cost: E('1e103'),
        },
        {
            cost: E('1e108'),
        },
        {
            cost: E('2.5e109'),
        },
        {
            cost: E('1.5e110'),
        },
        {
            cost: E('1e162'),
        },
        {
            cost: E('e205'),
        },
        {
            cost: E('e207'),
        },
        {
            cost: E('e208'),
        },
        {
            cost: E('e210'),
        },
        {
            cost: E('e264'),
        },
        {
            cost: E('e265.5'),
        },
    ],
    /*
    {
        desc: `Placeholder.`,
        cost: EINF,
        effect() {
            let x = E(1)
            return x
        },
        effDesc(x) { return format(x)+"x" },
    },
    */
    getUnlLength() {
        let u = 118 + player.elements.length

        u = Math.min(u, this.getMaxUnl())

        return u
    },

    getMaxUnl() {
        let u = 36

        return u
    }
}

const MAX_ELEM_TIERS = 3





function getElementId(x) {
    let log = Math.floor(Math.log10(x))
    let list = ["n", "u", "b", "t", "q", "p", "h", "s", "o", "e"]
    let r = ""
    for (var i = log; i >= 0; i--) {
        let n = Math.floor(x / Math.pow(10, i)) % 10
        if (r == "") r = list[n].toUpperCase()
        else r += list[n]
    }
    return r
}

function getElementName(x) {
    if (x <= 118) return ELEMENTS.fullNames[x]
    let log = Math.floor(Math.log10(x))
    let listF = ["Nil", "Un", "Bi", "Tri", "Quad", "Pent", "Hex", "Sept", "Oct", "Enn"]
    let list = ["nil", "un", "bi", "tri", "quad", "pent", "hex", "sept", "oct", "enn"]
    let r = ""
    for (var i = log; i >= 0; i--) {
        let n = Math.floor(x / Math.pow(10, i)) % 10
        if (r == "") r = listF[n]
        else r += list[n]
        if (i == 0) r += n != 2 && n != 3 ? "ium" : "um"
    }
    return r
}

function WE(a,b) { return 2*(a**2-(a-b)**2) }

for (let x = 1; x <= MAX_ELEM_TIERS; x++) {
    let [ts,te] = [ELEMENTS.exp[x-1],ELEMENTS.exp[x]]

    if (x > 1) {
        ELEMENTS.max_hsize[x-1] = 11 + 4*x

        let m = 'xx1xxxxxxxxxxxxxxxxvxx2xxxxxxxxxxxxxxxxv_v'

        for (let y = x; y >= 1; y--) {
            let k = 10 + 4 * y
            m += "1"+'x'.repeat(k)+"v"
            m += "2"+'x'.repeat(k)
            if (y > 1) m += "v_v"
        }

        for (let y = ts+1; y <= te; y++) {
            ELEMENTS.names.push(getElementId(y))
            ELEMENTS.fullNames.push(getElementName(y))
            if (!ELEMENTS.upgs[y]) ELEMENTS.upgs.push({
                desc: `Placeholder.`,
                cost: EINF,
            })
        }

        ELEMENTS.map.push(m)
    }

    // Muonic Elements

   
}



function hasElement(x) { return player.elements.includes(x) }

function elemEffect(x,def=1) { return tmp.elements.effect[x]||def }

function buyElement(x) {
  ELEMENTS.buyUpg(x)
}

function setupElementsHTML() {
    let elements_table = el('elements_table')
	let table = ""
    let num = 0
    for (let k = 1; k <= MAX_ELEM_TIERS; k++) {
        let hs = `style="width: 950px; margin: auto"`
        let n = 0, p = (k+3)**2*2, xs = ELEMENTS.exp[k-1], xe = ELEMENTS.exp[k]
        table += `<div id='elemTier${k}_div'><div ${hs}><div class='table-center'>`
        for (let i = 0; i < ELEMENTS.map[k-1].length; i++) {
            let m = ELEMENTS.map[k-1][i]
            if (m=='v') table += `</div><div class="table-center">`
            else if (m=='_' || !isNaN(Number(m))) table += `<div ${ELEMENTS.la[m]!==undefined&&k==1?`id='element_la_${m}'`:""} style="width: 50px; height: 50px">${ELEMENTS.la[m]!==undefined?"<br>"+ELEMENTS.la[m]:""}</div>`
            else if (m=='x') {
                num++
                table += ELEMENTS.upgs[num]===undefined?`<div style="width: 50px; height: 50px"></div>`
                :`<button class="elements ${num == 118 ? 'final' : ''}" id="elementID_${num}" onclick="buyElement(${num})" onmouseover="tmp.elements.choosed = ${num}" onmouseleave="tmp.elements.choosed = 0">
                <div style="font-size: 12px;">${num}</div><sup class="muon-symbol"></sup>${ELEMENTS.names[num]}
                </button>`
                if (k == 1) {
                    if (num==56 || num==88) num += 14
                    else if (num==70) num += 18
                    else if (num==118) num = 56
                    else if (num==102) num = 118
                } else {
                    //console.log(num,p)
                    if (n == 0) {
                        if (num == xs + 2 || num == xs + p + 2) num += p - 18
                        else if (num == xe) {
                            num = xs + 2
                            n++
                        }
                    } else {
                        if (num == xs + WE(k+3,n) + 2) num = xs + p + WE(k+3,n-1) + 2
                        else if (num == xe - 16) num = xe
                        else if (num == xs + p + WE(k+3,n) + 2) {
                            num = xs + WE(k+3,n) + 2
                            n++
                        }
                    }
                }
            }
        }
        table += "</div></div></div>"
    }
	elements_table.innerHTML = table

    let elem_tier = ``
    table = ""

    for (let i = 1; i <= MAX_ELEM_TIERS; i++) {
        table += `
        <button class="btn" id="elemTier_btn${i}" onclick="player.atom.elemTier[player.atom.elemLayer] = ${i}">
            Tier ${i}<br>
            <span style="font-size: 10px">[${ELEMENTS.exp[i-1]+1} - ${ELEMENTS.exp[i]}]</span>
        </button>
        `
    }

    elem_tier.innerHTML = table
}

function updateElementsHTML() {
    let tElem = tmp.elements
    let et = player.elemTier, elayer = player.elemLayer

 

  

    let elem_const = [ELEMENTS][elayer]

    let ch = tmp.elements.choosed

    let lang_ch = lang_text('elem-desc')

   

    el('choosedDiv').style.display = el_display(tmp.elements.choosed > 0)

    el('choosedDiv').innerHTML = ch > 0 ? `<h2>${ELEMENTS.fullNames[ch]}</h2> <div>${lang_ch[ch-1]}</div> <div>${lang_text('elem-cost', format(ELEMENTS.upgs[ch].cost))}` : ``

    
   

    if (ch) {
        let eu = elem_const.upgs[ch]
       
        let eff = tElem[["effect"][elayer]]

       
    }

    for (let t = 1; t <= MAX_ELEM_TIERS; t++) {
        let unl = et[elayer] == t
        el("elemTier"+t+"_div").style.display = el_display(unl)
        if (unl) {
            let unllen = ELEMENTS.getUnlLength()

           /* if (t == 1) {
                tmp.el.element_la_1.el_display(unllen>56)
                tmp.el.element_la_3.el_display(unllen>56)
                tmp.el.element_la_2.el_display(unllen>88)
                tmp.el.element_la_4.el_display(unllen>88)
            }
 */
            let len = tElem.te;
            

            for (let x = tElem.ts+1; x <= len; x++) {
                let upg = el('elementID_'+x)
                if (upg) {
                    let unl2 = x <= unllen
                    upg.style.display = el_display(unl2)
                    if (unl2) {
                     
                        upg.className = el_classes(
                           {elements: true, locked: !elem_const.canBuy(x), bought: hasElement(x,elayer)}
                        )
                    }
                }
            }
        }

        // tmp.el["elemTier_btn"+t].el_display(t <= tElem.max_tier[elayer])
    }
}

function updateElementsTemp() {
    let tElem = tmp.elements
    let et = player.atom.elemTier, elayer = player.atom.elemLayer

    tElem.ts = ELEMENTS.exp[et[elayer]-1]
    tElem.te = ELEMENTS.exp[et[elayer]]
    tElem.tt = tElem.te - tElem.ts

   

   
    tElem.cannot = cannot

    if (!tElem.upg_length) tElem.upg_length = ELEMENTS.upgs.length-1
    for (let x = tElem.upg_length; x >= 1; x--) if (ELEMENTS.upgs[x].effect) {
        tElem.effect[x] = ELEMENTS.upgs[x].effect()
    }

    tElem.unl_length = [ELEMENTS.getUnlLength()]

    tElem.max_tier = [1,1]
    
}