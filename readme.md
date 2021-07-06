# Discord Bot Base

An easy to use and feature rich base for discord.js v12 bots.

## Features

 - [x] Command aliases
 - [x] Command cooldowns
 - [x] Guild only commands
 - [x] Disabled commands
 - [x] Bot owner only and guild owner only commands
 - [x] Nsfw only commands
 - [x] Permissions for running commands
 - [x] Premade dynamic help command
 - [x] Premade disable command for disabling commands for only a guild
 - [x] Premade prefix command for prefix command
 - [x] Premade eval command
 - [x] Custom status
 - [x] Some premade utils

## Usage

Replace the token value in [the config file](storage/config.json) with the token of your own application and run `npm install`. To run the bot use the `node .` command.

## Adding commands

See [the command template](commandTemplate.js) for reference when making a command.

*Note: All commands must be in a subfolder inside the command folder. The name of this subfolder is used to determine the group of the command*

## Adding events

All events must be in the events folder and must be named the same as the event. For reference with creating events see the already implemented ones.