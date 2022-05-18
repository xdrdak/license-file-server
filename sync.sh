#!/bin/sh
mkdir _temp

rm -rf licenses

mkdir licenses

curl -LkSs https://api.github.com/repos/github/choosealicense.com/tarball -o _temp/master.tar.gz

tar -xzf _temp/master.tar.gz -C _temp

target=$(ls -l _temp | awk '{print $9}' | head -n 2 | xargs)

target_path=_temp/$target/_licenses/

cp -R $target_path licenses/

rm -rf _temp