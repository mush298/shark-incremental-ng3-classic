const CURRENCIES = {
    fish: {
        get amount() { return player.fish },
        set amount(v) { player.fish = v.max(0) },

        get total() { return player.total_fish },
        set total(v) { player.total_fish = v.max(0) },
    
        get gain() {
            let x = getSharkBonus("fish").mul(sharkUpgEffect('s1')).mul(sharkUpgEffect('p1')).mul(sharkUpgEffect('p2'))

            .mul(tmp.explore_eff[0][0]).mul(tmp.core_bonus)

            x = x.pow(sharkUpgEffect('s4')).pow(tmp.explore_eff[2]).pow(coreReactorEffect(0)).pow(getSharkRankBonus('fish')).pow(simpleETEffect(12))
            .pow(remnantUpgEffect(4)).pow(tmp.explore_eff[0][1]).pow(spaceBaseUpgEffect('o2')).pow(spaceBaseUpgEffect('r3')).pow(spaceBaseUpgEffect('t4'))

            if (inExploration(0)) x = x.root(2)
            if (hasDepthMilestone(0,3)) x = x.pow(1.05)
            if (tmp.cr_active) x = x.root(3)
            
            if (hasResearch('c14')) x = x.pow(researchEffect('c14'));

            if (inExploration(4)) x = expPow(x,0.75);

            x = expPow(x,tmp.bh_reduction)
            x = expPow(x,simpleCETEffect(12))
            x = expPow(x,coreReactorEffect(8))
            x = expPow(x,constellationBoostEffect(0,false))

            x = expPow(x,INFINITY.power_formula(player.inf.power))

            var s = E('ee40'), pre_s = x

            s = s.pow(getSharkRankBonus('so'))

            if (isSSObserved('uranus')) s = EINF;
            
            tmp.shark_op_start = s

            if (x.gte(s)) {
                x = x.overflow(s,0.5)
                tmp.shark_op = pre_s.log10().div(x.log10())
            } else tmp.shark_op = E(1)

            if (!hasInfinityUpgrade(1)) {
                x = x.min('ee9e15')
            } else {
                if (!hasInfinityUpgrade(11)) x = x.min(INFINITY.gain(player.inf.infinities.add(1)))
            }

            if (!hasInfinityUpgrade(3)) x = x.overflow('ee5e17', 0.5)

            let c = E(tmp.corrupt_start)

            hasElement(13) ? x = x.overflow(c, 0.5) : x = x.min(c)

            if (!player.solar_system.active == "") x = x.min('ee9e15')

            x = x.overflow('ee1e175', 0.25, 2)

     

            return x.add(1)
        },
    },
    prestige: {
        get require() { return E(1e36) },

        get amount() { return player.prestige.shards },
        set amount(v) { player.prestige.shards = v.max(0) },

        get total() { return player.prestige.total },
        set total(v) { player.prestige.total = v.max(0) },
    
        get gain() {
            let x = player.total_fish.div(1e36)

            if (x.lt(1)) return E(0)

            var exp = 0.5
            if (hasResearch('p4')) exp += 0.05
            if (hasEvolutionGoal(5)) exp += 0.0125

            x = expPow(x,exp).pow(coreReactorEffect(1)).mul(getSharkBonus("prestige")).mul(tmp.explore_eff[1][0])

            x = x.pow(tmp.explore_eff[3]).pow(simpleETEffect(13)).pow(getSharkRankBonus('prestige')).pow(forgeUpgradeEffect('shard'))
            .pow(tmp.explore_eff[1][1]).pow(spaceBaseUpgEffect('o3')).pow(spaceBaseUpgEffect('r4'))

            if (hasResearch('dm2')) x = x.pow(remnantUpgEffect(4))

            if (hasDepthMilestone(0,0)) x = x.pow(1.05)
            if (inExploration(1)) x = x.root(2)
            if (tmp.cr_active) x = x.root(3);

            x = expPow(x,forgeUpgradeEffect('refined_shard'))
            x = expPow(x,tmp.bh_reduction)
            x = expPow(x,simpleCETEffect(13))
            x = expPow(x,coreReactorEffect(9))
            x = expPow(x,constellationBoostEffect(1,false))
            if (hasElement(23)) x = expPow(x, 2.5)
    
            return x.floor()
        },

        get passive() { return hasDepthMilestone(1,3) ? 1 : 0 },
    },
    core: {
        get require() { return E('1e450') },

        get amount() { return player.core.fragments },
        set amount(v) { player.core.fragments = v.max(0) },

        get total() { return player.core.total },
        set total(v) { player.core.total = v.max(0) },

        get gain() {
            let x = player.prestige.total.div('1e450')

            if (x.lt(1)) return E(0)

            x = x.log10().div(10).add(1)

            if (hasEvolutionGoal(2)) x = expPow(x,1.25)

            x = x.mul(getSharkBonus("core")).mul(getCRBoost(1)).mul(spaceBaseUpgEffect('o4'))
            
            x = x.pow(simpleETEffect(14))
            x = x.pow(tmp.bh_reduction)
            x = x.pow(simpleCETEffect(14))
            x = x.pow(coreReactorEffect(10))
            x = x.pow(constellationBoostEffect(2,false))

          
    
            return x.floor()
        },

        get passive() { return hasEvolutionGoal(0) ? 1 : 0 },
    },
    humanoid: {
        next(s=player.humanoid.shark) {
            let x = s.div(this.mult).root(this.exp)
            x = x.pow_base(this.base).mul(1.5e18).pow_base(10)
            return x
        },
        get require() { return isSSObserved('venus') ? E('e1.5e18') : this.next() },

        get base() { return Decimal.sub(10,simpleETEffect(15,0)) },
        get mult() { return getPAEffect(3) },
        get exp() {
            let x = 1
            if (isSSObserved('venus')) x += 1.25;
            if (hasEvolutionTree(15,true)) x += chargedETreeEffect(15,0);
            x = Decimal.add(x,remnantUpgEffect(15,0))
            x = x.mul(constellationBoostEffect(3,false))
            return x
        },

        get moreArg() { return [this.next(isSSObserved('venus') ? tmp.currency_gain.humanoid : player.humanoid.shark.add(tmp.currency_gain.humanoid))] },

        get amount() { return player.humanoid.shark },
        set amount(v) { player.humanoid.shark = v.max(0) },

        get gain() {
            let x = player.fish, v = isSSObserved('venus')

            if (x.lt("e1.5e18")) return E(0)

            x = x.log10().div(1.5e18).log(this.base).pow(this.exp)
            
            x = x.mul(this.mult)

            if (!v) x = x.sub(player.humanoid.shark);
    
            return x.add(1).max(0).floor()
        },

        get passive() { return isSSObserved('venus') ? 1 : 0 },
    },
    remnants: {
        get amount() { return player.singularity.remnants },
        set amount(v) { player.singularity.remnants = v.max(0) },
    
        get gain() {
            if (!S_MILESTONES[0].req()) return E(0)

            let x = E(1).add(getSharkBonus('remnants',0)).mul(getSharkRankBonus('remnants')).mul(getCRBoost(12)).mul(remnantUpgEffect(12))

            if (hasResearch('s1')) x = x.mul(researchEffect('s1'));
            if (hasResearch('dm7')) x = x.mul(researchEffect('dm7'));
            if (player.singularity.best_bh.gte(6)) x = x.mul(player.singularity.bh.pow_base(2));

            x = x.pow(forgeUpgradeEffect('matter'))

            if (hasElement(17)) x = expPow(x, tmp.bh_limit.log10().pow(1.25))

            return x
        },
    },
    'dark-matter': {
        get require() { return E('ee10000') },

        get amount() { return player.singularity.dm },
        set amount(v) { player.singularity.dm = v.max(0) },

        get total() { return player.singularity.total_dm },
        set total(v) { player.singularity.total_dm = v.max(0) },

        get gain() {
            let x = player.fish.max(10).log10().log10().sub(1e4)

            if (x.lt(0) || player.singularity.bh.lt(8)) return E(0)

            x = x.div(2e3).add(1).pow(.5).sub(1).pow_base(100)

            x = x.mul(getCRBoost(11))
    
            return x.floor()
        },

        get passive() { return +hasSMilestone(12) },
    },
    observ: {
        get amount() { return player.solar_system.observ },
        set amount(v) { player.solar_system.observ = v.max(0) },

        get total() { return player.solar_system.total_observ },
        set total(v) { player.solar_system.total_observ = v.max(0) },
    
        get gain() {
            if (player.solar_system.active === "") return E(0);

            let x = Decimal.mul(spaceBaseUpgEffect('o1'),spaceBaseUpgEffect('e1')).mul(spaceBaseUpgEffect('e2')).mul(spaceBaseUpgEffect('e3')).mul(spaceBaseUpgEffect('r1'))

            if (isSSObserved('venus')) x = x.mul(10);
            if (isSSObserved('mars')) x = x.mul(10);
            if (isSSObserved('mercury')) x = x.mul(10);
            if (isSSObserved('jupiter')) x = x.mul(10);

            x = x.pow(spaceBaseUpgEffect('t1')).pow(experimentBoostEffect(0)).pow(constellationBoostEffect(0,true))

            return x
        },
    },
    reserv: {
        get require() { return E(1e12) },
        
        get amount() { return player.solar_system.reserv },
        set amount(v) { player.solar_system.reserv = v.max(0) },
    
        get gain() {
            if (player.solar_system.active === "") return E(0);

            let x = player.solar_system.observ.div(1e12)

            if (x.lt(1)) return E(0);

            let exp = hasResearch('r2') ? 0.55 : 0.5

            x = expPow(x,exp).mul(spaceBaseUpgEffect('r2')).mul(spaceBaseUpgEffect('e4')).mul(spaceBaseUpgEffect('t2'))

            x = x.pow(experimentBoostEffect(1)).pow(constellationBoostEffect(1,true))

            return x
        },
    
        get passive() { return +hasResearch('r3') },
    },
    traject: {
        get require() { return E(1e12) },
        
        get amount() { return player.solar_system.traject },
        set amount(v) { player.solar_system.traject = v.max(0) },
    
        get gain() {
            if (player.solar_system.active === "") return E(0);

            let x = player.solar_system.reserv.div(1e12)

            if (x.lt(1)) return E(0);

            let exp = hasResearch('t2') ? 0.55 : 0.5
            
            x = expPow(x,exp).mul(spaceBaseUpgEffect('t3')).mul(spaceBaseUpgEffect('e6')).pow(constellationBoostEffect(2,true))

            return x
        },
    
        get passive() { return +hasResearch('t3') },
    },
    infinity: {
        get require() { return E('ee9e15') },
        
        get amount() { return player.inf.points },
        set amount(v) { player.inf.points = v.max(0) },

        get gain() {
            let x = player.fish.log10().log10().div(9e15).root(1.5).floor()

            if (hasInfinityUpgrade(0)) x = x.mul(infUpgradeEffect(0))

            x = x.mul(getCRBoost(14))

            return x
        },

        get passive() { return hasResearch('i1') ? 1 : 0 },
    },

    infinity_power: {
        get amount() { return player.inf.power },
        set amount(v) { player.inf.power = v.max(0) },

        get gain() {
            let x = E(0).add(player.inf.ordinal > -1 ? 1 : 0).mul(CURRENCIES['ordinal0'].mult)

           if (!hasResearch('i2')) x = x.overflow('1e750', 0.5)

            if (hasCE(3)) x = x.pow(CORRUPTION.effects[3].effect(0))

            x = expPow(x, remnantUpgEffect(18))

            return x
        },

        get passive() { return true },
    },

    corrupt: {
        get amount() { return player.inf.corrupted_fragments},
        set amount(v) { player.inf.corrupted_fragments = v.max(0) },

        get gain() {
            let x = player.fish.max(10).log10().log10().div('4.8e15').root(2)

            if (hasCE(0)) x = x.mul(CORRUPTION.effects[0].effect(0))

            if (!hasElement(13)) x = x.overflow('1e33', 0.5)

            if (hasElement(19)) x = x.pow(1.25)

            x = x.overflow('1e100', 0.25, 2)

            return x
        },

        get passive() { return player.fish.gte('ee4.8e15') && (hasElement(3) ? true : player.inf.corrupt)},
    },

    quarks: {
        get amount() { return player.quarks},
        set amount(v) { player.quarks = v.max(0) },

        get gain() {
            let x = player.fish.max(10).log10().log10().div('1e40').pow(hasElement(1) ? E(1.25) : 0.8)

            if (hasElement(25)) x = x.pow(1.25)

            if (hasElement(34)) x = x.pow(1.25)

            return x
        },

        get passive() { return +hasElement(1) },
    }

    
}

