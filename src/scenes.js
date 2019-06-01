let scenes = [
  {
    "id": "A Beginning",
    "timelines": ["T1"],
    "prompt": "Select one area of interest:",
    "choices": ["Social", "Music", "Photography", "News"],
    "following": ["Love Talk", "MTV Dance", "Adsvideo", "Topic from News"],
    "choice_type": "beginning"
  },
  {
    "id": "Love Talk",
    "timelines": ["T1"],
    "prompt": "Would you like to contribute to their conversation?",
    "choices": ["Text input"],
    "following": ["Relationship"],
    "choice_type": "input"
  },
  {
    "id": "Relationship",
    "timelines": ["T1"],
    "prompt": "Generally speaking, do you enjoy coming back home from a night out?",
    "choices": ["Before midnight", "After midnight"],
    "following": ["Rave", "MTV Dance"],
    "choice_type": "binary"
  },
  {
    "id": "Rave",
    "timelines": ["T1", "T3"],
    "prompt": "Generally speaking, do you enjoy coming back home from a night out?",
    "choices": ["Consent 1", "Consent 2", "Consent 3", "Consent 4", "Consent 5", "Consent 6", "Consent 7"], // -- IMPROVE
    "following": ["Clever one", "Slowmotion"],
    "choice_type": "checkboxes"
  },
  {
    "id": "Clever one",
    "timelines": ["T1", "T3"],
    "prompt": "Do you like this?",
    "choices": ["Like", "No"],
    "following": ["Consequences", "Clever end"],
    "choice_type": "binary"
  },
  {
    "id": "Consequences",
    "timelines": ["T1", "T3"],
    "prompt": "WiFi Loss",
    "choices": ["OK"],
    "following": ["End"],
    "choice_type": "end"
  },
  {
    "id": "Clever end",
    "timelines": ["T1", "T3"],
    "prompt": "You have been disconnected.", // -- IMPROVE
    "choices": ["OK"],
    "following": ["End"],
    "choice_type": "end"
  },
  {
    "id": "Slowmotion",
    "timelines": ["T1", "T3"],
    "prompt": "We are...",
    "choices": ["Objects", "Subjects"],
    "following": ["Objects", "Subjects"],
    "choice_type": "binary"
  },
  {
    "id": "Objects",
    "timelines": ["T1", "T3"],
    "prompt": "Disconnect - Image",
    "choices": [],
    "following": ["End"],
    "choice_type": "end"
  },
  {
    "id": "Subjects",
    "timelines": ["T1", "T3"],
    "prompt": "Disconnect - Image",
    "choices": ["OK"],
    "following": ["End"],
    "choice_type": "end"
  },
  {
    "id": "MTV Dance",
    "timelines": ["T1", "T2"],
    "prompt": "In general, would you rather:",
    "choices": ["Lead", "Follow"],
    "following": ["Karaoke", "Broadway"],
    "choice_type": "binary"
  },
  {
    "id": "Karaoke",
    "timelines": ["T1", "T2"],
    "prompt": "What next?",
    "choices": ["Play next", "Disconnect"],
    "following": ["Broadway", "Stop Participating"],
    "choice_type": "binary"
  },
  {
    "id": "Stop Participating",
    "timelines": ["T1", "T2"],
    "prompt": "Because you've stopped participating, you've been disconnected",
    "choices": ["Agree"],
    "following": ["End"],
    "choice_type": "end"
  },
  {
    "id": "Broadway",
    "timelines": ["T1", "T2"],
    "prompt": "What next?",
    "choices": ["Keep Dancing", "Disconnect"],
    "following": ["Dance", "Stop Participating"],
    "choice_type": "binary"
  },
  {
    "id": "Dance",
    "timelines": ["T1", "T2"],
    "prompt": "You're doing great.",
    "choices": ["Keep Dancing"],
    "following": ["Choosing the Dark"],
    "choice_type": "single"
  },
  {
    "id": "Choosing the Dark",
    "timelines": ["T1", "T2", "T3", "T4"],
    "prompt": "Enjoy.",
    "choices": ["OK"],
    "following": ["End"],
    "choice_type": "end"
  },
  {
    "id": "Adsvideo",
    "timelines": ["T3"],
    "prompt": "Do you usually take medicine...",
    "choices": ["To get excited", "To calm down"],
    "following": ["Rave", "Shadow"],
    "choice_type": "binary"
  },
  {
    "id": "Shadow",
    "timelines": ["T3", "T4"],
    "prompt": "Try to catch it with your camera!",
    "choices": ["Ok"],
    "following": ["Camera"],
    "choice_type": "single"
  },
  {
    "id": "Camera",
    "timelines": ["T3", "T4"],
    "prompt": "Open your camera!",
    "choices": ["Ok"],
    "following": ["Popcorn"],
    "choice_type": "single"
  },
  {
    "id": "Popcorn",
    "timelines": ["T3", "T4"],
    "prompt": "Congratulations! You have won a small portion of delicious popcorn!",
    "choices": ["Great!"],
    "following": ["Choosing the Dark"],
    "choice_type": "single"
  },
  {
    "id": "Topic from News",
    "timelines": ["T4"],
    "prompt": "Do you want to read...",
    "choices": ["The most recent article", "The most commented article"],
    "following": ["Women Bruise", "LGBTQI Performance"],
    "choice_type": "binary"
  },
  {
    "id": "LGBTQI Performance",
    "timelines": ["T4"],
    "prompt": "Do you consider yourself rather...",
    "choices": ["Socially privileged", "Socially disabled"],
    "following": ["Shadow", "How to be a Man"],
    "choice_type": "binary"
  },
  {
    "id": "Women Bruise",
    "timelines": ["T4"],
    "prompt": "Do you consider yourself rather...",
    "choices": ["Socially privileged", "Socially disabled"],
    "following": ["Shadow", "How to be a Man"],
    "choice_type": "binary"
  },
  {
    "id": "How to be a Man",
    "timelines": ["T4"],
    "prompt": "",
    "choices": ["Like", "Hide"],
    "following": ["Commenting on the Couch", "Popcorn"],
    "choice_type": "binary"
  },
  {
    "id": "Commenting on the Couch",
    "timelines": ["T4"],
    "prompt": "Thank you for subscribing!",
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
