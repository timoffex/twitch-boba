# Boba Milk Tea overlay for Twitch

## Development

I recommend editing with VSCode.

I'm using `npm` with `webpack` as the build system.

Since this project involves several different components, I'm using NPM
"workspaces" to manage them: <https://docs.npmjs.com/cli/v8/using-npm/workspaces>.
Essentially this means most commands need a `-w <subfolder>` flag.

## Repository structure

* `overlay-server` is the host application, written using the
  [Electron](www.electronjs.org) framework
* `overlay` is the webpage that the streamer adds to their stream

## Recipes

* `npm install -w overlay-server`

  Build the dependencies (including `overlay` and `oauth-redirect-page`)
  for `overlay-server`.
* `npm run start -w overlay-server`

  Run the electron application.

## Design

At first I tried making this as a Twitch "overlay extension", but that was
not the right direction for several reasons. Overlay extensions are
essentially for adding new controls and visualizations to the video
player for viewers, but I want the overlay to be part of the video stream.
This is basically like a Twitch "chat game".

The way it works is as follows:

1. The streamer downloads and runs the host application which starts a local
   server that hosts the overlay at `http://localhost:8080/overlay`.
1. The streamer sets the overlay URL as the "Browser Source" in their
   streaming software. This concept seems to be pretty common; it is
   supported both in OBS and Twitch Studio. This causes the streaming
   software to display the overlay webpage on top of the video, making
   it part of the recording. Usually, the streamer can also adjust the
   position of this overlay.
1. The streamer authorizes the host application to run a Twitch chatbot
   for their stream. This chatbot tracks when viewers join or leave chat
   and updates the overlay.

Originally I hoped to write a web app instead of making the streamer
download a program. The streamer would set their Browser Source to a URL
like `https://twitch-boba.web.app/overlay`, which would first open to
Twitch's OAuth 2.0 flow and then run the overlay and chatbot from the
web page. Unfortunately, not all streaming software supports interacting
with the overlay (namely this didn't work for me in Twitch Studio), so
streamers can't authorize the chatbot this way.
