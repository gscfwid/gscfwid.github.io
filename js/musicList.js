/**************************************************
 * GithubMusicPlayer v3.0
 * 播放列表配置模块
 *************************************************/
// 建议修改前先备份一下
// js/player.js 中开启调试模式，然后按 F12 打开浏览器的控制台。播放歌曲或点开歌单即可看到相应信息

var musicList = [
    // 以下三个系统预留列表请勿更改，否则可能导致程序无法正常运行！
    // 预留列表：搜索结果
    {
        id: "0",
        name: "搜索结果",   // 播放列表名字
        cover: "",          // 播放列表封面
        creatorName: "",        // 列表创建者名字
        creatorAvatar: "",      // 列表创建者头像
        item: [

        ]
    },
    // 预留列表：正在播放
    {
        id: "1",
        name: "正在播放",   // 播放列表名字
        cover: "images/album.png",          // 播放列表封面
        creatorName: "",        // 列表创建者名字
        creatorAvatar: "",      // 列表创建者头像
        item: [

        ]
    },
    // 预留列表：播放历史
    {
        /* 可以手动维护这个歌单，然后再把它自动生成就好了，其他功能用到再调 */
        id: "2",
        name: "播放历史",   // 播放列表名字
        cover: "images/history.png",          // 播放列表封面
        creatorName: "",        // 列表创建者名字
        creatorAvatar: "",      // 列表创建者头像
        item: [

        ]
    },
    // 收藏列表：用户收藏的歌曲
    {
        id: "favorites",
        name: "我的收藏",   // 播放列表名字
        cover: "images/favorites.png",          // 播放列表封面（使用不同的图标）
        creatorName: "",        // 列表创建者名字
        creatorAvatar: "",      // 列表创建者头像
        item: [

        ]
    },
    // 以上四个系统预留列表请勿更改，否则可能导致程序无法正常运行！
    //*********************************************
    // 自定义列表，手动创建列表并添加歌曲信息
    {
        id: "9527",
        name: "Github 歌单",        // 播放列表名字
        cover: "images/album.png", // 播放列表封面图像
        creatorName: "EXP",        // 列表创建者名字(暂时没用到，可空)
        creatorAvatar: "EXP",      // 列表创建者头像(暂时没用到，可空)
        item: [                 // 这里面放歌曲（除非调试，否则这里不要手动添加，不然不会自动加载 music_list_*.json）
            /*
                {
                    id: "964fc8fd474936dc1eb50654d14703a9",
                    name: "brave heart - 初代进化曲",
                    artist: "brave heart",
                    album: "",
                    url: "static/动漫/brave heart - 初代进化曲.mp3",
                    pic: "static/动漫/brave heart - 初代进化曲.jpg",
                    lyric: "static/动漫/brave heart - 初代进化曲.lrc",
                    source: "local",
                    url_id: "964fc8fd474936dc1eb50654d14703a9",
                    pic_id: "964fc8fd474936dc1eb50654d14703a9",
                    lyric_id: "964fc8fd474936dc1eb50654d14703a9"
                },
                {
                    id: "55503cb295eecbf1bc2bed651583d0af",
                    name: "妖精的尾巴 - 星",
                    artist: "妖精的尾巴",
                    album: "「FAIRY TAIL」ORIGINAL SOUNDTRACK",
                    url: "static/动漫/妖精的尾巴 - 星.mp3",
                    pic: "static/动漫/妖精的尾巴 - 星.jpg",
                    lyric: "static/动漫/妖精的尾巴 - 星.lrc",
                    source: "local",
                    url_id: "55503cb295eecbf1bc2bed651583d0af",
                    pic_id: "55503cb295eecbf1bc2bed651583d0af",
                    lyric_id: "55503cb295eecbf1bc2bed651583d0af"
                },
                {
                    id: "666b6d82bef4b5ab0c02907a50bd1b82",
                    name: "程响 - 可能",
                    artist: "程响",
                    album: "",
                    url: "static/流行/程响 - 可能.mp3",
                    pic: "static/流行/程响 - 可能.jpg",
                    lyric: "static/流行/程响 - 可能.lrc",
                    source: "local",
                    url_id: "666b6d82bef4b5ab0c02907a50bd1b82",
                    pic_id: "666b6d82bef4b5ab0c02907a50bd1b82",
                    lyric_id: "666b6d82bef4b5ab0c02907a50bd1b82"
                }  // 列表中最后一首歌大括号后面不要加逗号
            */
        ]
    }    ,
    {
        id: "9528",
        name: "Bell玲惠",        // 播放列表名字
        cover: "images/album.png", // 播放列表封面图像
        creatorName: "EXP",        // 列表创建者名字(暂时没用到，可空)
        creatorAvatar: "EXP",      // 列表创建者头像(暂时没用到，可空)
        item: [
            {
                        "id": "b2a4f8d12726f162430fe20bb5cc60d7",
                        "name": "Bell 玲惠 -【我要当超人 I Want To Be A Superhero】官方MV Official MV [SFkh4LXLzcM]",
                        "artist": "Bell玲惠",
                        "album": "",
                        "url": "static/Bell玲惠/Bell 玲惠 -【我要当超人 I Want To Be A Superhero】官方MV Official MV [SFkh4LXLzcM].mp3",
                        "pic": "",
                        "lyric": "",
                        "source": "local",
                        "url_id": "b2a4f8d12726f162430fe20bb5cc60d7",
                        "pic_id": "",
                        "lyric_id": ""
            },
            {
                        "id": "757c280980fd22f751afed550c9ee0c2",
                        "name": "One More Time [v2pS3Vs703A]",
                        "artist": "Bell玲惠",
                        "album": "One More Time",
                        "url": "static/Bell玲惠/One More Time [v2pS3Vs703A].mp3",
                        "pic": "",
                        "lyric": "",
                        "source": "local",
                        "url_id": "757c280980fd22f751afed550c9ee0c2",
                        "pic_id": "",
                        "lyric_id": ""
            },
            {
                        "id": "40205a5cc92ba250b695da3388c3b730",
                        "name": "Ptrp《爱立刻有》cover：bell玲惠 （泰语版本） [ZgmBAAe8QdQ]",
                        "artist": "Bell玲惠",
                        "album": "",
                        "url": "static/Bell玲惠/Ptrp《爱立刻有》cover：bell玲惠 （泰语版本） [ZgmBAAe8QdQ].mp3",
                        "pic": "",
                        "lyric": "",
                        "source": "local",
                        "url_id": "40205a5cc92ba250b695da3388c3b730",
                        "pic_id": "",
                        "lyric_id": ""
            },
            {
                        "id": "ca3cd96bf5df24acf53a6ce0d15dd9cd",
                        "name": "《你为什么不说话》yihuik&bell玲惠 [QfjW8mrqQ9g]",
                        "artist": "Bell玲惠",
                        "album": "",
                        "url": "static/Bell玲惠/《你为什么不说话》yihuik&bell玲惠 [QfjW8mrqQ9g].mp3",
                        "pic": "",
                        "lyric": "",
                        "source": "local",
                        "url_id": "ca3cd96bf5df24acf53a6ce0d15dd9cd",
                        "pic_id": "",
                        "lyric_id": ""
            },
            {
                        "id": "221d5a4b7653d1520fbc7798655df375",
                        "name": "《告白》-Bell玲惠⧸迦勒 [oEUBrHYGX1A]",
                        "artist": "Bell玲惠",
                        "album": "",
                        "url": "static/Bell玲惠/《告白》-Bell玲惠⧸迦勒 [oEUBrHYGX1A].mp3",
                        "pic": "",
                        "lyric": "",
                        "source": "local",
                        "url_id": "221d5a4b7653d1520fbc7798655df375",
                        "pic_id": "",
                        "lyric_id": ""
            },
            {
                        "id": "4b822523cb59f6f741451c326f504729",
                        "name": "《天后》陈势安 Cover（Bell玲惠） [RbjXrHUsgVA]",
                        "artist": "Bell玲惠",
                        "album": "",
                        "url": "static/Bell玲惠/《天后》陈势安 Cover（Bell玲惠） [RbjXrHUsgVA].mp3",
                        "pic": "",
                        "lyric": "",
                        "source": "local",
                        "url_id": "4b822523cb59f6f741451c326f504729",
                        "pic_id": "",
                        "lyric_id": ""
            },
            {
                        "id": "db9a0307b1347c6f3b260aed906c6b55",
                        "name": "《如果的事》张韶涵&范玮琪 coverBell玲惠 [5tGRMP9z-3c]",
                        "artist": "Bell玲惠",
                        "album": "",
                        "url": "static/Bell玲惠/《如果的事》张韶涵&范玮琪 coverBell玲惠 [5tGRMP9z-3c].mp3",
                        "pic": "",
                        "lyric": "",
                        "source": "local",
                        "url_id": "db9a0307b1347c6f3b260aed906c6b55",
                        "pic_id": "",
                        "lyric_id": ""
            },
            {
                        "id": "7993992e3d00eb639b3d52464a3e9460",
                        "name": "《想我就打给我》-Bell玲惠 [A2y66ROBOio]",
                        "artist": "Bell玲惠",
                        "album": "",
                        "url": "static/Bell玲惠/《想我就打给我》-Bell玲惠 [A2y66ROBOio].mp3",
                        "pic": "",
                        "lyric": "",
                        "source": "local",
                        "url_id": "7993992e3d00eb639b3d52464a3e9460",
                        "pic_id": "",
                        "lyric_id": ""
            },
            {
                        "id": "95ff0ece5cb6a09ea49b0e94c9c7d861",
                        "name": "《我们打着光脚在风车下跑，手上的狗尾巴草摇啊摇》-等一下就回家（Cover-Bell玲惠） [zquJgWkZ02U]",
                        "artist": "Bell玲惠",
                        "album": "",
                        "url": "static/Bell玲惠/《我们打着光脚在风车下跑，手上的狗尾巴草摇啊摇》-等一下就回家（Cover-Bell玲惠） [zquJgWkZ02U].mp3",
                        "pic": "",
                        "lyric": "",
                        "source": "local",
                        "url_id": "95ff0ece5cb6a09ea49b0e94c9c7d861",
                        "pic_id": "",
                        "lyric_id": ""
            },
            {
                        "id": "6dae4a39964882a7d25fea071b4d12fc",
                        "name": "《梦》 Bell玲惠 [KaUHca8AuHI]",
                        "artist": "Bell玲惠",
                        "album": "",
                        "url": "static/Bell玲惠/《梦》 Bell玲惠 [KaUHca8AuHI].mp3",
                        "pic": "",
                        "lyric": "",
                        "source": "local",
                        "url_id": "6dae4a39964882a7d25fea071b4d12fc",
                        "pic_id": "",
                        "lyric_id": ""
            },
            {
                        "id": "e6c251ffd488b55d6715918a0c2ab55e",
                        "name": "《爱你》 翻唱-Bell玲惠⧸刘兆宇 [JHQcalzj5Vc]",
                        "artist": "Bell玲惠",
                        "album": "",
                        "url": "static/Bell玲惠/《爱你》 翻唱-Bell玲惠⧸刘兆宇 [JHQcalzj5Vc].mp3",
                        "pic": "",
                        "lyric": "",
                        "source": "local",
                        "url_id": "e6c251ffd488b55d6715918a0c2ab55e",
                        "pic_id": "",
                        "lyric_id": ""
            },
            {
                        "id": "ae8d1044b7048cbfc561aeb634a3c478",
                        "name": "《爱就一个字》cover by Bell玲惠 [AmLNDRNlYgs]",
                        "artist": "Bell玲惠",
                        "album": "",
                        "url": "static/Bell玲惠/《爱就一个字》cover by Bell玲惠 [AmLNDRNlYgs].mp3",
                        "pic": "",
                        "lyric": "",
                        "source": "local",
                        "url_id": "ae8d1044b7048cbfc561aeb634a3c478",
                        "pic_id": "",
                        "lyric_id": ""
            },
            {
                        "id": "e50d114b44ec75680b78244d16013c7b",
                        "name": "《眼泪记得你》-孫盛希ShiShi  Cover by Bell玲惠 [a8Hw4g6QQuI]",
                        "artist": "Bell玲惠",
                        "album": "",
                        "url": "static/Bell玲惠/《眼泪记得你》-孫盛希ShiShi  Cover by Bell玲惠 [a8Hw4g6QQuI].mp3",
                        "pic": "",
                        "lyric": "",
                        "source": "local",
                        "url_id": "e50d114b44ec75680b78244d16013c7b",
                        "pic_id": "",
                        "lyric_id": ""
            },
            {
                        "id": "39f5dc39b5675921a884701a6c2a3e17",
                        "name": "《秘境》secret place 原唱：Bell玲惠⧸Inhibitor [7v0cU-uJpLc]",
                        "artist": "Bell玲惠",
                        "album": "",
                        "url": "static/Bell玲惠/《秘境》secret place 原唱：Bell玲惠⧸Inhibitor [7v0cU-uJpLc].mp3",
                        "pic": "",
                        "lyric": "",
                        "source": "local",
                        "url_id": "39f5dc39b5675921a884701a6c2a3e17",
                        "pic_id": "",
                        "lyric_id": ""
            },
            {
                        "id": "df9dcd8eaad10dd2482ba96c6d27fa66",
                        "name": "《那么骄傲》（致女孩）原唱金海心 cover bell玲惠 [2CHTYgxegpw]",
                        "artist": "Bell玲惠",
                        "album": "",
                        "url": "static/Bell玲惠/《那么骄傲》（致女孩）原唱金海心 cover bell玲惠 [2CHTYgxegpw].mp3",
                        "pic": "",
                        "lyric": "",
                        "source": "local",
                        "url_id": "df9dcd8eaad10dd2482ba96c6d27fa66",
                        "pic_id": "",
                        "lyric_id": ""
            },
            {
                        "id": "4d7eb7604021b1b855389904119f95aa",
                        "name": "不忙，你说我在听 [za_3AWXYaWI]",
                        "artist": "Bell玲惠",
                        "album": "不忙，你说我在听",
                        "url": "static/Bell玲惠/不忙，你说我在听 [za_3AWXYaWI].mp3",
                        "pic": "",
                        "lyric": "",
                        "source": "local",
                        "url_id": "4d7eb7604021b1b855389904119f95aa",
                        "pic_id": "",
                        "lyric_id": ""
            },
            {
                        "id": "a11834ff526718864cbd93e5ed2a6962",
                        "name": "冬日恋曲 [XC768AghZE0]",
                        "artist": "Bell玲惠",
                        "album": "冬日恋曲",
                        "url": "static/Bell玲惠/冬日恋曲 [XC768AghZE0].mp3",
                        "pic": "",
                        "lyric": "",
                        "source": "local",
                        "url_id": "a11834ff526718864cbd93e5ed2a6962",
                        "pic_id": "",
                        "lyric_id": ""
            },
            {
                        "id": "7da241de605473d04aa62e9a62701255",
                        "name": "匿名的朋友 - 杨丞琳（cover Bell玲惠） [RLODCfCSjUk]",
                        "artist": "Bell玲惠",
                        "album": "",
                        "url": "static/Bell玲惠/匿名的朋友 - 杨丞琳（cover Bell玲惠） [RLODCfCSjUk].mp3",
                        "pic": "",
                        "lyric": "",
                        "source": "local",
                        "url_id": "7da241de605473d04aa62e9a62701255",
                        "pic_id": "",
                        "lyric_id": ""
            },
            {
                        "id": "0ff9b00bac53391e1791a7929a26f08b",
                        "name": "千万个你 - Bell玲惠 [diJcXB7Ot14]",
                        "artist": "Bell玲惠",
                        "album": "",
                        "url": "static/Bell玲惠/千万个你 - Bell玲惠 [diJcXB7Ot14].mp3",
                        "pic": "",
                        "lyric": "",
                        "source": "local",
                        "url_id": "0ff9b00bac53391e1791a7929a26f08b",
                        "pic_id": "",
                        "lyric_id": ""
            },
            {
                        "id": "ac6cefbe6a68f049cc11731799ac4d95",
                        "name": "后来才知道 [UfZv0A-osro]",
                        "artist": "Bell玲惠",
                        "album": "后来才知道",
                        "url": "static/Bell玲惠/后来才知道 [UfZv0A-osro].mp3",
                        "pic": "",
                        "lyric": "",
                        "source": "local",
                        "url_id": "ac6cefbe6a68f049cc11731799ac4d95",
                        "pic_id": "",
                        "lyric_id": ""
            },
            {
                        "id": "46ccbd45d4a0ff63379225defb867521",
                        "name": "坠落雾里 [WBjZfePASmA]",
                        "artist": "Bell玲惠",
                        "album": "坠落雾里",
                        "url": "static/Bell玲惠/坠落雾里 [WBjZfePASmA].mp3",
                        "pic": "",
                        "lyric": "",
                        "source": "local",
                        "url_id": "46ccbd45d4a0ff63379225defb867521",
                        "pic_id": "",
                        "lyric_id": ""
            },
            {
                        "id": "d629e4f51d4dc3963eaaf23abd334677",
                        "name": "心头 - Bell玲惠 [gudNGMzpsj0]",
                        "artist": "Bell玲惠",
                        "album": "",
                        "url": "static/Bell玲惠/心头 - Bell玲惠 [gudNGMzpsj0].mp3",
                        "pic": "",
                        "lyric": "",
                        "source": "local",
                        "url_id": "d629e4f51d4dc3963eaaf23abd334677",
                        "pic_id": "",
                        "lyric_id": ""
            },
            {
                        "id": "3bf432dd1256eb32b1361370f6742fd9",
                        "name": "新年一岁除 Bell玲惠⧸chewie甲甲甲 [Sbt_Y7xgOzk]",
                        "artist": "Bell玲惠",
                        "album": "",
                        "url": "static/Bell玲惠/新年一岁除 Bell玲惠⧸chewie甲甲甲 [Sbt_Y7xgOzk].mp3",
                        "pic": "",
                        "lyric": "",
                        "source": "local",
                        "url_id": "3bf432dd1256eb32b1361370f6742fd9",
                        "pic_id": "",
                        "lyric_id": ""
            },
            {
                        "id": "9ad03f4fb186ff4db7718baefaf910d8",
                        "name": "明天过后 - 张杰 cover（Bell玲惠） [V_bZNouD2GE]",
                        "artist": "Bell玲惠",
                        "album": "",
                        "url": "static/Bell玲惠/明天过后 - 张杰 cover（Bell玲惠） [V_bZNouD2GE].mp3",
                        "pic": "",
                        "lyric": "",
                        "source": "local",
                        "url_id": "9ad03f4fb186ff4db7718baefaf910d8",
                        "pic_id": "",
                        "lyric_id": ""
            },
            {
                        "id": "1be7fc6ad14f1d5d825e89f8b92cffb3",
                        "name": "未来-Bell玲惠 [nLheAIE7-dQ]",
                        "artist": "Bell玲惠",
                        "album": "",
                        "url": "static/Bell玲惠/未来-Bell玲惠 [nLheAIE7-dQ].mp3",
                        "pic": "",
                        "lyric": "",
                        "source": "local",
                        "url_id": "1be7fc6ad14f1d5d825e89f8b92cffb3",
                        "pic_id": "",
                        "lyric_id": ""
            },
            {
                        "id": "f3a1cabe63acb6ec74d4f8c170619a0e",
                        "name": "爱立刻有 [e6MYGLrfCNM]",
                        "artist": "Bell玲惠",
                        "album": "爱立刻有",
                        "url": "static/Bell玲惠/爱立刻有 [e6MYGLrfCNM].mp3",
                        "pic": "",
                        "lyric": "",
                        "source": "local",
                        "url_id": "f3a1cabe63acb6ec74d4f8c170619a0e",
                        "pic_id": "",
                        "lyric_id": ""
            },
            {
                        "id": "333a4c7e5dc83ddbdbf01cbcd052bdf2",
                        "name": "知不知道 [T3N9PgRf5oA]",
                        "artist": "bell玲惠, Sixx66",
                        "album": "知不知道",
                        "url": "static/Bell玲惠/知不知道 [T3N9PgRf5oA].mp3",
                        "pic": "",
                        "lyric": "",
                        "source": "local",
                        "url_id": "333a4c7e5dc83ddbdbf01cbcd052bdf2",
                        "pic_id": "",
                        "lyric_id": ""
            },
            {
                        "id": "a54ef128ab45ab072b98ba28ae31e8da",
                        "name": "蝴蝶泉边 — Cover（Bell玲惠） [krNfFfC95WA]",
                        "artist": "Bell玲惠",
                        "album": "",
                        "url": "static/Bell玲惠/蝴蝶泉边 — Cover（Bell玲惠） [krNfFfC95WA].mp3",
                        "pic": "",
                        "lyric": "",
                        "source": "local",
                        "url_id": "a54ef128ab45ab072b98ba28ae31e8da",
                        "pic_id": "",
                        "lyric_id": ""
            },
            {
                        "id": "9d5a6918ed57d70cec8765b4388c7d21",
                        "name": "课本里的旧时光 Bell玲惠 [ulqvPHls-q8]",
                        "artist": "Bell玲惠",
                        "album": "",
                        "url": "static/Bell玲惠/课本里的旧时光 Bell玲惠 [ulqvPHls-q8].mp3",
                        "pic": "",
                        "lyric": "",
                        "source": "local",
                        "url_id": "9d5a6918ed57d70cec8765b4388c7d21",
                        "pic_id": "",
                        "lyric_id": ""
            },
            {
                        "id": "7bf53ac927758ef3217b9f3143d13920",
                        "name": "门没锁 - 黄品冠cover（Bell玲惠） [c_a-4SKM6dw]",
                        "artist": "Bell玲惠",
                        "album": "",
                        "url": "static/Bell玲惠/门没锁 - 黄品冠cover（Bell玲惠） [c_a-4SKM6dw].mp3",
                        "pic": "",
                        "lyric": "",
                        "source": "local",
                        "url_id": "7bf53ac927758ef3217b9f3143d13920",
                        "pic_id": "",
                        "lyric_id": ""
            }
]
    }
];
