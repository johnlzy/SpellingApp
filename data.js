const DATABASE = {
    "Marie": {
        "en": {
            "Term 1 Week 2": ["ingredients", "clattered", "frothy", "canister", "novice", "mediocre", "athlete", "illegible", "gestured", "raised an eyebrow, looked at me puzzledly and shrugged", "craned our necks and strained our eyes", "in hushed tones"],
            "Term 1 Week 3": ["acquaintance", "adequate", "analysis", "appalling", "apparent", "appropriate", "hurled insults", "was spoiling for a fight", "was boiling with rage", "gritted her teeth", "clenched her fists", "cringed in terror", "rained torrents of abuse"],
            "Term 1 Week 4": ["veterinarian", "responsibilities", "escalator", "preventable", "infections", "pedestrians", "peculiarly", "knowledgeable", "psyched up", "head was spinning with excitement", "paralysed with fear", "quivering like jelly"],
            "Term 1 Week 5": ["concentrate", "curious", "curiosity", "decision", "desperate", "deteriorate", "on cloud nine", "face lit up like sun rays shining down", "heart swelled", "walked with a spring in her step", "broke my heart", "bawled her eyes out", "lips curled downwards", "tears started rolling down his cheeks"],
            "Term 1 Week 6": ["paralysed", "disability", "mischievous", "resilience", "determination", "intentional", "the extra mile", "went forward to render assistance", "the knot in her stomach loosened", "heart swelled with pride", "on the brink of tears", "muttered a prayer of thanks"],
            "Term 1 Week 9": ["Paralympians", "achievements", "opponent", "visually impaired", "representatives", "inclined ramp", "dilemma", "conscientious", "fish out of water", "silent admittance", "sigh deeply with resignation", "mustered up his courage"],
            "Term 2 Week 1": ["action", "amazement", "happiness", "disability", "cheerfulness", "decision", "destruction", "emptiness", "discussion", "responsibility", "permission", "performance"],
            "Term 2 Week 2": ["extremely", "humour", "equipment", "government", "businessman", "grievous", "embarrass", "shattered into smithereens", "appearance", "plummeted through the air", "heart could not help but palpitate", "eyes dilated in horror"],
            "Term 2 Week 3": ["annular eclipse", "asteroid", "continuously orbit", "telescope", "natural phenomena", "infinitely", "astronomer", "mesmerised by the magnificent sunset", "stared open-mouthed", "eyes blurred with tears of happiness", "riveted to", "bleary eyes did their best to focus"],
            "Term 2 Week 4": ["miraculously", "marvel", "commuters", "scenery", "awe-inspiring", "excruciating pain", "permanent", "poisonous", "quarrelled", "disastrous", "souvenir", "separate"],
            "Term 2 Week 5": ["hot on his heels", "scurried around", "sprang to his feet", "tore down", "scuttled off like frightened rats", "made a mad scramble", "raced all the way", "cried hysterically", "To her utter dismay", "darted across", "in hot pursuit", "fled into the darkness of the alley"],
            "Term 2 Week 6": ["snapped", "practising", "measure", "scrambled", "whispered", "stared", "filthy", "warily", "impetuous", "stealthily", "dilapidated", "introvert"],
            "Term 2 Week 9": ["rose in anger", "hissed through his clenched teeth", "in a gruff voice", "give him a dressing-down", "grinned from ear to ear", "spoke to me endearingly", "made a request with anticipation written all over his face", "with a bone smashing handshake", "licked his lips nervously", "barely audible", "was oozing with pride", "turned up her nose and snorted"]
        },
        "zh": {
            "听写(一) (第一课)": ["汉语拼音 - 了解 (liǎo jiě)", "汉语拼音 - 秘密 (mì mì)", "汉语拼音 - 情况 (qíng kuàng)", "汉语拼音 - 疲倦 (pí juàn)", "广告", "听众", "看新闻", "一部戏", "看得入迷", "拍手欢笑", "精彩的节目", "国内外的事情", "她刚做完了功课。", "工人叔叔在建房子。"],
            "听写(二) (第二课)": ["汉语拼音 - 递 (dì)", "汉语拼音 - 担心 (dān xīn)", "汉语拼音 - 撑伞 (chēng sǎn)", "汉语拼音 - 表示 (biǎo shì)", "讨论", "姑姑", "鱼丸面", "兄弟俩", "灵机一动", "急急忙忙", "满天乌云", "又急又怕", "一串牛肉丸", "忽然下起大雨"],
            "听写(三) (第三课)": ["汉语拼音 - 批评 (pī píng)", "汉语拼音 - 长辈 (zhǎng bèi)", "汉语拼音 - 警察 (jǐng chá)", "汉语拼音 - 发脾气 (fā pí qì)", "最近", "偷东西", "谢谢您", "华文补习", "迷上游戏", "尊敬老师", "非常后悔", "一直吵架", "我受不了了。", "不停地流眼泪"],
            "听写(四) (第四课)": ["汉语拼音 - 劝告 (quàn gào)", "汉语拼音 - 赞许 (zàn xǔ)", "汉语拼音 - 保证 (bǎo zhèng)", "汉语拼音 - 皱眉头 (zhòu méi tóu)", "由于", "脚尖", "洗干净", "责任重大", "学校食堂", "安静地看书", "你不应该插队。", "对别人不公平", "今天我负责扫地。", "注意自己的行为"],
            "听写(五) (第五课)": ["汉语拼音 - 继续 (jì xù)", "汉语拼音 - 胆小 (dǎn xiǎo)", "汉语拼音 - 微笑 (wēi xiào)", "汉语拼音 - 项目 (xiàng mù)", "打针", "伸出左手", "哇哇大哭", "闷闷不乐", "回到课室", "定时吃药", "检查身体", "闭起眼睛", "松了一口气", "考试结束了"],
            "听写(六) (第六课)": ["汉语拼音 - 训练 (xùn liàn)", "汉语拼音 - 鼓励 (gǔ lì)", "汉语拼音 - 丰富 (fēng fù)", "汉语拼音 - 坚持 (jiān chí)", "童子军", "打功夫", "天天练习", "团队合作", "身体健康", "好久不见", "十分辛苦", "游戏开始了", "夸我懂事了", "认识新同学"],
            "听写(七) (第七课)": ["汉语拼音 - 随手 (suí shǒu)", "汉语拼音 - 道歉 (dào qiàn)", "汉语拼音 - 秩序 (zhì xù)", "汉语拼音 - 耐心 (nài xīn)", "图书馆", "摇摇头", "听从劝告", "觉得后悔", "走进车厢", "拼命地挤", "两位乘客", "乱抢食物", "很不好意思", "排成一条长长的人龙"],
            "听写(八) (第八课)": ["汉语拼音 - 危险 (wēi xiǎn)", "汉语拼音 - 遵守 (zūn shǒu)", "汉语拼音 - 到达 (dào dá)", "汉语拼音 - 采访 (cǎi fǎng)", "流血", "送往医院", "救护人员", "照顾伤者", "校车司机", "交通意外", "另一个行人", "被困在车里", "受了皮外伤", "打求救电话"],
            "听写(九) (第九课)": ["汉语拼音 - 提供 (tí gōng)", "汉语拼音 - 依然 (yī rán)", "汉语拼音 - 讨厌 (tǎo yàn)", "汉语拼音 - 一般 (yì bān)", "文具店", "组屋居民", "地铁月台", "沿着坡道", "没听清楚", "离开家人", "其中一个", "口味变了", "笑着用手比画", "把座位让给老爷爷"]
        }
    },
    "Maddie": {
        "en": {
            "Term 1 Week 5": ["rat", "run", "cry", "crane", "fly", "flowers", "try", "tree", "the", "they"],
            "Term 1 Week 6": ["rain", "train", "mouse", "house", "cake", "face", "ask", "all", "and", "you"],
            "Term 1 Week 7": ["dug", "duck", "tap", "tub", "pig", "pet", "mud", "scrub", "he", "she"],
            "Term 1 Week 8": ["roll", "doll", "good", "give", "ball", "bird", "at", "that", "in", "it"],
            "Term 1 Week 9": ["lion", "lick", "not", "note", "walk", "water", "snap", "snake", "be", "his"],
            "Term 1 Week 10": ["cap", "trap", "tea", "leap", "feel", "see", "sweet", "swing", "for", "what"],
            "Term 2 Week 1": ["late", "gate", "five", "hive", "sticks", "stop", "tiger", "open", "out", "come"],
            "Term 2 Week 2": ["walked", "jumped", "bug", "jug", "pop", "mop", "pie", "tie", "so", "up"],
            "Term 2 Week 3": ["giant", "gentle", "zoom", "food", "bread", "break", "blew", "drew", "after", "with"],
            "Term 2 Week 4": ["goat", "game", "glue", "blue", "grass", "grab", "tooth", "soon", "get", "some"],
            "Term 2 Week 5": ["push", "flush", "out", "mouth", "down", "clown", "dark", "star", "these", "them"],
            "Term 2 Week 6": ["scurry", "hurry", "queen", "honey", "nibble", "bubble", "drink", "drive", "more", "are"],
            "Term 2 Week 7": ["fridge", "flat", "creep", "crawl", "plan", "stroll", "glad", "find", "has", "ask"],
            "Term 2 Week 8": ["shelf", "chair", "march", "fish", "skip", "quick", "trick", "have", "look", "little"],
            "Term 3 Week 1": ["dress", "press", "castle", "listen", "brother", "father", "mother", "sister", "They like to read books about animals.", "Susan did her homework neatly."],
            "Term 3 Week 2": ["less", "miss", "whistle", "often", "boast", "burst", "enjoy", "annoy", "The shop was closed when we arrived.", "We were so happy to go on a holiday."],
            "Term 3 Week 3": ["glass", "fuss", "soften", "fasten", "cousin", "grandfather", "grandmother", "uncle", "I buy a birthday present for my aunt.", "The baby cries when he is hungry."],
            "Term 3 Week 4": ["problem", "please", "where", "who", "tall", "talk", "mooncake", "lantern", "I cannot find my wallet anywhere.", "Dan sees him buying fruits at the stall."],
            "Term 3 Week 5": ["stool", "street", "which", "why", "bald", "salt", "dumplings", "festival", "I enjoy the food of other races.", "May I go to the party with my friends?"],
            "Term 3 Week 6": ["want", "front", "when", "white", "call", "stall", "people", "delicious", "The sun is going down behind the mountains.", "May I borrow this book?"],
            "Term 3 Week 7": ["pockets", "packets", "drain", "draw", "kisses", "buses", "shirt", "third", "I put my lunchbox into my school bag.", "Paul has never been to the library."],
            "Term 3 Week 8": ["kneels", "knock", "tart", "hard", "floor", "door", "breakfast", "sorry", "I can see many animals at the zoo.", "Please complete this worksheet now."],
            "Term 3 Week 9": ["naughty", "hungry", "nurse", "purple", "clothes", "dressed", "after", "letter", "The children wash their plates after dinner.", "He gives his grandchildren green packets."],
            "Term 4 Week 1": ["scratch", "scrapes", "hatch", "watch", "boat", "coat", "worked", "The tiger prowled through the jungle.", "The farmyard is filled with animals.", "The ducks waddled happily to the pond."],
            "Term 4 Week 2": ["screen", "scramble", "match", "snatch", "float", "throat", "sheep", "The gardener pulls out all the weeds.", "The lazy boy does nothing the whole day.", "The farmers milk their cows in the morning."],
            "Term 4 Week 3": ["screams", "scribbles", "patch", "fetch", "loaf", "goal", "bottle", "I put the beetle in a jar.", "The animals live on the farm.", "There are colourful flowers in the garden."],
            "Term 4 Week 4": ["play", "away", "tray", "team", "mean", "beach", "head", "We spread some butter on our slice of bread.", "Grandma keeps her needle and thread in her sewing box.", "There are seven candles on my cake."],
            "Term 4 Week 5": ["rain", "mail", "snail", "sleep", "feet", "teeth", "off", "Dogs sniff their food before eating.", "I feel a puff of air against my cheeks.", "I celebrate my birthday at home."],
            "Term 4 Week 6": ["bake", "paper", "lady", "field", "thief", "piece", "quiet", "I was quite sad when I did not win the prize.", "The ducks quack loudly at the farmer.", "The gardener trims the trees."],
            "Term 4 Week 7": ["jolly", "jelly", "smiled", "smelly", "thank", "bank", "fast", "Mary makes a list of things she needs to bring.", "Grandma is sad when she sees her broken vase.", "Sam receives a present from his uncle."],
            "Term 4 Week 8": ["juice", "jokes", "smoke", "smash", "trunk", "think", "test", "Peter has the best handwriting in class.", "Rita puts the gold bangle into her bag.", "The dustbin is placed outside our class."]
        },
        "zh": {
            "听写(一/二) (第一/二课)": ["汉语拼音 - 大雨 (dà yǔ)", "汉语拼音 - 马路 (mǎ lù)", "汉语拼音 - 乌鸦 (wū yā)", "汉语拼音 - 女儿 (nǚ ér)", "汉语拼音 - 衣服 (yī fu)", "五", "口", "人", "木", "土", "八", "也", "不", "女儿"],
            "听写三 (第三课)": ["汉语拼音 - 举 (jǔ)", "汉语拼音 - 去 (qù)", "汉语拼音 - 可以 (kě yǐ)", "汉语拼音 - 狐狸 (hú li)", "汉语拼音 - 洗衣机 (xǐ yī jī)", "汉语拼音 - 哥哥哭了 (gē ge kū le)", "力", "几", "七", "个", "可", "去", "未"],
            "听写四 (第四课)": ["汉语拼音 - 擦 (cā)", "汉语拼音 - 热 (rè)", "汉语拼音 - 司机 (sī jī)", "汉语拼音 - 组屋 (zǔ wū)", "汉语拼音 - 十只猪 (shí zhī zhū)", "汉语拼音 - 一把尺 (yì bǎ chǐ)", "四", "只", "子", "十", "日", "车", "巴士"],
            "听写五 (第五课)": ["汉语拼音 - 老师 (lǎo shī)", "汉语拼音 - 草 (cǎo)", "汉语拼音 - 男孩 (nán hái)", "汉语拼音 - 玩具 (wán jù)", "汉语拼音 - 太阳 (tài yáng)", "汉语拼音 - 五把伞 (wǔ bǎ sǎn)", "山羊", "书", "王", "午", "早", "三", "毛"],
            "听写六 (第六课)": ["汉语拼音 - 借书 (jiè shū)", "汉语拼音 - 面包 (miàn bāo)", "汉语拼音 - 跳舞 (tiào wǔ)", "汉语拼音 - 香蕉 (xiǎng jiāo)", "汉语拼音 - 两只小虾 (liǎng zhī xiǎo xiā)", "田", "力", "在", "上", "下", "大", "小"],
            "听写七 (第七课)": ["汉语拼音 - 一朵花 (yì duǒ huā)", "汉语拼音 - 关窗 (guān chuāng)", "汉语拼音 - 桌子 (zhuō zi)", "汉语拼音 - 快乐 (kuài lè)", "汉语拼音 - 图书馆 (tú shū guǎn)", "开", "大", "关", "两", "长", "广", "多"],
            "听写八 (第八课)": ["汉语拼音 - 猴子 (hóu zi)", "汉语拼音 - 本子 (běn zi)", "汉语拼音 - 打雷 (dǎ léi)", "汉语拼音 - 好朋友 (hǎo péng you)", "汉语拼音 - 七条虫 (qī tiáo chóng)", "目", "手", "本", "工", "门", "见", "又", "头"],
            "听写九 (第九课)": ["汉语拼音 - 打球 (dǎ qiú)", "汉语拼音 - 眼睛 (yǎn jīng)", "汉语拼音 - 熊猫 (xióng māo)", "汉语拼音 - 一颗心 (yì kē xīn)", "汉语拼音 - 四头牛 (sì tóu niú)", "牛", "贝", "六", "支", "九", "什么", "文"],
            "听写十 (第十课)": ["汉语拼音 - 水果 (shuǐ guǒ)", "汉语拼音 - 存钱 (cún qián)", "汉语拼音 - 音乐 (yīn yuè)", "汉语拼音 - 做运动 (zuò yùn dòng)", "汉语拼音 - 卷笔刀 (juǎn bǐ dāo)", "月", "天", "水", "寸", "正", "反", "白", "古"]
        }
    }
};
