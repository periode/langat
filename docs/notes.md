## SHOOT
le but c'est un trailer
- chacune des séquences
- - 10 a 15 secondes sur chaque sequence
- images de pierre entrain de programmer (twine et/ou interface)
- exterieur de la factory
- interieur du barn
- plan du public shooté de derrière
- plan du public qui choisit avec portable
images de aku pour voix de farid
- entrée du public


## MONOLOGUE PROGRAMMER
- what is the meaning if a choice? what does it mean to be able to choose, for yourself, for others, do you feel free just because you choose?
- we, as characters, are following a script, made by someone, told by a computer.
- you had the ability to choose, but not anymore. //!
- it's time to tell you the tricks: you didn't have any freedom
- you were like the characters of a show
- is it really a choice when you only have a few choices? i think you know the answer
- and we were watching so we are your audience too.
- entertainment. it's part of theater, but the most common thing was to interact: we tried, they tried —creator and computer, to make you see, with digital art. something will already have, the ability to travel through time and thought.
- isn't it incredible to communicate, here and now. phones are just the entrance, and a door that are the way we use it today, but theater, by its roots, was already able to play with the audience since the beginning (???how??) we/they tried just to show you another way, the way were the technology now allows you to interact with it. but with those phones, now, in that old factory, you were the workers of this experience.

## RETOUCHED
- entertainment. it's part of theater, but it was always about interaction: we tried, they tried —playwrights, scriptwriters, programmers, to make you see. because we always already had this ability to travel through time and thought.
- isn't it incredible to communicate, here and now. phones are just the entrance, and a door to the way we use it today, but theater, by its roots, was already able to play with the audience since the beginning we/they tried just to show you another way. technology now allows you to interact with it, but we still need to make it work. tonight, with those phones, in that old factory, you were the workers of this experience.

__FREEZE__

- thanks for choosing, for watching, for playing.
- on commence a ranger les trucs

- plan fixe avec vidéo sur écran, personnages freezés dans la vraie vie, et défreezés sur l'écran, qui disent chacun une voix
- - monologue finale
- you've only seen a fraction of the piece.
- if your group had chosen differently, you could have seen 7 different stories, sketches and snapshots of their lives.
- the only way to see it differently is to see it again



-> protocole de debut de scene (nom, prenom, pseudo)
http://paletton.com/#uid=53Q0g0kzjxyhN5Wkyvw5Gy61uwh

## QUESTIONS
- tension entre la similarité digitale et différences qui existent dans la réalité
- changement de styles suivant les timelines > oui, mais ne pas rentrer dans une continuité de la linéarité (PAS DE thématique A > A > A et séparément B > B > B, mais bien A > B > C > B autant que C > B > C > A)
- feedback necessaire/suffisant pour les publics? > 2 représentations aide
- comment trouver l'équivalent du langage dramaturgique du réel sur des écrans? (changer l'interface selon les sections > question pas explorée encore) (langage dramatique du réel, ex. slowmotion durant lequel on raconte une histoire en filigrane par les choix)
- comment des choix individuels forment-ils un groupe? (mais les codes ne sont pas pour le bien de tous, mais pour le bien de chacun) (pas poussé/à développer, e.g. avec des codes couleurs pour délimiter les personalités du public (e.g. chomeur, etudiant, femme, etc.))



- qu'est-ce qui se passe dans une société quand chacun décide pour soi? on va faire croire à une réalité/fiction qui devient atomisée? (version 2.0 >> fond de la pièce)

- qui décide du système de montage d'internet? le public? le programmeur? le "système"? (une des conclusions de la pièce, qui doit finir par apparaître dans le dossier: implications de la pièce d'un point de vue politique, social, etc.)


Synthèse: question du choix? de la présence d'autrui dans le libre arbitre du choix. dialogue enregistré?
- synthèse noeud papillon

## TECH
- projection sur trois surfaces minimum
- passer par QLab


## ROUTER
- ip address for laptop is 101
## CODE
- each interaction is time-limited, so it needs to have a timer on the page
- have a confirmation message once they've input their data
- multiple choices
- opening camera and sending pictures

### DOM

