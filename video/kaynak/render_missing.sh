#!/bin/bash
# usage: render_missing.sh <chdir> <brand>
cd "$1" || exit 1
mkdir -p timeline
done_ids=$(ls timeline | sed 's/.json//' | tr '\n' ' ')
todo=$(node -e "const s=require('./scenes');const d=new Set(process.argv[1].trim().split(' '));console.log(s.map(x=>x.id).filter(i=>!d.has(i)).join(' '))" "$done_ids")
echo "eksik: $todo"
[ -z "$todo" ] && exit 0
CHDIR=$PWD BRAND="$2" node ../build/render.js video $todo >> render.log 2>&1
echo "exit $?"
