const { menu } = require('../models');
const db = require('../models');
var menus = [
    {
        name: "point of sale",
        type: "APP",
        order: 1,
        subs: [
            {
                name: "transaction",
                description: "",
                url: null,
                order: 1,
                accesses: [
                    {
                        name: "create transaction"
                    },
                    {
                        name: "modify transaction"
                    },
                    {
                        name: "cancel transaction"
                    },
                    {
                        name: "create custom ammount"
                    },
                    {
                        name: "modify custom ammount"
                    },
                    {
                        name: "delete custom ammount"
                    },
                    {
                        name: "set discount"
                    },
                ]
            },
            {
                name: "activity",
                description: "",
                url: null,
                order: 1,
                accesses: [
                    {
                        name: "view closed bill"
                    },
                    {
                        name: "issue refund"
                    },
                    {
                        name: "reprint bill"
                    },
                ]
            },
            {
                name: "shift",
                description: "",
                url: null,
                order: 1,
                accesses: [
                    {
                        name: "manage shift option"
                    },
                    {
                        name: "start and close shift"
                    },
                    {
                        name: "start and close other shift"
                    },
                    {
                        name: "view history shift"
                    },
                ]
            }

        ]
    },


    // {
    //     name: "activity",
    //     type: "APP",
    //     order: 1,
    //     subs: [
    //         {
    //             name: "manage bill",
    //             description: "view print or lain2",
    //             url: null,
    //             order: 1,
    //             require_pin: false
    //         },
    //         {
    //             name: "issue refund",
    //             description: "batalkan item, batal bill",
    //             url: null,
    //             order: 1,
    //             require_pin: true
    //         },
    //         {
    //             name: "resend receipts",
    //             description: "mengirim ulang nota, tidak boleh sembarangan harus spv/admin/mng",
    //             url: null,
    //             order: 1,
    //             require_pin: true
    //         },
    //     ]
    // },
    // {
    //     name: "inventory",
    //     type: "APP",
    //     order: 1,
    //     subs: [
    //         {
    //             name: "view inventory",
    //             description: "view sisa stok",
    //             url: null,
    //             order: 1,
    //             require_pin: false
    //         },
    //     ]
    // },
    // {
    //     name: "shift",
    //     type: "APP",
    //     order: 1,
    //     subs: [
    //         {
    //             name: "manage shift",
    //             description: "buka tutup shift",
    //             url: null,
    //             order: 1,
    //             require_pin: false
    //         },
    //     ]
    // },
    // {
    //     name: "setting",
    //     type: "APP",
    //     order: 1,
    //     subs: [
    //         {
    //             name: "manage favorit",
    //             description: "mengatur produk favorit",
    //             url: null,
    //             order: 1,
    //             require_pin: false
    //         },
    //     ]
    // }
]

const createMenu = async () => {

    let result = { menus: [], sub_menus: [], accesses: [] };
    await Promise.all(menus.map(async (item, x) => {
        let menu = await db.menu.create({
            name: item.name,
            type: item.type,
            order: x
        });
        if (menu) {
            result.menus.push(menu)
            if (item.subs.length > 0) {

                await Promise.all(item.subs.map(async (sub, y) => {
                    let subx = await db.sub_menu.create({
                        name: sub.name,
                        menu_id: menu.id,
                        description: sub.description,
                        url: sub.url,
                        order: y
                    })

                    if (subx) {
                        result.sub_menus.push(subx)
                        if (sub.accesses.length > 0) {
                            await Promise.all(sub.accesses.map(async (access) => {
                                let acc = await db.access.create({
                                    name: access.name,
                                    sub_menu_id: subx.id
                                })
                                result.accesses.push(acc)
                            }))
                        }
                    }

                }))
            }
        }
    }))
    return result;
}

const createRoleAccess = async (role_id, accesses) => {
    console.log("meuxx", accesses)
    // Promise.all(menus.map(async (item, key) => {
    Promise.all(accesses.map(async (access) => {
        await db.role_access.create({
            role_id: role_id,
            access_id: access.id
        })

    }))
    // }));
}

module.exports = { createMenu, createRoleAccess };