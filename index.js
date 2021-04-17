
// EXPORTS

const { addMethods } = require('telebot');
const TeleBot = require('telebot');

const bot = new TeleBot("1761355313:AAG-bKTHdZOwe5Vj54xTLbMdy5BWrcUYNg4");

// const myModule = require('./m');
// let val = myModule.ass1; // val is "Hello"   

var getUserByID = (id) => { return users[id]; };

// [${msg.from.first_name}](tg://user?id=${msg.from.id})


// `
// {
//     id: 251196883,
//     is_bot: false,
//     first_name: '🅰️🅱️🅾️🅱️🅰️',
//     username: 'zeqaf',
//     language_code: 'uk'
// }
// `


 


//  KEYBOARDS

const mainMenu = [
  [
    {
      text: '1',
    }
  ],
  [
    {
      text: '2',
    }
  ],
  [
    {
      text: '3',
    }
  ],
  [
    {
      text: '4',
    }
  ]
];

const keyboard = [
    [
      {
        text: 'Зареєструватись!', // текст на кнопке
      }
    ]
    // ,
    // [
    //   {
    //     text: 'Хочу песика',
    //     callback_data: 'morePes'
    //   }
    // ]
  ];

bot.on("/start", (msg) => {
     // mode = 1;
     bot.sendMessage(msg.from.id, `Привіт, ${msg.from.first_name}!\nЯ BodArBot і я допоможу тобі знайти другу половинку! Натискай кнопку і погнали!`, {
         replyMarkup: {
         keyboard: [
          [
            {
              text: 'Зареєструватись!', // текст на кнопке
            }
          ]
        ],
         resize_keyboard: true,
        //  one_time_keyboard: true
         }   
     });
}); 

bot.on(/Зареєструватись!/, (msg) => {
  
  // bot.sendMessage(msg.from.id, `Чудово! Давай розпочнемо реєстрацію. Твоє ім'я?`);
  
  registration(msg);
  // registration(msg);
  
});