body
  header
    greeting
    disconnect
  main
    content
    prompt
    choices
    timer
    messagebox
  footer
    branding

### DATA STRUCTURE

#### NEW CHOICE MESSAGE
__control__
_/all/next_

[
  "prompt_id": String, //-- this is the latest active state
  "state": String, //-- active, passive, pending
  "prompt": String,
  "choice_0": String,
  "choice_1": String
]

#### CHOICE GIVEN MESSAGE
__client__
_/control/submit_

[
  "prompt_id": String,
  "user_id": String,
  "prompt": String,
  "choice": String
]

#### CHOICE PENDING MESSAGE
__control__
_/all/pending_

[
  null
]

#### SIGN UP REQUEST MESSAGE
__client__
_/control/join_

[
  "user_id": String,
  "first_name": String,
  "last_name": String,
  "nick_name": String,
  ...
]

#### SIGN UP CONFIRM MESSAGE
__control__
_/client/client_id/signup-confirm_

[
  "user_id": String //-- set up the cookie when you get that
]

#### REQUEST STATE MESSAGE
__client__
_/control/request-state_

[
 null
]

#### PROVIDE STATE MESSAGE
__control__
_/client/client_id/provide-state_

[
 "current_state": hasStarted ? 0 : choice_id
]

//-- if the state is 0, then we wait, otherwise it displays a "pending" message

#### DISCONNECT MESSAGE
__control__
_/all/disconnect_

[
  null
]

### CHOICE STRUCTURE
_this exists on the control page_

{
  "id": String,
  "prompt": String,
  "choices": [],
  "next": [
    String, //-- these are the IDs
    String
  ]
}


------------------------------------------------------
------------------------------------------------------

-> no voting -> people don't have power -> extraction in order to present and anticipate

# STORYLINES

T1 - WHATSAPP / LOVERS
T2 - SPOTIFY / MUSIC
T3 - INSTA / ADVERTISEMENT
T4 - BBC / NEWS

# T1

## TWO LOVERS
- show messages of lovers on screen sur deux ecrans séparés, avec traducation FI/EN
- entrée
- - envoi d'un message sur portables public avec offre de poser une question
- - une question est sélectionnée, et envoyée après sélection en technique
- - message "XXXX a rejoint la conversation: __question__"
- - réaction des acteurs
- - deconnexion du membre du public
- - trois fois
- derniere suggestion est super salace, donc procédé de reporting/blocking
- annonce dans le PA du nom de la personne bannie, asked to stand up
- person in black comes to get them and relocate
- moving on to the next scene: asking whether they usually go out until before midnight or after midnight

## RAVE
- moving on to the next scene: consent in a lot of different boxes, "by clicking agree, you consent to the following"
- - if they untick all/most of them, it goes to clever guy
- - if they untick none/not enough, they go to the slow mo rape/fight

## CLEVER GUY
- explanation of what is going on
- poll: is this interesting content? yes/no

## CLEVER GUY END
- Final message sent by Computer
- Thank you for playing / would you like to receive updates?

## BORING CLEVER GUY END
- Back to music
- Actors stop dancing slowly and connect to their phones
- Color on their phones start changing+fading
- On the GO
- - actors shut down their phone
- - disconnect message happens on the phones of the audience

---------------------------------------------------------------
---------------------------------------------------------------

# T2

## SONG
- Do you like to lead/be active or to follow/be passive?

## KARAOKE
- Lyrics are displayed on the phone
- Load More / Disconnect

## ACROBAT
- Load More / Disconnect (again)
- Load More (It's time to dance)
- Disconnect if they take too much time to choose

## STOP PARTICIPATING
- Computer: due to extended inactivity, you have been disconnected
- PBlack invite audience to go out

## ALL DANCE ON STAGE
- Actors seated, filming the audience
- Audience members get a message: "You're doing great! You're amazing!"


---------------------------------------------------------------
---------------------------------------------------------------


# T3 - INSTAGRAM

## DEGLINGUE DES TYPES
- Do you agree with what just happened?

-> relayé par 3 ou 4 personnes a la technique
-> men in black: tech team?
-> women's rights vs. men's rights? how does it conclude? everybody almost always eat together
