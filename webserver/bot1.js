/*/////////////////////////////////////////////////////
 *
 *
 *
 * imports and setups so we can log into mastodon using the correct token
 * this is the same we did in the previous class
 *
 *
 */ /////////////////////////////////////////////////////
require("dotenv").config();
const m = require("masto");
const masto = m.createRestAPIClient({
  url: "https://networked-media.itp.io/", // url we are making the request to, this should be our url
  accessToken: process.env.TOKEN, // this uses the .env file variable TOKEN.
  // process.env is defined by the require("dotenv")
});

//make post automatically
async function postFunFacts(){
    const funfacts = [
      "Did you know that a cat has been to space? On October 18, 1963, French scientists launched the first cat into space using a rocket. The cat, named Félicette, safely landed back on Earth.",
      "Did you know that bananas are berries, but strawberries aren't? Botanically, a banana qualifies as a berry, but strawberries fall into the category of aggregate fruits because they form from a flower with multiple ovaries.",
      "Did you know that the shortest war in history was fought between Britain and Zanzibar on August 27, 1896? The war lasted between 38 and 45 minutes after Zanzibar surrendered.",
      "Did you know that honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3000 years old and still perfectly edible.",
      "Did you know that octopuses have three hearts? Two pump blood to the gills, while the third pumps it to the rest of the body.",
      "Did you know that the Eiffel Tower can be 15 cm taller during the summer? When the iron heats up, it expands, making the tower grow.",
      "Did you know that there are more stars in the universe than grains of sand on all of Earth's beaches combined? There are about 10 billion galaxies in the observable universe, each with up to 100 billion stars.",
      "Did you know that it rains diamonds on Saturn and Jupiter? The intense pressure in their atmospheres turns carbon into diamond.",
      "Did you know that a day on Venus is longer than a year on Venus? Venus completes an orbit around the sun faster than it completes a rotation on its axis.",
      "Did you know that the inventor of the Pringles can is now buried in one? Fred Baur, who invented the Pringles potato chip can, passed away in 2008, and his ashes were buried in one of the iconic cans.",
      "Did you know that cucumbers are 96% water? This makes them one of the most hydrating foods you can eat.",
      "Did you know that the microwave was invented after a researcher walked by a radar tube and a chocolate bar melted in his pocket? Percy Spencer then experimented by aiming the tube at popcorn kernels, which began to pop.",
      "Did you know that the tongue is the only muscle in the human body that is attached from one end only? It's also one of the strongest muscles.",
      "Did you know that the dot over the letter 'i' is called a tittle?",
      "Did you know that a group of flamingos is called a 'flamboyance'?",
      "Did you know that the world's oldest wooden wheel has been found in Slovenia and dates back about 5,200 years?",
      "Did you know that the total weight of all the ants on Earth is about the same as the weight of all the humans on Earth?",
      "Did you know that there are more life forms living on your skin than there are people on the planet?",
      "Did you know that sharks existed before trees? Sharks date back to about 400 million years ago, while the first trees appeared about 350 million years ago.",
      "Did you know that the Mantis shrimp can swing its claw so fast it boils the water around it and creates a shockwave strong enough to kill its prey?",
      "Did you know that the original London Bridge is now in Arizona? It was dismantled in 1967 and relocated to Lake Havasu City.",
      "Did you know that Cleopatra lived closer in time to the moon landing than to the construction of the Great Pyramid of Giza?",
      "Did you know that Polar bear fur is not white? It's actually transparent with a hollow core that reflects light.",
      "Did you know that the heart of a blue whale is so big, a small child can swim through the veins?",
      "Did you know that the game Monopoly was originally designed to teach the evils of income inequality?",
      "Did you know that the total length of your blood vessels could circle the globe more than twice if laid end to end?",
      "Did you know that the inventor of the Frisbee was cremated and made into Frisbees after he died?",
      "Did you know that wombats produce cube-shaped poop? This odd trait helps the poop not to roll away, marking their territory and attracting mates.",
      "Did you know that the French language was once illegal in England? For about 300 years, following the Norman Conquest, French was the language of the nobility and governance.",
      "Did you know that Alfred Hitchcock was afraid of eggs? He described his phobia as a fear of anything round and white.",
      "Did you know that the chainsaw was originally invented for childbirth? It was used to cut through pelvic bone during difficult labor.",
      "Did you know that the shortest commercial flight in the world lasts just 57 seconds and covers a distance of 1.7 miles between Westray and Papa Westray in the Orkney Islands of Scotland?",
      "Did you know that the world's oldest known 'your mom' joke dates back to 1500 BC in Babylon?",
      "Did you know that the first item ever sold on eBay was a broken laser pointer for $14.83?",
      "Did you know that in Switzerland, it is illegal to own just one guinea pig because they are prone to loneliness?",
      "Did you know that the loudest animal relative to its size is the water boatman, which can emit a sound as loud as 99.2 decibels, about the same as a loud orchestra?",
      "Did you know that Neptune was the first planet to get its existence predicted by mathematical calculations before it was actually seen by a telescope?",
      "Did you know that a sneeze travels about 100 miles per hour and can send 100,000 germs into the air?",
      "Did you know that the longest time between two twins being born is 87 days?",
      "Did you know that a single strand of spaghetti is called a 'spaghetto'?",
      "Did you know that before trees were common, the Earth was covered with giant mushrooms?",
      "Did you know that in ancient Rome, unfaithful wives were punished by having their noses cut off?",
      "Did you know that a jiffy is an actual unit of time for 1/100th of a second?",
      "Did you know that before erasers were invented, bread was used to remove pencil marks?",
      "Did you know that you can't hum while holding your nose closed?",
      "Did you know that the unicorn is the national animal of Scotland?",
      "Did you know that there's a basketball court on the top floor of the U.S. Supreme Court Building, known as the 'Highest Court in the Land'?",
      "Did you know that the first alarm clock could only ring at 4 a.m.?",
      "Did you know that a group of crows is called a 'murder'?",
      "Did you know that the voice actors of Mickey Mouse and Minnie Mouse got married in real life?",
      "Did you know that the first oranges weren't orange? The original oranges from Southeast Asia were a tangerine-pomelo hybrid, and they were actually green.",
      "Did you know that in ancient Greece, throwing an apple to a woman was considered a marriage proposal?",
      "Did you know that the world's largest snowflake was reported to be 15 inches across and 8 inches thick?",
      "Did you know that Vikings never wore horned helmets? This was a myth propagated by the 19th-century art.",
      "Did you know that an eagle can kill a young deer and fly away with it?",
      "Did you know that honeybees can recognize human faces?",
      "Did you know that the state of Florida is bigger than England?",
      "Did you know that Charlie Chaplin once entered a Charlie Chaplin look-alike contest and came in third?",
      "Did you know that armadillos have four babies at a time and they are all the same sex?",
      "Did you know that the lighter was invented before the match?"
  ]

  setInterval(async()=>{
    let rand = Math.floor(Math.random()*funfacts.length);
    const status  = await masto.v1.statuses.create({
      status: "! " + funfacts[rand],
      visibility: "public"
    });
    console.log(status.url);
  },3600000)
}