let registration = (msgOld) => {

  let step = 0;
  let userId = msgOld.from.id;
  let user = {
    "active": true,
    "state": 4, // 0: notStarted | 1: main menu | 2: my info | 3: search | 4: registration
    "name": "",
    "login": msgOld.from.username,
    "age": 0,
    "gender": "",
    "looking_for": "",
    "description": "",
    "photo": "",
    "history": {    }
  }

  if (step == 0) {
    
  }

  bot.on("*", (msg) => {
    // console.log(msg);
    if (msg.from.id == userId) {
      if (msg.text != undefined || step == 4 || step == 3) {

        switch (step){
          case 0:
            bot.sendMessage(userId, `Чудово! Давай розпочнемо реєстрацію. Твоє ім'я?`, {
              replyMarkup: {
                keyboard: [
                  [
                  { text: msg.from.first_name }
                  ]
                ],
                resize_keyboard: true,
                one_time_keyboard: true
              }
            });
            step++;
            break;
          case 1:
            user["name"] = msg.text;
            step++;
            bot.sendMessage(msg.from.id, `Ага, далі. Твій вік?`, {
              replyMarkup: {
                remove_keyboard: true
              }
            });
            break;
          case 2:
            if (parseInt(msg.text) < 1 || parseInt(msg.text) > 120 || parseInt(msg.text) == NaN) {
              bot.sendMessage(msg.from.id, "Некоректний вік, спробуй по іншому!")
            }
            else {
              user["age"] = parseInt(msg.text);
              bot.sendMessage(msg.from.id, `Так, записав... ${user["name"]}, ${user["age"]}. Тепер розкажи мені щось про себе.`, {
                replyMarkup: {
                  keyboard: [
                    [
                    { text: "Залишити поле пустим" }
                    ]
                  ],
                  resize_keyboard: true,
                  one_time_keyboard: true
                }
              });
              
              step++;
            }
            break;
          case 3:
            if (!msg.text) {
              bot.sendMessage(msg.from.id, `Напиши щось про себе, будь ласка, або натисни на кнопку.`);
            }
            else if (msg.text == "Залишити поле пустим") {
              user["description"] = "";
              bot.sendMessage(msg.from.id, `Окей, йдем далі. Тепер відправ мені своє фото`, {
                replyMarkup: {
                  keyboard: [
                    [
                      { text: "Використати фото з аватарки" }
                    ]
                  ],
                  resize_keyboard: true,
                  one_time_keyboard: true
                }
              });
              step++;
            }
            else {
              user["description"] = msg.text;
              bot.sendMessage(msg.from.id, `Тепер відправ мені своє фото`, {
                replyMarkup: {
                  keyboard: [
                    [
                      { text: "Використати фото з аватарки" }
                    ]
                  ],
                  resize_keyboard: true,
                  one_time_keyboard: true
                }
              });
              step++;
            }
            break;
          case 4:
            if (msg["photo"] != undefined) {
              user["photo"] = msg["photo"][0]["file_id"];
              step++;
              bot.sendMessage(msg.from.id, "Фото отримав, тепер вкажи свою стать", {
                replyMarkup: {
                  keyboard:  [
                    ["Я чоловік","Я дівчина"]
                  ],
                  resize_keyboard: true,
                  one_time_keyboard: true
                }
              });
            }
            else if (msg["text"] == "Використати фото з аватарки") {
              var user_profile = bot.getUserProfilePhotos(msg.from.id);
              // console.log(user_profile);
              step++;
              user_profile.then(function (res) {
                var file_id = res.photos[0][0].file_id;
                user["photo"] = file_id;
                bot.sendMessage(msg.from.id, "Тепер вкажи свою стать", {
                  replyMarkup: {
                    keyboard:  [
                      ["Я чоловік","Я дівчина"]
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: true
                  }
                });
              });
            }
            else {
              bot.sendMessage(msg.from.id, "Відправ мені, будь ласка, своє фото або натисни на кнопку, щоб я використав фото твого профілю в телеграм 🥺") ;
            }
            break;
          case 5:
            if (msg.text == "Я чоловік") {
              user["gender"] = "male";
              step++;
              bot.sendMessage(msg.from.id, "Кого шукаєш?", {
                replyMarkup: {
                  keyboard: [
                    [
                      { text: "Чоловіків" }, { text: "Дівчат" }, { text: "Без різниці" }
                    ]
                  ],
                  resize_keyboard: true,
                  one_time_keyboard: true
                }
              });
            }
            else if (msg.text == "Я дівчина") {
              user["gender"] = "female";
              step++;
              bot.sendMessage(msg.from.id, "Кого шукаєш?", {
                replyMarkup: {
                  keyboard: [
                    [
                      { text: "Чоловіків" }, { text: "Дівчат" }, { text: "Без різниці" }
                    ]
                  ],
                  resize_keyboard: true,
                  one_time_keyboard: true
                }
              });
            }
            else {
              bot.sendMessage(msg.from.id, "Натисни одну з кнопок, будь ласка");
            }
            break;
          case 6:
            if (msg.text == "Чоловіків" || msg.text == "Дівчат" || msg.text == "Без різниці") {
              if (msg.text == "Чоловіків") user["looking_for"] = "male";              
              else if(msg.text == "Дівчат") user["looking_for"] = "female";              
              else if (msg.text == "Без різниці") user["looking_for"] = "both";
              user["state"] = 1;
              bot.sendMessage(msg.from.id, "Все, реєстрацію закінчено. Ось твоя анкета:");
              setTimeout(() => {
                bot.sendPhoto(msg.from.id, user.photo, {
                  caption: `[${user.name}](tg://user?id=${msg.from.id})  -  ${user.age} \n\n${user.description}`,
                  parseMode: "Markdown",
                  replyMarkup: {
                    remove_keyboard: true
                  }
                });
              }, 1000);
              step++;
            }
            else {
              bot.sendMessage(msg.from.id, "Вибери, будь ласка, кого ти шукаєш", {
                replyMarkup: {
                  keyboard: [
                    [
                      { text: "Чоловіків" }, { text: "Дівчат" }, { text: "Без різниці" }
                    ]
                  ],
                  resize_keyboard: true,
                  one_time_keyboard: true
                }
              });
            }
            break;
        }
      }
      else {
        bot.sendMessage(msg.from.id, "Не дуже розумію про що ти 😔")
      }
    }
});

}




bot.on(/show*/, (msg) => {
  // bot.getUserProfilePhotos(msg.from.id).then(result => console.log(result['photos'][0][0]['file_id']));
});


bot.start();

var users= {
    "id1": {
        "active": true,
        "state": 0, // 0: notStarted | 1: main menu | 2: my info | 3: search | 4: registration
        "name": "",
        "login": "",
        "age": 0,
        "gender": "",
        "looking_for": "",
        "description": "",
        "photo": "",
        "history": {
            "id1": true,
            "id2": false
        }
    }
};
