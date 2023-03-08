rm -rf template
rsync -av --progress ./ template --exclude node_modules --exclude make_temp.sh