postFunFacts();




/*/////////////////////////////////////////////////////
 *
 *
 *
 * replying to a specific post with a message
 *
 *
 *
 */ /////////////////////////////////////////////////////

// we need to use a different client in order to run all the time
// this will pull in every notification as they happen
const stream = m.createStreamingAPIClient({
  accessToken: process.env.TOKEN,
  streamingApiUrl: "wss://networked-media.itp.io", // special url we use for sockets

});

// async function to wait for the notification and reply to it
async function reply() {
  // finding the specific route to watch for notifications
  // based off the stream client and the notification path
  const notificationSubscription = await stream.user.notification.subscribe();

  const emojis = ['😊', '🌟', '🍀', '🚀', '🎉'];

  // makes sure objects exist in the returned obj before going through array
  for await (let notif of notificationSubscription) {

    // printing the structure to the console to see how to access data
    console.log(notif.payload.type);
    
    if (notif.payload.type == "mention" && notif.payload.status) {
      let originalContent = notif.payload.status.content;
      let acct = notif.payload.account.acct;
      let replyId =   notif.payload.status.id;

      // check if the post includes a emoji
      let foundEmojis = originalContent.match(/[\u{1F600}-\u{1F64F}]/gu) || [];
      let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

      // If it includes a emoji, reply using a emoji, if not, reply using text
      let replyMessage = foundEmojis.length > 0
        ? `${randomEmoji}`
        : `Hi back!!!!`;

        const status = await masto.v1.statuses.create({
          status: replyMessage,
          visibility: "public",
          in_reply_to_id: replyId,
        });
        console.log(`Replied: ${status.url}`);
  
    }

  }
}

// call the reply function so it can always wait for notifications
reply()