function setupCurrencies() {
    for (let i = 0; i < EXPLORE.length; i++) {
        var e = EXPLORE[i]
        CURRENCIES[e.resource] = {
            get amount() { return player.explore.res[i] },
            set amount(v) { player.explore.res[i] = v.max(0) },
        
            get gain() {
                if (tmp.ss_difficulty || player.explore.unl <= i) return E(0)

                let x = player.explore.base[i].mul(tmp.explore_upg_boost[i][0]).mul(tmp.explore_mult[i])

                if (i < 4 && tmp.cr_active) x = x.root(3)
        
                return x//.pow(getPAEffect(1))
            },
        }
    }

    for (let [i,v] of Object.entries(CURRENCIES)) {
        v.name ??= lang_text(i+"-name")
        v.costName ??= lang_text(i+"-costName") ?? v.name
    }

    var lang = lang_text("ore-names")

    for (let [i,k] of Object.entries(ORE_KEYS)) {
        i = parseInt(i)
        var o = ORES[k]
        CURRENCIES[k] = {
            get amount() { return player.humanoid.ores[k] },
            set amount(v) { player.humanoid.ores[k] = v.max(0) },

            get gain() { return i >= 9 ? Decimal.mul(tmp.ascend_ore_generator_mult,ORES[k].mult??1) : Decimal.mul(tmp.ore_generator_mult,ORES[k].mult??1) },

            get passive() { return (i >= 9 ? tmp.ascend_ore_generator + 9 > i : tmp.ore_generator > i) ? 1 : 0 },

            name: lang[k],
            costName: toColoredText(lang[k],o.textColor ?? o.color),
        }
    }

    lang = lang_text("constellation-boosts")

    for (let i = 0; i < CONSTELLATION.boosts.length; i++) {
        let b = CONSTELLATION.boosts[i]

        CURRENCIES[b.name] = {
            get amount() { return player.singularity.constellation_res[i] },
            set amount(v) { player.singularity.constellation_res[i] = v.max(0) },

            name: lang[i][0],
            costName: toTextStyle(lang[i][0],'star'),

            get gain() {
                let bht = player.singularity.bh_tier
                if (bht.lt(b.req)) return E(0);
                let x = bht.sub(b.req).pow_base(10).mul(tmp.constellation_mult)
                x = x.mul(sharkUpgEffect('s6'))
                return x
            },
        }
    }

    for (let i = 0; i < 24; i++) {

    

        CURRENCIES[`ordinal${i}`] = {
            get amount() { return player.inf.ordinals[i] },
            set amount(v) { player.inf.ordinals[i]  = v.max(0) },


            get gain() {
                let x = E(0).add(player.inf.ordinal > i - 1 ? 1 : 0).mul( i < 23 ? CURRENCIES[`ordinal${i+1}`].mult : 1)

                if (i == 23 && hasCE(5)) x = x.mul(CORRUPTION.effects[5].effect(0))
                return x
            },

            get mult() {
                let x = hasInfinityUpgrade(8) ? player.inf.ordinals[i].max(1).pow(E(1).add(E(0.1).mul(i))) : player.inf.ordinals[i].max(1).pow(E(0.5).add(E(0.1).mul(i)))

                if (i == 0 && hasInfinityUpgrade(6)) {
                    x = player.inf.ordinals[i].max(1).pow(1.05)
                }
                return x
            },
        }

     
    }
}

function gainCurrency(id,amt) {
    var curr = CURRENCIES[id]
    curr.amount = curr.amount.add(amt)
    if ('total' in curr) curr.total = curr.total.add(amt)
}
