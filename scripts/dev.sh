#!/bin/bash
export FNM_PATH="$HOME/Library/Application Support/fnm"
export PATH="$FNM_PATH:$PATH"
eval "$(fnm env)"
exec node node_modules/.bin/next dev
