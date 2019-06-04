let scenes = [
  {
    "id": "A Beginning",
    "timelines": ["T1"],
    "prompt": "Select one area of interest:",
    "content":["All actors start to get on the couch.", "They look at their phones"],
    "choices": ["Social", "Music", "Photography", "News"],
    "following": ["Love Talk", "MTV Dance", "Adsvideo", "Topic from News"],
    "choice_type": "beginning"
  },
  {
    "id": "Love Talk",
    "timelines": ["T1"],
    "prompt": "Would you like to contribute to their conversation?",
    "content":["Two lovers are texting back and forth.", "They are looking at each other sometimes", "The other actors are still looking at their phones"],
    "choices": ["Text input"],
    "following": ["Relationship"],
    "choice_type": "input"
  },
  {
    "id": "Relationship",
    "timelines": ["T1"],
    "prompt": "Generally speaking, do you enjoy coming back home from a night out?",
    "content":["Actors get a new message, they are confused, debate it, and then ask for the last person to get banned. PBlack sees the phone that gets highlighted."],
    "choices": ["After midnight", "Before midnight"],
    "following": ["Rave", "MTV Dance"],
    "choice_type": "binary"
  },
  {
    "id": "Rave",
    "timelines": ["T1", "T3"],
    "prompt": "Please consent to the following:",
    "content":["There is a great rave happening."],
    "choices": ["I consent to this", "I consent to that", "I consent to that too", "I consent to that as well"], // -- IMPROVE
    "following": ["Clever one", "Slowmotion"],
    "choice_type": "checkboxes"
  },
  {
    "id": "Clever one",
    "timelines": ["T1", "T3"],
    "prompt": "Do you like this?",
    "content":["The clever person shows up and interrupts the rave. He talks about the system that is being lived in."],
    "choices": ["Like", "No"],
    "following": ["Consequences", "Clever end"],
    "choice_type": "binary"
  },
  {
    "id": "Consequences",
    "timelines": ["T1", "T3"],
    "prompt": "WiFi Loss",
    "content":["Slowly, the ravers start to pull out their phone, pretend to scroll or type, and they exit one by one."],
    "choices": ["OK"],
    "following": ["End"],
    "choice_type": "end"
  },
  {
    "id": "Clever end",
    "timelines": ["T1", "T3"],
    "prompt": "You have been disconnected.", // -- IMPROVE
    "content":["The clever one brings the audience members outside of the stage."],
    "choices": ["OK"],
    "following": ["End"],
    "choice_type": "end"
  },
  {
    "id": "Slowmotion",
    "timelines": ["T1", "T3"],
    "prompt": "We are...",
    "content":["In slowmotion, the Red Hood and the Wolf Pack are getting ready."],
    "choices": ["Objects", "Subjects"],
    "following": ["Objects", "Subjects"],
    "choice_type": "binary"
  },
  {
    "id": "Objects",
    "timelines": ["T1", "T3"],
    "prompt": "Disconnect - Image",
    "content":["There is a rape of the The rave continues as if nothing happened, the wolf pack laugh and take selfies, the red hood joins the crowd."],
    "choices": ["Share"],
    "following": ["Objects End"],
    "choice_type": "single"
  },
  {
    "id": "Subjects",
    "timelines": ["T1", "T3"],
    "prompt": "Disconnect - Image",
    "content":["The rave continues. The Red Hood takes selfies, and the Wolf Pack are absorbed by the crowd of dancers."],
    "choices": ["Share"],
    "following": ["Subjects End"],
    "choice_type": "single"
  },
  {
    "id":"Objects End",
    "timelines": ["T1", "T3"],
    "prompt": "Disconnect - Image",
    "content":["The crowd receives the selfies."],
    "choices": ["End"],
    "following": ["End"],
    "choice_type": "end"
  },
  {
    "id":"Subjects End",
    "timelines": ["T1", "T3"],
    "prompt": "Disconnect - Image",
    "content":["The crowd receives the selfies."],
    "choices": ["End"],
    "following": ["End"],
    "choice_type": "end"
  },
  {
    "id": "MTV Dance",
    "timelines": ["T1", "T2"],
    "prompt": "In general, would you rather:",
    "content":["The MTV Party is being set up. People are doing crazy stupid things. Move your thing."],
    "choices": ["Lead", "Follow"],
    "following": ["Karaoke", "Broadway"],
    "choice_type": "binary"
  },
  {
    "id": "Karaoke",
    "timelines": ["T1", "T2"],
    "prompt": "What next?",
    "content":["The popular song comes up."],
    "choices": ["Play next", "Disconnect"],
    "following": ["Broadway", "Stop Participating"],
    "choice_type": "binary"
  },
  {
    "id": "Stop Participating",
    "timelines": ["T1", "T2"],
    "prompt": "Because you've stopped participating, you've been disconnected",
    "content":["PBlack comes, and tells the audience that it's over. The Party continues in the background."],
    "choices": ["Agree"],
    "following": ["End"],
    "choice_type": "end"
  },
  {
    "id": "Broadway",
    "timelines": ["T1", "T2"],
    "prompt": "What next?",
    "content":["An acrobat is doing some tricks."],
    "choices": ["Keep Dancing", "Disconnect"],
    "following": ["Dance", "Stop Participating"],
    "choice_type": "binary"
  },
  {
    "id": "Dance",
    "timelines": ["T1", "T2"],
    "prompt": "You're doing great.",
    "content":["The public is invited to come dance on stage"],
    "choices": ["Keep Dancing"],
    "following": ["Choosing the Dark"],
    "choice_type": "single"
  },
  {
    "id": "Choosing the Dark",
    "timelines": ["T1", "T2", "T3", "T4"],
    "prompt": "Enjoy.",
    "content":["The public is on stage, the actors are in the public."],
    "choices": ["OK"],
    "following": ["End"],
    "choice_type": "end"
  },
  {
    "id": "Adsvideo",
    "timelines": ["T3"],
    "prompt": "Do you usually take medicine...",
    "content":["An ad for burning soul, better person starts playing."],
    "choices": ["To get excited", "To calm down"],
    "following": ["Rave", "Shadow"],
    "choice_type": "binary"
  },
  {
    "id": "Shadow",
    "timelines": ["T3", "T4"],
    "prompt": "Live on Camera!",
    "content":["The shadow is coming up to give his monologue."],
    "choices": ["Ok"],
    "following": ["Camera"],
    "choice_type": "single"
  },
  {
    "id": "Camera",
    "timelines": ["T3", "T4"],
    "prompt": "Open your camera!",
    "content":["The audience is seeing a video on their phones as the shadows are all running around."],
    "choices": ["Ok"],
    "following": ["Popcorn"],
    "choice_type": "single"
  },
  {
    "id": "Popcorn",
    "timelines": ["T3", "T4"],
    "prompt": "Congratulations! You have won a small portion of delicious popcorn!",
    "content":["The audience is invited on stage to come eat some popcorn."],
    "choices": ["Great!"],
    "following": ["Choosing the Dark"],
    "choice_type": "single"
  },
  {
    "id": "Topic from News",
    "timelines": ["T4"],
    "prompt": "Do you want to read...",
    "content":["A soundtrack of current news is happening."],
    "choices": ["The most recent article", "The most commented article"],
    "following": ["Women Bruise", "LGBTQI Performance"],
    "choice_type": "binary"
  },
  {
    "id": "LGBTQI Performance",
    "timelines": ["T4"],
    "prompt": "Do you consider yourself rather...",
    "content":["LGBTQI Performance"],
    "choices": ["Socially privileged", "Socially disabled"],
    "following": ["Shadow", "How to be a Man"],
    "choice_type": "binary"
  },
  {
    "id": "Women Bruise",
    "timelines": ["T4"],
    "prompt": "Do you consider yourself rather...",
    "content":["LGBTQI perf but with a woman"],
    "choices": ["Socially privileged", "Socially disabled"],
    "following": ["Shadow", "How to be a Man"],
    "choice_type": "binary"
  },
  {
    "id": "How to be a Man",
    "timelines": ["T4"],
    "prompt": "",
    "content":["A man comes forward and explains how hard it is to be a man."],
    "choices": ["Like", "Hide"],
    "following": ["Commenting on the Couch", "Popcorn"],
    "choice_type": "binary"
  },
  {
    "id": "Commenting on the Couch",
    "timelines": ["T4"],
    "prompt": "Thank you for subscribing!",
    "content":["Everyone is one the couch, commenting on what the news were."],
    "choices": ["Disconnect"],
    "following": ["End"],
    "choice_type": "single"
  },
  {
    "id": "End",
    "choices": ["none"]
  }
]

module.exports = scenes