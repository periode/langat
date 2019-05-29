-> protocole de debut de scene (nom, prenom, pseudo)

## TECH
- projection sur trois surfaces minimum
- passer par QLab

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
