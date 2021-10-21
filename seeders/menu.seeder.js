const { menu } = require('../models');
const db = require('../models');
var menus = [
    {
        name: "point of sale",
        type: "APP",
        order: 1,
        subs: [
            {
                name: "create transaction",
                description: "",
                url: null,
                order: 1,
                require_pin: false
            },
            {
                name: "custom ammount",
                description: "masukkan nominal custom untuk keperluan extra charge dll",
                url: null,
                order: 1,
                require_pin: false
            }

        ]
    },
    {
        name: "activity",
        type: "APP",
        order: 1,
        subs: [
            {
                name: "manage bill",
                description: "view print or lain2",
                url: null,
                order: 1,
                require_pin: false
            },
            {
                name: "issue refund",
                description: "batalkan item, batal bill",
                url: null,
                order: 1,
                require_pin: true
            },
            {
                name: "resend receipts",
                description: "mengirim ulang nota, tidak boleh sembarangan harus spv/admin/mng",
                url: null,
                order: 1,
                require_pin: true
            },
        ]
    },
    {
        name: "inventory",
        type: "APP",
        order: 1,
        subs: [
            {
                name: "view inventory",
                description: "view sisa stok",
                url: null,
                order: 1,
                require_pin: false
            },
        ]
    },
    {
        name: "shift",
        type: "APP",
        order: 1,
        subs: [
            {
                name: "manage shift",
                description: "buka tutup shift",
                url: null,
                order: 1,
                require_pin: false
            },
        ]
    },
    {
        name: "setting",
        type: "APP",
        order: 1,
        subs: [
            {
                name: "manage favorit",
                description: "mengatur produk favorit",
                url: null,
                order: 1,
                require_pin: false
            },
        ]
    }
]

const createMenu = async () => {

    let results = [];
    Promise.all(menus.map(async (item, x) => {
        let menu = await db.menu.create({
            name: item.name,
            type: item.type,
            order: x
        });
        if (menu && item.subs.length > 0) {

            var subs = [];
            Promise.all(item.subs.map(async (sub, y) => {
                let subx = await db.sub_menu.create({
                    name: sub.name,
                    menu_id: menu.id,
                    description: sub.description,
                    url: sub.url,
                    order: y,
                    require_pin: sub.require_pin
                })
                console.log("subx", subx);
                if (subx) results.push(subx);

            }))
            // menu['subs'] = subs;
        }
        // results.push(menu)
    }))
    return results;
}

const createRoleAccess = async (role_id, menus) => {
    console.log("meuxx", menus)
    // Promise.all(menus.map(async (item, key) => {
    Promise.all(menus.map(async (sub) => {
        await db.role_access.create({
            role_id: role_id,
            sub_menu_id: sub.id
        })

    }))
    // }));
}

module.exports = { createMenu, createRoleAccess };