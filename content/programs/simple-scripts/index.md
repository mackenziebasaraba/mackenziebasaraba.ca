---
title: Simple Scripts
date: 2025-03-11T11:15:08-06:00
headerimage: true
description:
categories:
    -
tags:
    - Scripts
author: Peter MacKenzie-Basaraba
resources:
    - ""
showMetaBox: true
contentCopyright: false
type:
layout:
build:
    list:
    publishResources:
    render:
draft: false
---

<section>

An assortment of simple scripts I run frequently. Feel free to use and rewrite
them in any way you see fit.

</section>

<section>

## bookmark

A simple script to log and retrieve URLs through dmenu.

![An example of the --display argument.](bookmark.gif "An example of the --display command")

**Arguments**
: **-d, --display** -- Display a list of saved bookmarks.

: **-a, --add** -- Log the URL stored in the clipboard; configure title and tags.

*This script is intended to be executed through dwm.*

```bash {title="[bookmark](bookmark)"}
#!/usr/bin/env bash

file="$HOME/.local/share/bookmarks.csv"

result() { dmenu -p "$1" < /dev/null; }

display_bookmarks() {
    choice=$(sort -t ';' -k 3,3 -k 1,1 -k 2,2 "$file" | sed "s/;/ | /g" | dmenu -l 25 -i -p "Select bookmark:")
    [ -n "$choice" ] && firefox "$(echo "$choice" | cut -d "|" -f 2)"
}

add_bookmark() {
    url="$(xclip -o)"
    title="$(result "Enter bookmark title:")"
    tags="$(result "Enter bookmark tags:")"

    if grep -q "^$url$" "$file"; then
        notify-send "Error!" "You've already bookmarked '$title'."
    else
        echo "$title;$url;$tags" >> "$file"
        notify-send "Bookmark added!" "'$title' has been bookmarked!"
    fi
}

help() {
  printf "Usage:\n -d, --display\t Display a list of saved links.\n -a, --add\t Add a new bookmark.\n" ;
}

case "$1" in
    -d) display_bookmarks ;;
    --display) display_bookmarks ;;
    -a) add_bookmark ;;
    --add) add_bookmark ;;
    *) help ; exit 1 ;;
esac
```

</section>

<section>

## consolidatebib

I'm anal about organization... at least when it comes to my home directory; this
script consolidates all Biber files within a directory into a master file,
allowing me to create files for different mediums and subjects. I have this
script executed whenever a Biber file is written.

```bash {title="[consolidatebib](consolidatebib)"}
#!/usr/bin/env sh
# Consolidates all bib files into a single file.
cat [abpw]*.bib > mega.bib && notify-send -i "Consolidate:" "Consolidating Bibliography."
```
</section>
