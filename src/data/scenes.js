let scenes = [
  {
    "id": "A Beginning",
    "path_id": "A Beginning",
    "timelines": ["T1"],
    "prompt": "Select your area of interest",
    "content":["All actors start to get on the couch.", "They look at their phones"],
    "choices": ["Social", "Music", "Photography", "News"],
    "following": ["Love Talk", "MTV Dance", "Adsvideo", "Topic from News"],
    "choice_type": "beginning",
    "cue": "SONG - Play enter"
  },
  {
    "id": "Love Talk",
    "path_id": "Love Talk",
    "timelines": ["T1"],
    "prompt": "Would you like to contribute to their conversation?",
    "content":["Two lovers are texting back and forth.", "They are looking at each other sometimes", "The other actors are still looking at their phones"],
    "choices": ["Text input"],
    "following": ["Relationship"],
    "choice_type": "input",
    "cue": "VIDEO - Play Chat"
  },
  {
    "id": "Relationship",
    "path_id": "Relationship",
    "timelines": ["T1"],
    "prompt": "Do you come back home from a night out...",
    "content":["Actors get a new message, they are confused, debate it, and then ask for the last person to get banned. PBlack sees the phone that gets highlighted."],
    "choices": ["Before midnight", "After midnight"],
    "following": ["MTV Dance", "Rave"],
    "choice_type": "binary",
    "cue": ""
  },
  {
    "id": "Rave",
    "path_id": "Rave",
    "timelines": ["T1", "T3"],
    "prompt": "Do you listen to songs...",
    "content":["There is a great rave happening."," THIS COULD BE A LOOP"],
    "choices": ["On repeat", "Once"], // -- IMPROVE
    "following": ["Rave LOOP", "Rave CONTINUE"],
    "choice_type": "binary",
    "cue": "SONG - Play Rave"
  },
  {
    "id": "Rave LOOP",
    "path_id": "Rave",
    "timelines": ["T1", "T3"],
    "prompt": "Do you listen to songs...",
    "content":["There is a great rave happening."," THIS COULD BE A LOOP"],
    "choices": ["On repeat", "Once"], // -- IMPROVE
    "following": ["Rave LOOP", "Rave CONTINUE"],
    "choice_type": "binary",
    "cue": "SONG - Play Rave"
  },
  {
    "id": "Rave CONTINUE",
    "path_id": "Rave CONTINUE",
    "timelines": ["T1", "T3"],
    "prompt": "Do you consent to the following",
    "content":["There is a great rave happening."],
    "choices": ["I consent to customization", "I consent to further communication", "I consent to the use of my first and last name", "I consent to future modifications."], // -- IMPROVE
    "following": ["Clever one", "Slowmotion"],
    "choice_type": "checkboxes",
    "cue": "SONG - Play Rave"
  },
  {
    "id": "Clever one",
    "path_id": "Clever one",
    "timelines": ["T1", "T3"],
    "prompt": "Do you like this?",
    "content":["The clever person shows up and interrupts the rave.", "---", "what is the meaning if a choice? what does it mean to be able to choose, for yourself, for others, do you feel free just because you choose?", "we, as characters, are following a script, made by someone, told by a computer.", "you had the ability to choose, but not anymore.", "it's time to tell you the tricks: you didn't have any freedom", "you were like the characters of a show", "is it really a choice when you only have a few choices? i think you know the answer"],
    "choices": ["Like", "Next"],
    "following": ["Clever end", "Consequences"],
    "choice_type": "binary",
    "cue": ""
  },
  {
    "id": "Consequences",
    "path_id": "Consequences",
    "timelines": ["T1", "T3"],
    "prompt": "You have been disconnected.",
    "content":["Slowly, the ravers start to pull out their phone, pretend to scroll or type, and they exit one by one."],
    "choices": ["OK"],
    "following": ["End"],
    "choice_type": "end",
    "cue": ""
  },
  {
    "id": "Clever end",
    "path_id": "Clever end",
    "timelines": ["T1", "T3"],
    "prompt": "You have been disconnected.", // -- IMPROVE
    "content":["The clever one brings the audience members outside of the stage.", "---", "and we were watching so we are your audience too.", "entertainment. it's part of theater, but it was always about interaction: we tried, they tried —playwrights, scriptwriters, programmers, to make you see. because we always already had this ability to travel through time and thought.", "isn't it incredible to communicate, here and now. phones are just the entrance, and a door to the way we use it today, but theater, by its roots, was already able to play with the audience since the beginning we/they tried just to show you another way. technology now allows you to interact with it, but we still need to make it work. tonight, with those phones, in that old factory, you were the workers of this experience."],
    "choices": ["OK"],
    "following": ["End"],
    "choice_type": "end",
    "cue": ""
  },
  {
    "id": "Slowmotion",
    "path_id": "Slowmotion",
    "timelines": ["T1", "T3"],
    "prompt": "You consider yourself to be...",
    "content":["In slowmotion, the Red Hood and the Wolf Pack are getting ready."],
    "choices": ["Object", "Subject"],
    "following": ["Objects", "Subjects"],
    "choice_type": "binary",
    "cue": "SONG - Play Slowmotion"
  },
  {
    "id": "Objects",
    "path_id": "Objects",
    "timelines": ["T1", "T3"],
    "prompt": "Disconnect - Image",
    "content":["There is an assault of the red hood. The rave continues as if nothing happened, the wolf pack laugh and take selfies, the red hood joins the crowd."],
    "choices": ["Share"],
    "following": ["Objects End"],
    "choice_type": "single",
    "cue": "CUE - switch between slowmo and back to rave + SEND IMAGE AT END"
  },
  {
    "id": "Subjects",
    "path_id": "Subjects",
    "timelines": ["T1", "T3"],
    "prompt": "Disconnect - Image",
    "content":["The rave continues. The Red Hood takes selfies, and the Wolf Pack are absorbed by the crowd of dancers."],
    "choices": ["Share"],
    "following": ["Subjects End"],
    "choice_type": "single",
    "cue": "CUE - switch between slowmo and back to rave + SEND IMAGE AT END"
  },
  {
    "id":"Objects End",
    "path_id":"Objects End",
    "timelines": ["T1", "T3"],
    "prompt": "Disconnect - Image",
    "content":["The crowd receives the selfies."],
    "choices": ["End"],
    "following": ["End"],
    "choice_type": "single",
    "cue": ""
  },
  {
    "id":"Subjects End",
    "path_id":"Subjects End",
    "timelines": ["T1", "T3"],
    "prompt": "Disconnect - Image",
    "content":["The crowd receives the selfies."],
    "choices": ["End"],
    "following": ["End"],
    "choice_type": "single",
    "cue": ""
  },
  {
    "id": "MTV Dance",
    "path_id": "MTV Dance",
    "timelines": ["T1", "T2"],
    "prompt": "Do you usually...",
    "content":["The MTV Party is being set up. People are doing crazy stupid things. Move your thing."],
    "choices": ["Lead", "Follow"],
    "following": ["Karaoke", "Broadway"],
    "choice_type": "binary",
    "cue": "SONG - Play MTV Dance"
  },
  {
    "id": "Karaoke",
    "path_id": "Karaoke",
    "timelines": ["T1", "T2"],
    "prompt": "Are you the first one to stop?",
    "content":["The popular song comes up."],
    "choices": ["Yes", "No"],
    "following": ["Stop Participating", "Broadway"],
    "choice_type": "binary",
    "cue": "WAIT UNTIL FARID HAS PRESENTED -> ACTION - Send Karaoke"
  },
  {
    "id": "Stop Participating",
    "path_id": "Stop Participating",
    "timelines": ["T1", "T2"],
    "prompt": "Because you've stopped participating, you've been disconnected",
    "content":["Farid tells actors on stage that the audience has stopped participating, then he makes an announcement to the audience.", "When he is done, everyone exits the same way they came."],
    "choices": ["Agree"],
    "following": ["End"],
    "choice_type": "end",
    "cue": ""
  },
  {
    "id": "Broadway",
    "path_id": "Broadway",
    "timelines": ["T1", "T2"],
    "prompt": "Continue?",
    "content":["Everyone moves the couch away in two parts.", "Everyone sits down on the couch and watch Farid", "Farid does a show with his Cyr wheel."],
    "choices": ["Keep Dancing", "Disconnect"],
    "following": ["Dance", "Stop Participating"],
    "choice_type": "binary",
    "cue": " LIGHT+SOUND => WAIT FOR FARID TO BE INSIDE THE WHEEL TO START"
  },
  {
    "id": "Dance",
    "path_id": "Dance",
    "timelines": ["T1", "T2"],
    "prompt": "You're doing great.",
    "content":["The public is invited to come on stage.","The actors slowly take their place into the audience."],
    "choices": ["Keep Dancing"],
    "following": ["End"],
    "choice_type": "single",
    "cue": "AT THE END FADE MUSIC ON QLAB"
  },
  {
    "id": "Choosing the Dark",
    "path_id": "Choosing the Dark",
    "timelines": ["T1", "T2", "T3", "T4"],
    "prompt": "Enjoy.",
    "content":["While the public is on stage, the actors are in the public.", "Farid is the last one to sit down", "When he sits down, everyone should be looking at their phones and it is the end"],
    "choices": ["Yes"],
    "following": ["End"],
    "choice_type": "end",
    "cue": ""
  },
  {
    "id": "Adsvideo",
    "path_id": "Adsvideo",
    "timelines": ["T3"],
    "prompt": "Do you usually take medicine...",
    "content":["An ad for burning soul, better person starts playing. Everyone watches the ad on the big screen."],
    "choices": ["To get excited", "To calm down"],
    "following": ["Rave", "Shadow"],
    "choice_type": "binary",
    "cue": "MOVIE - SHADOW 1"
  },
  {
    "id": "Shadow",
    "path_id": "Shadow",
    "timelines": ["T3", "T4"],
    "prompt": "Live on Camera! Take a picture of the shadows!",
    "content":[" People walk around. The shadow is following people. Then he comes up to give his monologue."],
    "choices": ["Ok"],
    "following": ["Camera"],
    "choice_type": "single",
    "cue": "MOVIE - SHADOW 2"
  },
  {
    "id": "Camera",
    "path_id": "Camera",
    "timelines": ["T3", "T4"],
    "prompt": "Congratulations! You have won a small portion of popcorn!",
    "content":["The audience is invited to take pictures of the shadow. The audience is seeing a video on their phones as the shadows are all running around. The others are getting ready to serve the popcorn."],
    "choices": ["Ok"],
    "following": ["Popcorn"],
    "choice_type": "single",
    "cue": "ACTION - Send Camera"
  },
  {
    "id": "Popcorn",
    "path_id": "Popcorn",
    "timelines": ["T3", "T4"],
    "prompt": "We hope you are satisfied!",
    "content":["The audience is invited on stage to come eat some popcorn."],
    "choices": ["Yes!"],
    "following": ["End"],
    "choice_type": "end",
    "cue": ""
  },
  {
    "id": "Topic from News",
    "path_id": "Topic from News",
    "timelines": ["T4"],
    "prompt": "Do you always read...",
    "content":["A soundtrack of current news is happening."],
    "choices": ["The most recent article", "The most commented article"],
    "following": ["Women Bruise", "LGBTQI Performance"],
    "choice_type": "binary",
    "cue": "MOVIE - News"
  },
  {
    "id": "LGBTQI Performance",
    "path_id": "LGBTQI Performance",
    "timelines": ["T4"],
    "prompt": "Do you think you are rather...",
    "content":["LGBTQI Performance"],
    "choices": ["Socially privileged", "Socially disabled"],
    "following": ["Shadow", "How to be a Man"],
    "choice_type": "binary",
    "cue": "SONG - LGBTQI"
  },
  {
    "id": "Women Bruise",
    "path_id": "Women Bruise",
    "timelines": ["T4"],
    "prompt": "Do you think you are rather...",
    "content":["LGBTQI perf but with a woman"],
    "choices": ["Socially privileged", "Socially disabled"],
    "following": ["Shadow", "How to be a Man"],
    "choice_type": "binary",
    "cue": "SONG - Women Bruise"
  },
  {
    "id": "How to be a Man",
    "path_id": "How to be a Man",
    "timelines": ["T4"],
    "prompt": "Do you think this is going in the right direction?",
    "content":["Yuho is holding the punching ball.", "The other actors are making gestures from daily life (hello, hugging each other)."],
    "choices": ["Like", "Hide"],
    "following": ["Commenting on the Couch", "Popcorn"],
    "choice_type": "binary",
    "cue": ""
  },
  {
    "id": "Commenting on the Couch",
    "path_id": "Commenting on the Couch",
    "timelines": ["T4"],
    "prompt": "Thank you for your attention!",
    "content":["Everyone is one the couch, commenting on what the news were.", "This is improvisation: asking questions like 'Do you think it's the men's fault??'", "Then slowly, each character gets bored and leaves in the reverse order of arriving."],
    "choices": ["You're welcome"],
    "following": ["End"],
    "choice_type": "end",
    "cue": ""
  },
  {
    "id": "End",
    "path_id": "End",
    "choices": ["none"],
    "content": ["The End"]
  }
]

module.exports = scenes
